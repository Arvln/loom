package models

import (
	"time"

	"gorm.io/datatypes"
)

type Article struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	Title     string         `gorm:"size:200" json:"title"`
	Content   datatypes.JSON `json:"content" gorm:"type:jsonb"`
	AuthorID  uint           `json:"author_id"`
	Author    User           `gorm:"foreignKey:AuthorID"`
	Tags      []Tag          `gorm:"many2many:article_tags;" json:"tags"`
	Status    string         `gorm:"size:20;default:'draft'" json:"status"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
