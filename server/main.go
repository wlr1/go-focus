package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"server/controllers"
	"server/initializers"
	"server/middleware"
	"time"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	r := gin.Default()

	r.Static("/uploads", "./uploads")

	r.ForwardedByClientIP = true
	err := r.SetTrustedProxies([]string{"127.0.0.1"})
	if err != nil {
		return
	}

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8000", "http://localhost:5173"},
		AllowMethods:     []string{"PUT", "PATCH", "DELETE", "GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           24 * time.Hour,
	}))

	r.POST("/signup", controllers.SignUp)
	r.POST("/login", controllers.Login)
	r.POST("/upload-avatar", middleware.RequireAuth, controllers.UserAvatar)

	r.GET("/validate", middleware.RequireAuth, controllers.Validate)
	r.GET("/logout", middleware.RequireAuth, controllers.Logout)

	//r.PUT("/update-user", middleware.RequireAuth, controllers.UpdateUsername)
	r.PUT("/update-password", middleware.RequireAuth, controllers.UpdatePassword)

	r.DELETE("/delete-user", middleware.RequireAuth, controllers.DeleteUser)

	ws := r.Group("/ws")
	{
		ws.Use(middleware.RequireAuth)

		ws.GET("/update-username", controllers.UpdateUsernameWebsocket)

	}

	pomodoro := r.Group("/pomodoro")
	{
		pomodoro.Use(middleware.RequireAuth)

		pomodoro.GET("/get-duration", controllers.GetPomodoroDuration)

		pomodoro.POST("/set-duration", controllers.SetPomodoroDuration)
		pomodoro.POST("/start", controllers.StartPomodoro)
		pomodoro.POST("/stop", controllers.StopPomodoro)
		pomodoro.POST("/reset", controllers.ResetPomodoro)
	}

	log.Fatal(r.Run())

}
