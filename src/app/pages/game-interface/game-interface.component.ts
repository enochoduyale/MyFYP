import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameInfoModalComponent } from 'src/app/components/game-info-modal/game-info-modal.component';
import { StartGameModalComponent } from 'src/app/components/start-game-modal/start-game-modal.component';

@Component({
  selector: 'app-game-interface',
  templateUrl: './game-interface.component.html',
  styleUrls: ['./game-interface.component.css']
})
export class GameInterfaceComponent {

  constructor(public dialog: MatDialog) {}

  openStartGameModal(): void {
    this.dialog.open(StartGameModalComponent, {
      width: '400px'
    });
  }

  openGameInfoModal(): void {
    this.dialog.open(GameInfoModalComponent, {
      width: '400px'
    });
  }
}
