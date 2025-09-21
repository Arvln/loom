package models

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	Id        uint      `gorm:"primaryKey;autoIncrement"  json:"id"`
	Username  string    `gorm:"uniqueIndex;size:50" json:"username"`
	Password  string    `json:"-"` // bcrypt hashed
	Name      string    `gorm:"size:100;not null"`
	Avatar    *string   `gorm:"size:255" json:"avatar"` // 存放頭像 URL
	Articles  []Article `gorm:"foreignKey:AuthorID"`    // <-- 指定 Article 的 AuthorID
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
}

// BeforeCreate - hash password before saving
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	if u.Password != "" {
		hashed, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		u.Password = string(hashed)
	}
	return nil
}
