package controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/websocket"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
	"os"
	"server/initializers"
	"server/models"
	"time"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func WebSocketsHandler(c *gin.Context) {
	// Allow all origins for websocket connections
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}
	// upgrade http connection to ws
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("Failed to set ws upgrade: ", err)
		return
	}
	defer conn.Close()
}

func SignUp(c *gin.Context) {
	//get the email/password off req body
	var body struct {
		Email    string
		Password string
		Username string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}
	//hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return
	}
	//create a user
	user := models.User{Email: body.Email, Username: body.Username, Password: string(hash)}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create a user",
		})
		return
	}
	//respond
	c.JSON(http.StatusOK, gin.H{})
}

func Login(c *gin.Context) {
	//get the email/pass off req body
	var body struct {
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}
	//look up requested user
	var user models.User
	initializers.DB.First(&user, "email = ?", body.Email)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid password or email",
		})
		return
	}
	//compare sent in pass with saved user pass hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid password or email",
		})
		return
	}
	//generate a jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}
	//send it back
	http.SetCookie(c.Writer, &http.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		HttpOnly: true,
		MaxAge:   int((time.Hour * 24 * 30).Seconds()),
	})

	c.JSON(http.StatusOK, gin.H{})
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{
		"message": user,
	})
}

func Logout(c *gin.Context) {
	// Delete the JWT cookie
	c.SetCookie("jwt", "", -1, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "Logged out successfully",
	})
}

func UpdateUsername(c *gin.Context) {
	//get the user from context
	user, _ := c.Get("user")
	currentUser := user.(models.User)

	//get the new username from the req body

	var body struct {
		Username string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	//update the username in the db

	currentUser.Username = body.Username
	result := initializers.DB.Save(&currentUser)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to update username",
		})
		return
	}

	//respond with success
	c.JSON(http.StatusOK, gin.H{})
}

func UpdatePassword(c *gin.Context) {
	//get the authenticated user from the context
	user, _ := c.Get("user")
	currentUser := user.(models.User)

	//parse the req body to get the new pass
	var body struct {
		NewPassword string
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	//hash the new pass
	hash, err := bcrypt.GenerateFromPassword([]byte(body.NewPassword), 10)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to hash password",
		})
		return
	}

	//update the users pass in db
	currentUser.Password = string(hash)
	result := initializers.DB.Save(&currentUser)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update password",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Password updated successfully",
	})
}

func DeleteUser(c *gin.Context) {
	//get the authenticated user from the context
	user, _ := c.Get("user")
	currentUser := user.(models.User)

	//delete the user from the db
	result := initializers.DB.Delete(&currentUser)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete user",
		})
		return
	}

	//clear jwt token
	c.SetCookie("jwt", "", -1, "/", "", false, true)

	//respond with success message
	c.JSON(http.StatusOK, gin.H{
		"message": "user deleted successfully",
	})
}

func UserAvatar(c *gin.Context) {
	//get the authenticated user from the context
	user, _ := c.Get("user")
	currentUser := user.(models.User)

	//get the file from the req
	file, err := c.FormFile("avatar")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No file uploaded",
		})
		return
	}

	//save the file to a location
	filePath := fmt.Sprintf("uploads/%s_%s", currentUser.Username, file.Filename)
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to save file",
		})
		return
	}

	//uploads the users avatar in the db
	currentUser.Avatar = filePath
	result := initializers.DB.Save(&currentUser)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update avatar",
		})
		return
	}

	//return the avatar url in res
	avatarURL := "http://localhost:8000/" + filePath
	c.JSON(http.StatusOK, gin.H{
		"message":    "Avatar updated successfully",
		"avatar_url": avatarURL,
	})
}
