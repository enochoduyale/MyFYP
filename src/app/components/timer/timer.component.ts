import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  
  // @Input() startTime: number = 60; // Total time in seconds (default to 60 seconds)
  // @Output() timeUp: EventEmitter<void> = new EventEmitter(); // Emit event when time is up
  
  // timer: number = this.startTime;
  // interval: any;

  // ngOnInit(): void {
  //   this.timer = this.startTime;
  // }

  // // Start the countdown
  // startTimer(): void {
  //   if (!this.interval) {
  //     this.interval = setInterval(() => {
  //       this.timer--;
  //       if (this.timer <= 0) {
  //         this.stopTimer();
  //         this.timeUp.emit(); // Emit the timeUp event when time is up
  //       }
  //     }, 1000);
  //   }
  // }

  // // Stop the countdown
  // stopTimer(): void {
  //   if (this.interval) {
  //     clearInterval(this.interval);
  //     this.interval = null;
  //   }
  // }

  // // Reset the timer (if needed)
  // resetTimer(): void {
  //   this.stopTimer();
  //   this.timer = this.startTime;
  // }


  @Input() startTime: number = 5 * 60; // Default to 5 minutes in seconds
  @Output() timeUp = new EventEmitter<void>(); // Emit event when time is up

  minutes: number = 0;
  seconds: number = 0;
  interval: any;

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.minutes = Math.floor(this.startTime / 60); // Set initial minutes
    this.seconds = this.startTime % 60; // Set initial seconds

    this.interval = setInterval(() => {
      if (this.seconds === 0 && this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
      } else if (this.seconds > 0) {
        this.seconds--;
      }

      // When time is up
      if (this.minutes === 0 && this.seconds === 0) {
        clearInterval(this.interval);
        this.timeUp.emit(); // Emit time up event
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  get formattedTime(): string {
    if (this.minutes > 0) {
      return `${this.minutes}m ${this.seconds}s`; // Format "MM:SS"
    } else {
      return `${this.seconds}s`; // Format "SS" when less than a minute
    }
  }
}
