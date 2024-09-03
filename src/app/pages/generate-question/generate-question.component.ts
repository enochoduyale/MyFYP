import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-question',
  templateUrl: './generate-question.component.html',
  styleUrls: ['./generate-question.component.css']
})
export class GenerateQuestionComponent {
  questions: {coefficients: number[], expression: string, power: number} [] = [
    { 
      power: 3, 
      coefficients: [1, 3, 3, 1], 
      expression: '(2a + b)^3' 
    },
    { 
      power: 4, 
      coefficients: [1, 4, 6, 4, 1], 
      expression: '(3a - 2b)^4' 
    },
    { 
      power: 5, 
      coefficients: [1, 5, 10, 10, 5, 1], 
      expression: '(a + 2b)^5' 
    },
    { 
      power: 6, 
      coefficients: [1, 6, 15, 20, 15, 6, 1], 
      expression: '(2a - b)^6' 
    },
    { 
      power: 7, 
      coefficients: [1, 7, 21, 35, 35, 21, 7, 1], 
      expression: '(3a + b)^7' 
    },
    { 
      power: 8, 
      coefficients: [1, 8, 28, 56, 70, 56, 28, 8, 1], 
      expression: '(a - 2b)^8' 
    },
  ];

  selectedQuestion: any = null;

  constructor(private router: Router) {}

  generateQuestion(): void {
    // Randomly select a question
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    this.selectedQuestion = this.questions[randomIndex];
  }

  selectQuestion(): void {
    if (this.selectedQuestion) {
      // Save selected question to local storage
      localStorage.setItem('selectedQuestion', JSON.stringify(this.selectedQuestion));

      // Navigate to the next stage
      this.router.navigate(['/pascal-coefficients']);
    }
  }
}
 


