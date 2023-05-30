
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
  public userConnected :User|null | undefined = undefined
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
    //@TODO remplacer par  le ngmodel
    console.log(this.username)
    console.log(this.password)
    //@TODO a decommenter lorsque l'api est activé
    // if(this.username && this.password){
    //   const body ={
    //     username: this.username,
    //     password: this.password
    //   }
    //
    //   this.loginservice.getAuthenticate(body).subscribe(data =>{this.userConnected= data}, error => {}, ()=>{
    //     if(this.userConnected && this.userConnected?.username === body.username &&  this.userConnected.password == body.password){
    //       Swal.fire(
    //         'login!',
    //         'Authentification reussit!',
    //         'success'
    //       ).then(result =>{
    //         this.router.navigate(['/Comparateur'])
    //       })
    //     }
    //
    //   })
    // }

    if(this.username === 'root' && this.password== 'root'){
      this.error=false
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

  }

  creerunCompte() {
    this.router.navigate(['/CreerUnCompte'])

  }
}
