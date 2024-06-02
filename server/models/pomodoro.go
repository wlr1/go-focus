package models

import "gorm.io/gorm"

type Pomodoro struct {
	gorm.Model
	UserID   uint `gorm:"not null"`
	Duration uint `gorm:"not null"`
}
