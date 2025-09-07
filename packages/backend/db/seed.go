package db

import (
	"app/internal/models"
	"fmt"
)

// RunSeeder 插入假資料
func RunSeeder() error {
	users := []models.User{
		{Name: "Alice", Email: "alice@example.com"},
		{Name: "Bob", Email: "bob@example.com"},
		{Name: "Charlie", Email: "charlie@example.com"},
		{Name: "David", Email: "david@example.com"},
		{Name: "Eve", Email: "eve@example.com"},
	}

	for _, u := range users {
		// 如果不存在才建立，避免重複
		var count int64
		DB.Model(&models.User{}).Where("email = ?", u.Email).Count(&count)
		if count == 0 {
			if err := DB.Create(&u).Error; err != nil {
				return fmt.Errorf("failed to seed user %s: %v", u.Email, err)
			}
		}
	}
	return nil
}
