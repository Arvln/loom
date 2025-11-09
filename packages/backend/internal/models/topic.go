package models

type Topic struct {
	ID       uint       `gorm:"primaryKey;autoIncrement" json:"id"`
	Name     string     `gorm:"uniqueIndex;size:50" json:"name"`
	Articles *[]Article `gorm:"many2many:article_topics;" json:"articles"`
}
