package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	"os"
	"server/initializers"
	"server/models"
	"time"
)

func RequireAuth(c *gin.Context) {
	//Get the cookie off req
	tokenString, err := c.Cookie("jwt")

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	//Decode/validate it

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//Check the exp
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		// Find the user with token sub
		var user models.User
		initializers.DB.First(&user, claims["sub"])

		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		// Attach to req
		c.Set("user", user)
		//Continue
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
}
