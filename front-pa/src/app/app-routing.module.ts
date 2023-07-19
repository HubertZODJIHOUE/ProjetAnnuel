import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import {AppComponent} from "./app.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimulationComponent} from "./simulation/simulation.component";
import {SignalementComponent} from "./signalement/signalement.component";
import {TriGameComponent} from "./tri-game/tri-game.component";
import {AcceuilComponent} from "./acceuil/acceuil.component";
import {AuthGuard} from "./auth.guard";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {ListeSignalementComponent} from "./liste-signalement/liste-signalement.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {ManagePasswordComponent} from "./manage-password/manage-password.component";

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Comparateur', component: SimulationComponent,canActivate:[AuthGuard]},
  {path: 'Acceuil', component: AcceuilComponent,canActivate: [AuthGuard]},
  {path: 'signalement', component: SignalementComponent,canActivate: [AuthGuard]},
  {path: 'jeu', component: TriGameComponent,canActivate: [AuthGuard]},
  {path: 'CreerUnCompte', component: CreateAccountComponent},
  {path: 'updatePasseword', component: ManagePasswordComponent},
  {path: 'updateUser', component: UpdateUserComponent ,canActivate: [AuthGuard]},

  {path: 'ListeSignalement', component: ListeSignalementComponent ,canActivate: [AuthGuard]},
  { path: '', redirectTo: 'Login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule,
    FormsModule,],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
