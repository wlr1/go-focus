package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/websocket"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"io"
	"log"
	"net/http"
	"os"
	"server/initializers"
	"server/models"
	"time"
)

var db *gorm.DB

func init() {
	db = initializers.DB
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// Function to save file
func saveFile(filePath string, reader io.Reader) error {
	// Create destination file
	dst, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer dst.Close()

	// Copy the file contents to destination
	_, err = io.Copy(dst, reader)
	if err != nil {
		return err
	}

	return nil
}

//===========================================================
//authentication
//===========================================================

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

//===========================================================
// User Info
//===========================================================

func UpdateUsernameWebsocket(c *gin.Context) {
	// Check origin error
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	// Upgrade HTTP connection to WebSocket
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("Failed to set up WebSocket connection:", err)
		return
	}
	defer conn.Close()

	// Read incoming message from client
	_, msg, err := conn.ReadMessage()
	if err != nil {
		log.Println("Failed to read message from client:", err)
		return
	}

	// Get the authenticated user from context using type assertion
	user, exists := c.Get("user")
	if !exists {
		log.Println("Error: User not found in context")
		conn.WriteMessage(websocket.TextMessage, []byte("Unauthorized"))
		return
	}

	log.Printf("Type of user in context: %T\n", user)

	// Type assert the user to models.User
	currentUser, ok := user.(models.User)
	if !ok {
		log.Println("Error: Unexpected user type in context")
		conn.WriteMessage(websocket.TextMessage, []byte("Internal server error"))
		return
	}

	// Extract username from the message JSON
	var username struct {
		Username string `json:"username"`
	}

	if err := json.Unmarshal(msg, &username); err != nil {
		log.Println("Failed to parse username from message:", err)
		conn.WriteMessage(websocket.TextMessage, []byte("Failed to parse username"))
		return
	}

	newUsername := username.Username

	// Update the username in the database
	currentUser.Username = newUsername
	if err := initializers.DB.Save(&currentUser).Error; err != nil {
		log.Println("Failed to update username in the database:", err)
		conn.WriteMessage(websocket.TextMessage, []byte("Failed to update username"))
		return
	}

	// Send a response back to the client
	if err := conn.WriteMessage(websocket.TextMessage, []byte("Username updated successfully")); err != nil {
		log.Println("Failed to write message to client:", err)
		return
	}
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

//===========================================================
//POMODORO
//===========================================================

//update duration

func SetPomodoroDuration(c *gin.Context) {
	var body struct {
		Duration uint `json:"duration"`
	}
	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read body"})
		return
	}

	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	currentUser := user.(models.User)

	pomodoro := models.Pomodoro{
		UserID:   currentUser.ID,
		Duration: body.Duration,
	}

	initializers.DB.Where("user_id = ?", currentUser.ID).Delete(&models.Pomodoro{})
	initializers.DB.Create(&pomodoro)

	c.JSON(http.StatusOK, gin.H{"message": "Pomodoro duration set successfully"})
}

//fetch duration

func GetPomodoroDuration(c *gin.Context) {
	user, _ := c.Get("user")
	currentUser := user.(models.User)

	var pomodoro models.Pomodoro
	initializers.DB.First(&pomodoro, "user_id = ?", currentUser.ID)

	if pomodoro.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Pomodoro duration not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"duration": pomodoro.Duration,
	})
}

//start

func StartPomodoro(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "unauthorized",
		})
		return
	}
	currentUser := user.(models.User)

	//get the existing pomodoro record
	var pomodoro models.Pomodoro
	result := initializers.DB.First(&pomodoro, "user_id = ?", currentUser.ID)

	//if no existing record, return an error
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Pomodoro record not found",
		})
		return
	}

	//update status to "running" and set the start time, and set PomodoroType=pomodoro

	startTime := time.Now()
	pomodoro.PomodoroType = "pomodoro"
	pomodoro.Status = "running"
	pomodoro.StartTime = &startTime
	initializers.DB.Save(&pomodoro)

	c.JSON(http.StatusOK, gin.H{"message": "Pomodoro started successfully", "startTime": startTime})
}

//stop

func StopPomodoro(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	currentUser := user.(models.User)

	//get the existing pomo record
	var pomodoro models.Pomodoro
	result := initializers.DB.First(&pomodoro, "user_id = ?", currentUser.ID)

	//if no existing record, return an error
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pomodoro record not found"})
		return
	}

	//update status to "stopped"
	pomodoro.Status = "stopped"
	initializers.DB.Save(&pomodoro)

	c.JSON(http.StatusOK, gin.H{"message": "Pomodoro stopped successfully"})
}

//reset

func ResetPomodoro(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "unauthorized",
		})
		return
	}
	currentUser := user.(models.User)

	//get the existing pomo record
	var pomodoro models.Pomodoro
	result := initializers.DB.First(&pomodoro, "user_id = ?", currentUser.ID)

	//if no existing record, return an error
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pomodoro record not found"})
		return
	}

	// save the current duration before reset
	existingDuration := pomodoro.Duration

	//reset the pomodoro(delete existing and create a new one with initial values)
	initializers.DB.Delete(&pomodoro)
	newPomodoro := models.Pomodoro{
		UserID:   currentUser.ID,
		Duration: existingDuration,
		Status:   "reset",
	}
	initializers.DB.Create(&newPomodoro)

	c.JSON(http.StatusOK, gin.H{"message": "Pomodoro reset successfully", "duration": newPomodoro.Duration})
}

//===========================================================
// Short break pomodoro
//===========================================================
