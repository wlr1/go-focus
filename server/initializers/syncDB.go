package initializers

import "server/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
}
