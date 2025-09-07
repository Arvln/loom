package models

import "time"

type User struct {
	Id        uint      `gorm:"primaryKey;autoIncrement"`
	Name      string    `gorm:"size:100;not null"`
	Email     string    `gorm:"size:100;unique;not null"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
}
