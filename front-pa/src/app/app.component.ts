import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login/login.service";
import {HttpClient} from "@angular/common/http";
import {UserCreate} from "./Models/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements  OnInit{
  public  connectedInformation: UserCreate| null = null
  constructor(private loginService : LoginService , private http: HttpClient) {
  }
  ngOnInit() {
    this.loginService.getUserCreate().subscribe(user=> this.connectedInformation = user)
  }

  title = 'front-pa';
  public isconneted: boolean=  false;

}
