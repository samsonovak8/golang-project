package main

import (
    "io"
    "net/http"
    "os"

    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
    "yandex-team.ru/bstask/routes"
)

func main() {
    e := setupServer()
    e.Logger.Fatal(e.Start(":8080"))
}

func setupServer() *echo.Echo {
    e := echo.New()

    e.Use(middleware.Logger())
    e.Use(middleware.Recover())

    routes.SetupRoutes(e)

    e.Static("/static", "static")

    e.GET("/", func(c echo.Context) error {
        index, err := os.Open("frontend/my-react-app/build/index.html")
        if err != nil {
            return err
        }
        defer index.Close()

        _, err = io.Copy(c.Response(), index)
        return err
    })

    return e
}
