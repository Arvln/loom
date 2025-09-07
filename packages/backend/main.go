package main

import (
	"log"

	"app/db"
	"app/routes"

	"github.com/fvbock/endless"
	"github.com/gin-gonic/gin"
)

func main() {
	if err := db.Connect(); err != nil {
		log.Fatalf("Failed to connect DB: %v", err)
	}

	if err := db.RunMigration(); err != nil {
		log.Fatalf("Failed to connect DB: %v", err)
	}

	if err := db.RunSeeder(); err != nil {
		log.Fatalf("Failed to connect DB: %v", err)
	}

	r := gin.Default()

	apiGroup := r.Group("/api")

	routes.RegisterAPIRoutes(apiGroup)

	endless.ListenAndServe(":80", r)
}
