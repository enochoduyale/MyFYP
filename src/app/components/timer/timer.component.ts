import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  
  @Input() startTime: number = 60; // Total time in seconds (default to 60 seconds)
  @Output() timeUp: EventEmitter<void> = new EventEmitter(); // Emit event when time is up
  
  timer: number = this.startTime;
  interval: any;

  ngOnInit(): void {
    this.timer = this.startTime;
  }

  // Start the countdown
  startTimer(): void {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.stopTimer();
          this.timeUp.emit(); // Emit the timeUp event when time is up
        }
      }, 1000);
    }
  }

  // Stop the countdown
  stopTimer(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // Reset the timer (if needed)
  resetTimer(): void {
    this.stopTimer();
    this.timer = this.startTime;
  }
}
