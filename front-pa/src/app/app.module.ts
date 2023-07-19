import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { SimulationComponent } from './simulation/simulation.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SignalementComponent } from './signalement/signalement.component';
import { TriGameComponent } from './tri-game/tri-game.component';
import {CorsInterceptor} from "./cors.interceptor";
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ListeSignalementComponent } from './liste-signalement/liste-signalement.component';
import { UsercomponentComponent } from './dynamicComponent/usercomponent/usercomponent.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import {AuthInterceptor} from "./auth.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SimulationComponent,
    CreateAccountComponent,
    SignalementComponent,
    TriGameComponent,
    AcceuilComponent,
    ListeSignalementComponent,
    UsercomponentComponent,
    UpdateUserComponent,
    ManagePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [ { provide: HTTP_INTERCEPTORS,  useClass:AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
