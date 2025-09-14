package models

import (
	"time"
)

type Article struct {
	ID        uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	Title     string `gorm:"size:200" json:"title"`
	Content   string `gorm:"type:text" json:"content"` // Markdown 內文
	AuthorID  uint   `json:"author_id"`
	Author    User   `gorm:"foreignKey:AuthorID"`
	Tags      []Tag  `gorm:"many2many:article_tags;" json:"tags"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
