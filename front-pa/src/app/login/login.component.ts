
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimulationServiceService } from '../services/simulation/simulation-service.service';
import {LoginService} from "../services/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,  private simulationService : SimulationServiceService, private  loginservice :LoginService){}


  ngOnInit(): void {
    const body ={
      username: "johndoe",
      password: "Password123@"
    }
   console.log('on ets passer dans le login ')
    this.simulationService.getCountiesListe().subscribe(data =>console.table(data));
   this.loginservice.getAuthenticate(body).subscribe(data=>console.log(data))

  }

  onClickToConnect(){

  }

  creerunCompte() {

  }
}
