import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { TimerComponent } from 'src/app/components/timer/timer.component';

@Component({
  selector: 'app-pascal-coefficients',
  templateUrl: './pascal-coefficients.component.html',
  styleUrls: ['./pascal-coefficients.component.css']
})
export class PascalCoefficientsComponent implements OnInit {

  shuffledCoefficients: number[] = [];
  originalCoefficients: number[] = [];
  power!: number;
  expression!: string;
  notificationMessage: string = ''; // Store the notification message
  notificationType: 'success' | 'error' = 'success'; // Notification type (success or error)


  @ViewChild(TimerComponent) timerComponent!: TimerComponent; // Access the timer component

  gameStarted: boolean = false;
  constructor(private router: Router){

  }
  ngOnInit(): void {

    const selectedQuestionJson = localStorage.getItem('selectedQuestion');

    if (selectedQuestionJson) {
      const selectedQuestion = JSON.parse(selectedQuestionJson);
      this.originalCoefficients = selectedQuestion.coefficients;
      this.power = selectedQuestion.power;
      this.expression = selectedQuestion.expression;

      // Shuffle the coefficients
      this.shuffledCoefficients = this.shuffleArray([...this.originalCoefficients]);
    } else {
      console.error('No question found in localStorage.');
    }
  }
  ngAfterViewInit() {
    this.timerComponent.startTimer(); 
 }

    // Start the Pascal rearrangement and trigger the timer
    startPascalRearrangement(): void {
      this.gameStarted = true;
      this.timerComponent.startTimer(); // Start the timer when the game starts
    }
  
    // Handle when time is up (stop the rearrangement, end the game)
    
  shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  drop(event: CdkDragDrop<number[]>): void {
    moveItemInArray(this.shuffledCoefficients, event.previousIndex, event.currentIndex);
  }

  checkAnswer(): void {
    if (JSON.stringify(this.shuffledCoefficients) === JSON.stringify(this.originalCoefficients)) {
      alert('Correct! You’ve arranged the coefficients correctly.');
      setTimeout(() => {
        this.router.navigate(['/minesweeper-solver'])
      }, 2000)
    } else {
      alert('Incorrect. Please try again.');
    }
  }
}
