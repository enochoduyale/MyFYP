import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-question',
  templateUrl: './generate-question.component.html',
  styleUrls: ['./generate-question.component.css']
})
export class GenerateQuestionComponent {
  questions: {coefficients: number[], expression: string, power: number, answers: string[]}[] = [
    { 
      power: 3, 
      coefficients: [1, 3, 3, 1], 
      expression: '(2a + b)^3',
      answers: [
        '8a^3',
        '12a^2b',
        '6ab^2',
        'b^3'
      ]
    },
    { 
      power: 4, 
      coefficients: [1, 4, 6, 4, 1], 
      expression: '(3a - 2b)^4',
      answers: [
        '81a^4',
        '-216a^3b',
        '216a^2b^2',
        '-96ab^3',
        '16b^4'
      ]
    },
    { 
      power: 5, 
      coefficients: [1, 5, 10, 10, 5, 1], 
      expression: '(a + 2b)^5',
      answers: [
        'a^5',
        '10a^4b',
        '40a^3b^2',
        '80a^2b^3',
        '80ab^4',
        '32b^5'
      ]
    },
    { 
      power: 6, 
      coefficients: [1, 6, 15, 20, 15, 6, 1], 
      expression: '(2a - b)^6',
      answers: [
        '64a^6',
        '-192a^5b',
        '240a^4b^2',
        '-160a^3b^3',
        '60a^2b^4',
        '-12ab^5',
        'b^6'
      ]
    },
    { 
      power: 7, 
      coefficients: [1, 7, 21, 35, 35, 21, 7, 1], 
      expression: '(3a + b)^7',
      answers: [
        '2187a^7',
        '5103a^6b',
        '5103a^5b^2',
        '2940a^4b^3',
        '1029a^3b^4',
        '231a^2b^5',
        '33ab^6',
        'b^7'
      ]
    },
    { 
      power: 8, 
      coefficients: [1, 8, 28, 56, 70, 56, 28, 8, 1], 
      expression: '(a - 2b)^8',
      answers: [
        'a^8',
        '-16a^7b',
        '112a^6b^2',
        '-448a^5b^3',
        '1120a^4b^4',
        '-1792a^3b^5',
        '1792a^2b^6',
        '-1024ab^7',
        '256b^8'
      ]
    }
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
 


