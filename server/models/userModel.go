package models

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	Email    string `gorm:"unique"`
	Password string
	Username string
	Avatar   string
}

type PomodoroSessions struct {
	gorm.Model
	UserID      uint      `gorm:"not null" json:"user_id"`        //foreign key to associate pomo with users
	Mode        string    `gorm:"default:'pomodoro'"`             // mode of the session: pomodoro, short break, long break
	StartTime   time.Time `json:"start_time"`                     //start time of the pomo session
	EndTime     time.Time `json:"end_time"`                       //end time of the pomo session
	Duration    int       `gorm:"default:1500" json:"duration"`   //duration of the pomo session
	IsActive    bool      `gorm:"default:false" json:"is_active"` // Whether the session is currently active
	IsCompleted bool      `gorm:"default:false"`                  // Whether the session has been completed
	User        User      `gorm:"foreignKey:UserID"`
}
