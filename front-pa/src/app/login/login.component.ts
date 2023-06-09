
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimulationServiceService } from '../services/simulation/simulation-service.service';
import {LoginService} from "../services/login/login.service";
import {User} from "../Models/User";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userConnected :any
  public username: string | null |undefined= null;
  public password: string | null |undefined= null;
  error: boolean= false;


  constructor(private router: Router,  private simulationService : SimulationServiceService, private  loginservice :LoginService){

  }


  ngOnInit(): void {

   console.log('on ets passer dans le login ')
    this.simulationService.getCountiesListe().subscribe(data =>console.table(data));
   // this.loginservice.getAuthenticate(body).subscribe(data =>{this.userConnected= data})

  }

  onClickToConnect(){
    this.error=false
    //@TODO remplacer par  le ngmodel
    console.log(this.username)
    console.log(this.password)
    //@TODO a decommenter lorsque l'api est activé
     if(this.username && this.password){
       const body ={
        "username": this.username,
        "password": this.password
      }
      console.log(body)

      this.loginservice.getAuthenticate(body).subscribe(data =>{this.userConnected= data, console.log(data)}, error => {}, ()=>{
        console.log('@@@@',this.userConnected.user.username)
        console.log(body.username)
        console.log(this.userConnected?.username == body.username)

        if(this.userConnected.user.username== body.username){
          console.log('je passe de dans ')
          console.log(this.userConnected)
          Swal.fire(
            'login!',
            'Authentification reussit!',
            'success'
          ).then(result =>{
            this.router.navigate(['/Comparateur'])
          })
        }else{
          this.error= true
        }

      })
    }
    //
    // if(this.username === 'root' && this.password== 'root'){
    //   this.error=false
    //   Swal.fire(
    //     'login!',
    //     'Authentification reussit!',
    //     'success'
    //   ).then(result =>{
    //     this.router.navigate(['/Comparateur'])
    //   })
    // }else{
    //   this.error= true
    // }

  }

  creerunCompte() {
    this.router.navigate(['/CreerUnCompte'])

  }
}
