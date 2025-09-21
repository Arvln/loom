package main

import (
	"log"
	"net/http"
	"os"

	"app/db"
	"app/routes"

	"github.com/fvbock/endless"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// 載入 .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	if err := db.Connect(); err != nil {
		log.Fatalf("Failed to connect DB: %v", err)
	}

	if err := db.RunMigration(); err != nil {
		log.Fatalf("Failed to connect DB: %v", err)
	}

	if err := db.RunSeeder(); err != nil {
		log.Fatalf("Failed to connect DB: %v", err)
	}

	r := gin.Default()

	// 建立 session store (用 cookie 存)
	store := cookie.NewStore([]byte(os.Getenv("SESSION_SECRET")))
	store.Options(sessions.Options{
		Path:     "/",
		MaxAge:   3600,  // 1 小時過期
		HttpOnly: true,  // JS 無法讀取
		Secure:   false, // 僅 HTTPS 傳送
		SameSite: http.SameSiteStrictMode,
	})

	r.Use(sessions.Sessions("my-session", store))

	apiGroup := r.Group("/api")

	routes.RegisterAPIRoutes(apiGroup)

	endless.ListenAndServe(":80", r)
}
