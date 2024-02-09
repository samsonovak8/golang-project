package utils

import (
	"github.com/araddon/dateparse"
	"time"
)

func GetTime(strTime string) (time.Time, error) {
	parsedTime, err := dateparse.ParseAny(strTime)
	if err != nil {
		return time.Time{}, err
	}
	return parsedTime, nil
}

func InsideInterval(date, startDate, endDate time.Time) bool {
	return date.After(startDate) && date.Before(endDate) || date.Equal(startDate) || date.Equal(endDate)
}
