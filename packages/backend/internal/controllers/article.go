package controllers

import (
	"app/db"
	"app/internal/models"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

var DB = db.DB

func CreateArticle(c *gin.Context) {
	var article models.Article
	if err := c.ShouldBindJSON(&article); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	DB.Create(&article)
	c.JSON(http.StatusOK, article)
}

func GetArticles(c *gin.Context) {
	id := c.Param("id")

	// 如果有帶 id，查單筆
	if id != "" {
		var article models.Article
		if err := db.DB.First(&article, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		c.JSON(http.StatusOK, article)
		return
	}

	// 游標分頁
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	cursor := c.Query("cursor") // 上一次最後一筆的 ID

	var articles []models.Article
	query := DB.Model(&models.Article{})

	// 搜尋參數
	search := c.Query("search")
	if search != "" {
		query = query.Where("title ILIKE ? OR content::text ILIKE ?", "%"+search+"%", "%"+search+"%")
	}

	// 游標條件（只取比 cursor 小的 id）
	if cursor != "" {
		query = query.Where("id < ?", cursor)
	}

	// 取資料
	query.Order("id DESC").Limit(limit).Find(&articles)

	// 計算下一個游標
	var nextCursor string
	if len(articles) > 0 {
		last := articles[len(articles)-1]
		nextCursor = fmt.Sprintf("%d", last.ID)
	}

	c.JSON(http.StatusOK, gin.H{
		"limit":      limit,
		"nextCursor": nextCursor,
		"articles":   articles,
	})
}

func UpdateArticle(c *gin.Context) {
	id := c.Param("id")
	var article models.Article
	if err := DB.First(&article, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	if err := c.ShouldBindJSON(&article); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	DB.Save(&article)
	c.JSON(http.StatusOK, article)
}

func DeleteArticle(c *gin.Context) {
	id := c.Param("id")
	var article models.Article
	if err := DB.First(&article, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	DB.Delete(&article)
	c.Status(http.StatusNoContent)
}
