package services

import (
	"app/db"
	"app/internal/models"
)

func FindUserByID(id string) (*models.User, error) {
	var user models.User
	if err := db.DB.First(&user, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
