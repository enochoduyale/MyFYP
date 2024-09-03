import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-pascal-coefficients',
  templateUrl: './pascal-coefficients.component.html',
  styleUrls: ['./pascal-coefficients.component.css']
})
export class PascalCoefficientsComponent {
  
  shuffledCoefficients: number[] = [];
  originalCoefficients: number[] = [];
  power!: number;
  expression!: string;

  ngOnInit(): void {
    let selectedQuestion = localStorage.getItem('selectedQuestion') ? JSON.parse(localStorage.getItem('selectedQuestion')!) as {coefficients: number[], expression: string, power: number} : null ;
    if(selectedQuestion){
      this.originalCoefficients = selectedQuestion.coefficients;
      this.power = selectedQuestion.power;
      this.expression = selectedQuestion.expression;

      // Shuffle the coefficients
      this.shuffledCoefficients = this.shuffleArray([...this.originalCoefficients]);
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
      // Proceed to the next phase or navigate to the next task
    } else {
      alert('Incorrect. Please try again.');
    }
  }
}



