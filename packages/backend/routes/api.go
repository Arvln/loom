package routes

import (
	"app/internal/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterAPIRoutes(rg *gin.RouterGroup) {
	rg.GET("/healthz", controllers.Healthz)
	rg.GET("/hello", controllers.Hello)
	rg.GET("/user/:id", controllers.GetUser)
}
