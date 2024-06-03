package models

import (
	"gorm.io/gorm"
	"time"
)

type Pomodoro struct {
	gorm.Model
	UserID    uint `gorm:"not null"`
	Duration  uint `gorm:"not null"`
	Status    string
	StartTime *time.Time
}
