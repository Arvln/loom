package controllers

import (
	"app/db"
	"app/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetTopics 取得所有 topic 的 id 與 name
func GetTopics(c *gin.Context) {
	var topics []models.Topic

	if err := db.DB.Select("id", "name").Find(&topics).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":  500,
			"msg":   "取得 Topic 列表失敗",
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "取得成功",
		"data": topics,
	})
}
