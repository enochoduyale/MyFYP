import { Component, OnInit, ViewChild } from '@angular/core';
import { TimerComponent } from 'src/app/components/timer/timer.component';
export interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  adjacentMines: number;
}
@Component({
  selector: 'app-minesweeper-solver',
  templateUrl: './minesweepersolver.component.html',
  styleUrls: ['./minesweepersolver.component.css']
})


export class MinesweepersolverComponent implements OnInit {

  minesweeperGrid: Cell[][] = [];
  selectedQuestion: { coefficients: number[], expression: string, power: number, answers: string[] } | null = null;
  currentTermIndex: number = 0;
  hintMessage: string | null = null; // To store the hint message
  currentAnswer: string = '';
  gameOver: boolean = false;
  points: number = 0; // Track points
  
  notificationMessage: string = ''; // Store the notification message
  notificationType: 'success' | 'error' = 'success'; // Notification type (success or error)
  showNotification: boolean = false;
  finalExpression!: string | undefined;
  cellSelected: boolean = false;

  gridSize: number = 8;
  mineCount: number = 10;
  totalSafeCells: number = 0; // Track safe cells
  timerInterval: any;
  hints: string[] = [
    'Hint for the first term: Use the full power of a, and b is raised to 0. Finally multiply by the coefficient below',
    'Hint for the second term: Decrease the power of a by 1, and increase the power of b by 1. Finally multiply by the coefficient below',
    'Hint for the third term: The power of a decreases again, and the power of b increases further. Finally multiply by the coefficient below',
    'Hint for the third term: The power of a decreases again, and the power of b increases further. Finally multiply by the coefficient below',
    'Hint for the third term: The power of a decreases again, and the power of b increases further. Finally multiply by the coefficient below',
    'Hint for the third term: The power of a decreases again, and the power of b increases further. Finally multiply by the coefficient below',

  ];

  @ViewChild(TimerComponent) timerComponent!: TimerComponent; // Access the timer component

  ngOnInit(): void {
    this.initializeGame();
    this.formattedAnswers();

  }

  ngAfterViewInit() {
    this.timerComponent.startTimer(); 
  }

  initializeGame(): void {
    // Minesweeper grid initialization
    this.totalSafeCells = (this.gridSize * this.gridSize) - this.mineCount;
    this.generateMinesweeperGrid(this.gridSize, this.mineCount);

    // Retrieve the selected question from localStorage
    const selectedQuestionJson = localStorage.getItem('selectedQuestion');
    if (selectedQuestionJson) {
      this.selectedQuestion = JSON.parse(selectedQuestionJson);
    } else {
      alert('No question found in localStorage.');
    }
  }

