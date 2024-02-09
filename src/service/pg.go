package service

import (
	"encoding/json"
	"fmt"
	"time"

	log "github.com/bearatol/lg"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"yandex-team.ru/bstask/models"
	"yandex-team.ru/bstask/utils"
)

type PgService struct {
	db *gorm.DB
}

func NewPgService(dsn string) (*PgService, error) {
	var db *gorm.DB
	var err error
	for {
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			log.Info("Trying to connect to pg")
			time.Sleep(2 * time.Second)
		} else {
			break
		}
	}
	log.Info("Success connecting to pg")
	if err := db.AutoMigrate(&models.CourierDB{}, &models.OrderDB{}, &models.CompleteInfo{}); err != nil {
		return nil, err
	}
	return &PgService{db}, nil
}

func (p *PgService) CreateCourier(couriers ...models.Courier) error {
	db := p.db.Begin()
	defer db.RollbackUnlessCommitted()
	for _, courier := range couriers {
		courierJson, err := json.Marshal(courier)
		if err != nil {
			return err
		}
		if err := db.Create(&models.CourierDB{ID: courier.CourierID, Attributes: courierJson}).Error; err != nil {
			return err
		}
	}
	return db.Commit().Error
}

func (p *PgService) GetCourierByID(ID int64) (models.Courier, error) {
	var courierDB models.CourierDB
	if result := p.db.Limit(1).Find(&courierDB, ID); result.RowsAffected == 0 {
		return models.Courier{}, fmt.Errorf("courier doesn't exist")
	}
	var courier models.Courier
	if err := json.Unmarshal(courierDB.Attributes, &courier); err != nil {
		return models.Courier{}, err
	}
	return courier, nil
}

