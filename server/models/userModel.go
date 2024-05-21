package models

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	Email            string `gorm:"unique"`
	Password         string
	Username         string
	Avatar           string
	PomodoroSessions []Pomodoro
}

type Pomodoro struct {
	gorm.Model
	UserID      uint      `gorm:"not null"`           //foreign key to associate pomo with users
	Mode        string    `gorm:"default:'pomodoro'"` // mode of the session: pomodoro, short break, long break
	StartTime   time.Time //start time of the pomo session
	EndTime     time.Time //end time of the pomo session
	Duration    int       `gorm:"default:'1500'"` //duration of the pomo session
	IsActive    bool      `gorm:"default:false"`  // Whether the session is currently active
	IsCompleted bool      `gorm:"default:false"`  // Whether the session has been completed
}
