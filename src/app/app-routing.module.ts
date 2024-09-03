import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameInterfaceComponent } from './pages/game-interface/game-interface.component';
import { GenerateQuestionComponent } from './pages/generate-question/generate-question.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { PascalCoefficientsComponent } from './pages/pascal-coefficients/pascal-coefficients.component';

const routes: Routes = [
  {path: 'game-interface', component: GameInterfaceComponent},
  {path: 'generate-question', component: GenerateQuestionComponent},
  {path: 'pascal-coefficients', component: PascalCoefficientsComponent},
  {path: 'not-found', component:NotFoundPageComponent},

  {path: '', redirectTo: 'game-interface', pathMatch:'full'},
  {path: '*', redirectTo: 'not-found', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
