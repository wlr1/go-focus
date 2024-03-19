package main

import (
	"github.com/gin-gonic/gin"
	"server/controllers"
	"server/initializers"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	r := gin.Default()

	r.POST("/signup", controllers.SignUp)
	r.POST("/login", controllers.Login)
	r.GET("/validate", controllers.Validate)

	r.Run()
}
