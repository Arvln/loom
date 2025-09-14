package db

import (
	"app/internal/models"
	"fmt"
	"log"

	"golang.org/x/crypto/bcrypt"
)

// RunSeeder 插入假資料
func RunSeeder() error {
	// 建立預設密碼
	password, _ := bcrypt.GenerateFromPassword([]byte("loom123"), bcrypt.DefaultCost)

	users := []models.User{
		{Username: "arvin", Password: string(password), Name: "Arvin"},
		{Username: "mmarshall", Password: string(password), Name: "Marshall"},
		{Username: "ryan", Password: string(password), Name: "Ryan"},
		{Username: "alice", Password: string(password), Name: "Alice"},
		{Username: "bob", Password: string(password), Name: "Bob"},
		{Username: "charlie", Password: string(password), Name: "Charlie"},
		{Username: "david", Password: string(password), Name: "David"},
		{Username: "eve", Password: string(password), Name: "Eve"},
	}

	// 建立使用者
	for i := range users {
		var count int64
		DB.Model(&models.User{}).Where("username = ?", users[i].Username).Count(&count)
		if count == 0 {
			if err := DB.Create(&users[i]).Error; err != nil {
				return fmt.Errorf("failed to seed user %s: %v", users[i].Username, err)
			}
		} else {
			// 如果已存在，查回 ID
			DB.Where("username = ?", users[i].Username).First(&users[i])
		}
	}

	// 建立 tags（避免重複）
	tags := []string{"Go", "Gin"}
	var tagModels []models.Tag

	for _, name := range tags {
		var tag models.Tag
		if err := DB.Where("name = ?", name).FirstOrCreate(&tag, models.Tag{Name: name}).Error; err != nil {
			return fmt.Errorf("failed to seed tag %s: %v", name, err)
		}
		tagModels = append(tagModels, tag)
	}

	// 建立文章，使用 Alice 作為作者
	var alice models.User
	if err := DB.Where("username = ?", "alice").First(&alice).Error; err != nil {
		return fmt.Errorf("author alice not found: %v", err)
	}

	article := models.Article{
		Title:    "第一篇文章",
		Content:  "# Hello World\n這是一篇 **Markdown** 測試文章。",
		AuthorID: alice.Id,
		Tags:     tagModels,
	}

	// 避免重複建立
	var count int64
	DB.Model(&models.Article{}).Where("title = ?", article.Title).Count(&count)
	if count == 0 {
		if err := DB.Create(&article).Error; err != nil {
			return fmt.Errorf("failed to seed article: %v", err)
		}
	}

	log.Println("✅ Seeder completed")
	return nil
}
