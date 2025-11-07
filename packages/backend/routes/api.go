package routes

import (
	"app/internal/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterAPIRoutes(rg *gin.RouterGroup) {
	rg.GET("/healthz", controllers.Healthz)
	rg.GET("/hello", controllers.Hello)
	rg.GET("/user/:id", controllers.GetUser)
	rg.POST("/register", controllers.Register)
	rg.POST("/login", controllers.Login)
	rg.GET("/logout", controllers.Logout)
	rg.GET("/profile", controllers.Profile)
	rg.POST("/articles", controllers.CreateArticle)
	rg.GET("/articles", controllers.GetArticles)
	rg.GET("/articles/:id", controllers.GetArticles)
	rg.PUT("/articles/:id", controllers.UpdateArticle)
	rg.DELETE("/articles/:id", controllers.DeleteArticle)
}
