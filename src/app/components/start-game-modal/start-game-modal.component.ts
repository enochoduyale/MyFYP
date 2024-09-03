import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-start-game-modal',
  templateUrl: './start-game-modal.component.html',
  styleUrls: ['./start-game-modal.component.css']
})
export class StartGameModalComponent {
  fullName: string = '';

  constructor(public dialogRef: MatDialogRef<StartGameModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

  startGame(): void {
    if (this.fullName) {
      localStorage.setItem('playerName', this.fullName);
      this.dialogRef.close();
    }
  }
}
