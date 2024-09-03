import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-game-modal',
  templateUrl: './start-game-modal.component.html',
  styleUrls: ['./start-game-modal.component.css']
})
export class StartGameModalComponent {
  fullName: string = '';

  constructor(public dialogRef: MatDialogRef<StartGameModalComponent>, 
    public router: Router) {}

  close(): void {
    this.dialogRef.close();
  }

  startGame(): void {
    if (this.fullName) {
      this.dialogRef.close();
      this.router.navigate(['/generate-question'])
    }
  }
}
