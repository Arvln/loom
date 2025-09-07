package controllers

import (
	"app/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Healthz(c *gin.Context) {
	c.Status(http.StatusOK)
}

func Hello(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Hello World from Gin!",
	})
}

func GetUser(c *gin.Context) {
	id := c.Param("id")

	user, err := services.FindUserByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}
