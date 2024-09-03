import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-game-info-modal',
  templateUrl: './game-info-modal.component.html',
  styleUrls: ['./game-info-modal.component.css']
})
export class GameInfoModalComponent {
  
    constructor(public dialogRef: MatDialogRef<GameInfoModalComponent>) {}
  
    close(): void {
      this.dialogRef.close();
    }
  
}
