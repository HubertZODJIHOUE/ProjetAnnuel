import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { SimulationComponent } from './simulation/simulation.component';
import { CreateAccountComponent } from './create-account/create-account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SimulationComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,


    RouterModule.forRoot([
      {path: 'Login', component: LoginComponent},
      {path: 'Comparateur', component: SimulationComponent},
      {path: 'Acceuil', component: AppComponent},
      {path: 'CreerUnCompte', component: CreateAccountComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
