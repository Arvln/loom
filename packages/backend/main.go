package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// 建立 /api 路由群組
	api := r.Group("/api")
	{
		api.GET("/hello", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "Hello World from Gin!",
			})
		})

		api.GET("/healthz", func(c *gin.Context) {
			c.Status(200)
		})
	}

	// 對外 port 80
	r.Run(":80")
}
