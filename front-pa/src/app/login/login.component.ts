
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimulationServiceService } from '../services/simulation/simulation-service.service';
import {LoginService} from "../services/login/login.service";
import {User} from "../Models/User";
import Swal from 'sweetalert2';
import {debounceTime, Subject} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnInit{
  public userConnected :any
  public username: string | null |undefined= null;
  public password: string | null |undefined= null;
  errors:string[]=[]
  error:boolean=false
  private debounceSubject: Subject<string> = new Subject<string>();


  constructor(private router: Router,  private simulationService : SimulationServiceService, private  loginservice :LoginService){
    console.log('on ets passer dans le login ')
    console.log('on ets passer dans le login ')
    console.log('on ets passer dans le login ')
    this.debounceSubject
      .pipe(debounceTime(5000))
      .subscribe((password) => this.loginValidator(password));
  }


  ngOnInit(): void {

   console.log('on ets passer dans le login ')
   console.log('on ets passer dans le login ')
   console.log('on ets passer dans le login ')
   console.log('on ets passer dans le login ')
   console.log('on ets passer dans le login ')
    this.simulationService.getCountiesListe().subscribe(data =>console.table(data));
   // this.loginservice.getAuthenticate(body).subscribe(data =>{this.userConnected= data})
    if(this.password)

    console.log("rrgrgrrgr", this.errors)

  }

  onInputChange() {
    this.debounceSubject.next(this.password || '');
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
            localStorage.setItem('token', this.userConnected.token)
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

  loginValidator(password: string) {
    console.log(password);

    this.errors = []; // Réinitialiser les erreurs à chaque validation

    if (password) {
      if (!/[a-z]/.exec(password)) {
        this.addError("Le mot de passe doit comporter au moins une lettre minuscule.");
      }

      if (!/[A-Z]/.exec(password)) {
        this.addError("Le mot de passe doit comporter au moins une lettre majuscule.");
      }

      if (!/[0-9]/.exec(password)) {
        this.addError("Le mot de passe doit comporter au moins un chiffre.");
      }

      if (!/[@$!%*?&]/.exec(password)) {
        this.addError("Le mot de passe doit comporter au moins un caractère spécial parmi '@', '$', '!', '%', '*', '?', '&'.");
      }

      if (password.length < 8) {
        this.addError("Le mot de passe doit être composé d'au moins 8 caractères.");
      }
    }

    console.log(this.errors);
  }

  addError(errorMessage: string) {
    if (!this.errors.includes(errorMessage)) {
      this.errors= [...this.errors,errorMessage]
    }
  }


}
