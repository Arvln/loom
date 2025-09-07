package db

import "app/internal/models"

// RunMigration 建立資料表
func RunMigration() error {
	return DB.AutoMigrate(&models.User{})
}