  // Generate Minesweeper Grid
  generateMinesweeperGrid(size: number, mines: number): void {
    this.minesweeperGrid = [];
    for (let i = 0; i < size; i++) {
      this.minesweeperGrid[i] = [];
      for (let j = 0; j < size; j++) {
        this.minesweeperGrid[i][j] = { isMine: false, isRevealed: false, adjacentMines: 0 };
      }
    }

    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (!this.minesweeperGrid[row][col].isMine) {
        this.minesweeperGrid[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate adjacent mines for each cell
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!this.minesweeperGrid[i][j].isMine) {
          this.minesweeperGrid[i][j].adjacentMines = this.countAdjacentMines(i, j);
        }
      }
    }
  }

  // Count adjacent mines for each cell
  countAdjacentMines(row: number, col: number): number {
    const adjacentPositions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    let count = 0;
    adjacentPositions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (this.isValidCell(newRow, newCol) && this.minesweeperGrid[newRow][newCol].isMine) {
        count++;
      }
    });

    return count;
  }

  // Check if cell is within the grid bounds
  isValidCell(row: number, col: number): boolean {
    return row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize;
  }

  // Handle cell click in Minesweeper
  // handleCellClick(row: number, col: number): void {
  //   if (this.gameOver || this.minesweeperGrid[row][col].isRevealed) {
  //     return;
  //   }

  //   if (this.minesweeperGrid[row][col].isMine) {
  //     this.gameOver = true;
  //     this.revealAllMines();
  //     alert('Game Over! You clicked on a mine.');
  //   } else {
  //     this.revealCell(row, col);
  //   }
  // }


  handleCellClick(row: number, col: number): void {
    if (this.gameOver || this.minesweeperGrid[row][col].isRevealed) {
      return;
    }

    if (this.minesweeperGrid[row][col].isMine) {
      // this.gameOver = true;
      this.endGame()
      this.revealAllMines();
      alert('Game Over! You clicked on a mine.');
    } else {
      this.revealCell(row, col);
      this.cellSelected = true; // Mark that the user selected a safe cell
    }
  }

  // Reveal the cell and adjacent safe cells if no adjacent mines
  revealCell(row: number, col: number): void {
    if (!this.isValidCell(row, col) || this.minesweeperGrid[row][col].isRevealed) {
      return;
    }

    this.minesweeperGrid[row][col].isRevealed = true;

    if (this.minesweeperGrid[row][col].adjacentMines === 0) {
      const adjacentPositions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      adjacentPositions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        this.revealCell(newRow, newCol);
      });
    }
  }

  // Reveal all mines when the game ends
  revealAllMines(): void {
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        if (this.minesweeperGrid[i][j].isMine) {
          this.minesweeperGrid[i][j].isRevealed = true;
        }
      }
    }
  }

  // Solve a binomial term
  // solveTerm(): void {
  //   if (!this.selectedQuestion) {
  //     return;
  //   }

  //   const correctAnswer = this.selectedQuestion.answers[this.currentTermIndex];

  //   // Check if the user's answer is correct
  //   if (this.currentAnswer.trim() === correctAnswer) {
  //     this.points += 10; // Add 10 points for each correct answer
  //     this.showNotification = true;
  //     this.notificationMessage = 'Correct! 10 points added!';
  //     this.notificationType = 'success';
  //     this.hintMessage = null; // Reset hint message when moving to the next term

  //     // setTimeout(() => {
  //     //   this.showNotification = false;
  //     // }, 1500);

  //     this.currentTermIndex++;
  //     this.currentAnswer = '';

  //     if (this.currentTermIndex >= this.selectedQuestion.answers.length) {
  //       this.endGame();
  //     }
  //   } else {
  //     this.showNotification = true;
  //     this.notificationMessage = 'Incorrect. Try again.';
  //     this.notificationType = 'error';
  //   }
  // }

  solveTerm(): void {
    if (!this.selectedQuestion) {
      return;
    }

    // Check if the user has selected a cell before proceeding
    if (!this.cellSelected) {
      this.showNotification = true;
      this.notificationMessage = 'Please select a Minesweeper cell before solving the term!';
      this.notificationType = 'error';
      return;
    }

    const correctAnswer = this.selectedQuestion.answers[this.currentTermIndex];

    if (this.currentAnswer.trim() === correctAnswer) {
      this.points += 10;
      this.showNotification = true;
      this.notificationMessage = 'Correct! 10 points added!';
      this.notificationType = 'success';
      this.hintMessage = null;

      this.cellSelected = false; // Reset the flag for the next term

      this.currentTermIndex++;
      this.currentAnswer = '';

      if (this.currentTermIndex >= this.selectedQuestion.answers.length) {
        this.endGame();
      }
    } else {
      this.showNotification = true;
      this.notificationMessage = 'Incorrect. Try again.';
      this.notificationType = 'error';
    }
  }


  onTimeUp(): void {
    alert('Time is up! The game is over.');
    this.timerComponent.stopTimer();
    this.endGame();
  }

  // Method to display a hint for the current term
  showHint(): void {
    if (this.currentTermIndex < this.hints.length) {
      this.hintMessage = this.hints[this.currentTermIndex];
    } else {
      this.hintMessage = 'No more hints available for this step.';
    }
  }



  // End game logic
  endGame(): void {
    this.gameOver = true;
    const totalQuestions = this.selectedQuestion?.answers.length || 0;
    const scorePercentage = (this.points / (totalQuestions * 10)) * 100;
    this.showNotification = true;
    this.notificationMessage = `Your final score: ${scorePercentage}%`;
    this.formattedAnswers();
    this.notificationType = 'success';
  }

  get youWin(){
    return this.notificationMessage.includes('You win! Your');
  }

  
  formattedAnswers() {
   this.finalExpression =  this.selectedQuestion?.answers.map((answer, index) => {
      // For all elements except the first, prepend a "+" if they don't start with a minus sign
      if (index !== 0 && !answer.startsWith('-')) {
        return `+ ${answer}`;
      }
      return answer; // Keep the first element or any element starting with a minus as-is
    }).join(' ');
  } 
}



