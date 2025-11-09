package models

import (
	"time"

	"gorm.io/datatypes"
)

type Article struct {
	ID       uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	Title    string         `gorm:"size:200" json:"title"`
	Content  datatypes.JSON `json:"content" gorm:"type:jsonb"`
	AuthorID *uint          `json:"author_id"`                         // 讓它可以是 null
	Author   *User          `gorm:"foreignKey:AuthorID" json:"author"` // 同樣用指標型別
	// Tags      *[]Tag         `gorm:"many2many:article_tags;" json:"tags"` // 用指標表示可以為 null
	// Status    string         `gorm:"size:20;default:'draft'" json:"status"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
