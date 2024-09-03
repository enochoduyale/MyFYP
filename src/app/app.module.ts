import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameInterfaceComponent } from './pages/game-interface/game-interface.component';
import { StartGameModalComponent } from './components/start-game-modal/start-game-modal.component';
import { GameInfoModalComponent } from './components/game-info-modal/game-info-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { 
  MatInputModule
} from '@angular/material/input';
import { 
  MatButtonModule
} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    GameInterfaceComponent,
    StartGameModalComponent,
    GameInfoModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
