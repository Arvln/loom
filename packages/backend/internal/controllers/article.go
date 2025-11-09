package controllers

import (
	"app/db"
	"app/internal/models"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 統一回應格式
func respond(c *gin.Context, status int, data interface{}, message string) {
	c.JSON(status, gin.H{
		"data":    data,
		"message": message,
	})
}

func CreateArticle(c *gin.Context) {
	var article models.Article
	if err := c.ShouldBindJSON(&article); err != nil {
		respond(c, http.StatusBadRequest, nil, err.Error())
		return
	}
	db.DB.Create(&article)
	respond(c, http.StatusOK, article, "文章建立成功")
}

func GetArticles(c *gin.Context) {
	id := c.Param("id")

	// 如果有帶 id，查單筆
	if id != "" {
		var article models.Article
		if err := db.DB.First(&article, id).Error; err != nil {
			respond(c, http.StatusNotFound, nil, "文章不存在")
			return
		}
		respond(c, http.StatusOK, article, "取得單篇文章成功")
		return
	}

	// 游標分頁
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	cursor := c.Query("cursor") // 上一次最後一筆的 ID

	var articles []models.Article
	query := db.DB.Model(&models.Article{})

	// 搜尋作者 username
	author := c.Query("author")
	if author != "" {
		query = query.Where("LOWER(users.username) = LOWER(?)", author)
	}

	// 搜尋條件
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

	// 前一個游標（往前）
	var prevCursor string
	if len(articles) > 0 {
		first := articles[0]
		var prev models.Article
		// 找出比目前第一筆大的那一筆
		if err := db.DB.
			Model(&models.Article{}).
			Where("id > ?", first.ID).
			Order("id ASC").
			Limit(1).
			Find(&prev).Error; err == nil && prev.ID != 0 {
			prevCursor = fmt.Sprintf("%d", prev.ID)
		}
	}

	data := gin.H{
		"limit":      limit,
		"nextCursor": nextCursor,
		"prevCursor": prevCursor,
		"articles":   articles,
	}

	respond(c, http.StatusOK, data, "取得文章列表成功")
}

func UpdateArticle(c *gin.Context) {
	id := c.Param("id")
	var article models.Article
	if err := db.DB.First(&article, id).Error; err != nil {
		respond(c, http.StatusNotFound, nil, "文章不存在")
		return
	}
	if err := c.ShouldBindJSON(&article); err != nil {
		respond(c, http.StatusBadRequest, nil, err.Error())
		return
	}
	db.DB.Save(&article)
	respond(c, http.StatusOK, article, "文章更新成功")
}

func DeleteArticle(c *gin.Context) {
	id := c.Param("id")
	var article models.Article
	if err := db.DB.First(&article, id).Error; err != nil {
		respond(c, http.StatusNotFound, nil, "文章不存在")
		return
	}
	db.DB.Delete(&article)
	respond(c, http.StatusOK, nil, "文章刪除成功")
}
