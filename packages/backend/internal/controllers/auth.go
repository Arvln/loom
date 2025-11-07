package controllers

import (
	"app/db"
	"app/internal/models"
	"net/http"

	// "os"
	// "github.com/golang-jwt/jwt/v5"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// 用一個簡單的 secret，正式環境要放環境變數
// var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

// --- Register ---
func Register(c *gin.Context) {
	var req struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
		Name     string `json:"name" binding:"required"`
		// TurnstileToken string `json:"turnstile_token" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 驗證 Turnstile
	// secret := os.Getenv("TURNSTILE_SECRET")
	// ok, err := utils.VerifyTurnstile(secret, req.TurnstileToken, c.ClientIP())
	// if err != nil || !ok {
	// 	c.JSON(http.StatusForbidden, gin.H{"error": "Turnstile verification failed"})
	// 	return
	// }

	user := models.User{
		Username: req.Username,
		Password: req.Password,
		Name:     req.Name,
	}

	if err := db.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "username already exists"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "register success"})
}

// --- Login ---
func Login(c *gin.Context) {
	var req struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := db.DB.Where("username = ?", req.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	// 簽發 JWT
	// token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
	// 	"userId": user.Id,
	// 	"exp":    time.Now().Add(time.Hour * 24).Unix(),
	// })
	// tokenString, _ := token.SignedString(jwtSecret)

	// 設定 session
	session := sessions.Default(c)
	session.Set("user_id", user.Id)
	session.Save()

	c.JSON(http.StatusOK, gin.H{"message": "login success"})

}

func Logout(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	session.Save()

	c.JSON(200, gin.H{"msg": "logout success"})
}

func Profile(c *gin.Context) {
	session := sessions.Default(c)
	userID := session.Get("user_id")

	if userID == nil {
		c.JSON(401, gin.H{"error": "Unauthorized"})
		return
	}

	var user models.User
	if err := db.DB.First(&user, userID).Error; err != nil {
		c.JSON(404, gin.H{"error": "Not found"})
		return
	}

	c.JSON(200, gin.H{
		"id":       user.Id,
		"username": user.Username,
		"name":     user.Name,
		// "avatar":   user.Avatar,
	})
}
