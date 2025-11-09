package db

import (
	"app/internal/models"
	"encoding/json"
	"fmt"
	"log"
	"math/rand"

	"gorm.io/datatypes"
)

// RunSeeder 插入假資料
func RunSeeder() error {
	// 建立預設密碼
	password := "loom123"

	users := []models.User{
		// {Username: "arvin", Password: password, Name: "Arvin"},
		// {Username: "marshall", Password: password, Name: "Marshall"},
		// {Username: "ryan", Password: password, Name: "Ryan"},
		{Username: "alice", Password: password, Name: "Alice"},
		{Username: "bob", Password: password, Name: "Bob"},
		{Username: "charlie", Password: password, Name: "Charlie"},
		{Username: "david", Password: password, Name: "David"},
		{Username: "eve", Password: password, Name: "Eve"},
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

	// 建立 topics（避免重複）
	topicNames := []string{
		"Go",
		"Gin",
		"GORM",
		"API",
		"Backend",
		"Frontend",
		"Database",
		"JSON",
		"Markdown",
		"Testing",
	}
	var topics []models.Topic

	for _, name := range topicNames {
		var topic models.Topic
		if err := DB.Where("name = ?", name).FirstOrCreate(&topic, models.Topic{Name: name}).Error; err != nil {
			return fmt.Errorf("failed to seed topic %s: %v", name, err)
		}
		topics = append(topics, topic)
	}

	// 建立文章，使用 Alice 作為作者
	var alice models.User
	if err := DB.Where("username = ?", "alice").First(&alice).Error; err != nil {
		return fmt.Errorf("author alice not found: %v", err)
	}

	for i := 1; i <= 20; i++ {
		// 隨機作者
		author := users[rand.Intn(len(users))]

		// 隨機選 1~3 個 topic
		nTopics := rand.Intn(3) + 1
		rand.Shuffle(len(topics), func(i, j int) { topics[i], topics[j] = topics[j], topics[i] })
		articleTopics := topics[:nTopics]

		// 隨機生成 JSON Content
		contentMap := map[string]interface{}{
			"title": fmt.Sprintf("文章 %d 標題", i),
			"body":  fmt.Sprintf("這是文章 %d 的 **Markdown** 測試內容。", i),
			"blocks": []map[string]string{
				{"type": "heading", "text": fmt.Sprintf("文章 %d 標題", i)},
				{"type": "paragraph", "text": fmt.Sprintf("這是文章 %d 的 **Markdown** 測試內容。", i)},
			},
		}
		contentJSON, err := json.Marshal(contentMap)
		if err != nil {
			return err
		}

		article := models.Article{
			Title:    fmt.Sprintf("文章 %d", i),
			AuthorID: &author.Id,
			Content:  datatypes.JSON(contentJSON),
			Topics:   &articleTopics,
		}

		if err := DB.Create(&article).Error; err != nil {
			return fmt.Errorf("create article %d failed: %w", i, err)
		}
	}

	log.Println("✅ Seeder completed")
	return nil
}
