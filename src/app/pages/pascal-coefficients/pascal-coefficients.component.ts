import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

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
      }, 1000)
    } else {
      alert('Incorrect. Please try again.');
    }
  }
}
