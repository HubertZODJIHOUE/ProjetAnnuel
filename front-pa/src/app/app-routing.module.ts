import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import {AppComponent} from "./app.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimulationComponent} from "./simulation/simulation.component";
import {SignalementComponent} from "./signalement/signalement.component";
import {TriGameComponent} from "./tri-game/tri-game.component";

const routes: Routes = [
   {path: 'Login', component: LoginComponent},
  {path: 'Comparateur', component: SimulationComponent},
  {path: 'Acceuil', component: AppComponent},
  {path: 'signalement', component: SignalementComponent},
  {path: 'jeu', component: TriGameComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule,
    FormsModule,],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
