package db

import (
	"app/internal/models"
	"log"
)

// RunMigration 建立資料表
func RunMigration() error {
	err := DB.AutoMigrate(&models.User{}, &models.Article{}, &models.Tag{})
	if err != nil {
		log.Fatalf("Migration failed: %v", err)
		return err
	}
	log.Println("✅ Migration completed")
	return nil
}
