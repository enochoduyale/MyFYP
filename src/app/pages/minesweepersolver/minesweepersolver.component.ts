import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minesweeper-solver',
  templateUrl: './minesweepersolver.component.html',
  styleUrls: ['./minesweepersolver.component.css']
})
export class MinesweepersolverComponent implements OnInit {

  minesweeperGrid: number[][] = [];
  selectedQuestion: {coefficients: number[], expression: string, power: number, answers: string[]} | null = null;
  currentTermIndex: number = 0;
  currentAnswer: string = '';
  gameOver: boolean = false;

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    // Initialize Minesweeper grid (simple example: 8x8 grid)
    // this.minesweeperGrid = this.generateMinesweeperGrid(8, 10); // 8x8 grid with 10 mines

    // Retrieve the selected question from localStorage
    const selectedQuestionJson = localStorage.getItem('selectedQuestion');
    if (selectedQuestionJson) {
      this.selectedQuestion = JSON.parse(selectedQuestionJson);
    } else {
      alert('No question found in localStorage.');
    }
  }

  generateMinesweeperGrid(size: number, mines: number): number[][] {
    const grid = Array(size).fill(null).map(() => Array(size).fill(0));

    // Place mines randomly
    for (let i = 0; i < mines; i++) {
      let row: number, col: number;
      do {
        row = Math.floor(Math.random() * size);
        col = Math.floor(Math.random() * size);
      } while (grid[row][col] === -1);

      grid[row][col] = -1; // -1 represents a mine
    }

    // Calculate adjacent mine counts
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] !== -1) {
          grid[r][c] = this.countAdjacentMines(grid, r, c);
        }
      }
    }

    return grid;
  }

  countAdjacentMines(grid: number[][], row: number, col: number): number {
    const adjacentPositions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    return adjacentPositions.reduce((count, [dx, dy]) => {
      const newRow = row + dx, newCol = col + dy;
      if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid.length) {
        return count + (grid[newRow][newCol] === -1 ? 1 : 0);
      }
      return count;
    }, 0);
  }

  handleCellClick(row: number, col: number): void {
    if (this.minesweeperGrid[row][col] === -1) {
      alert('You clicked a mine! Game Over.');
      this.gameOver = true;
    } else {
      // Allow solving the next term in binomial expansion
      if (!this.gameOver && this.selectedQuestion) {
        this.solveTerm();
      }
    }
  }

  solveTerm(): void {
    if (!this.selectedQuestion) {
      return;
    }
    
    const correctAnswer = this.selectedQuestion.answers[this.currentTermIndex];
    
    // Validate the current answer (assuming the user input matches the exact string)
    if (this.currentAnswer.trim() === correctAnswer) {
      alert('Correct!');
      this.currentTermIndex++;
      this.currentAnswer = '';

      if (this.currentTermIndex >= this.selectedQuestion.answers.length) {
        alert('You solved all terms! You win!');
        this.gameOver = true;
      }
    } else {
      alert('Incorrect. Try again. Remember to multiply the coefficient by the variable term.');
    }
  }
}
