
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimulationServiceService } from '../services/simulation/simulation-service.service';
import {LoginService} from "../services/login/login.service";
import {User} from "../Models/User";
import Swal from 'sweetalert2';
import {debounceTime, Subject} from "rxjs";
import {AuthService} from "../services/auth/auth.service";


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
  private errorConnexion: boolean=false;


  constructor(private router: Router,  private simulationService : SimulationServiceService, private  loginservice :LoginService , private authService: AuthService){
    console.log('on ets passer dans le login ')
    console.log('on ets passer dans le login ')
    console.log('on ets passer dans le login ')
    this.debounceSubject
      .pipe(debounceTime(5000))
      .subscribe((password) => this.loginValidator(password));
  }


  showPassword: boolean = false;

  togglePasswordVisibility(hovered: boolean) {
    this.showPassword = hovered;
  }


  ngOnInit(): void {


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
    //@TODO a decommenter lorsque l'api est activé
     if(this.username && this.password){
       const body ={
        "username": this.username,
        "password": this.password
      }

      this.loginservice.getAuthenticate(body).subscribe(data =>{
        console.log(data)
        this.userConnected= data
        console.log(body)

        if(this.authService.login(body.username, body.password, this.userConnected)){
          this.loginservice.updateData(this.userConnected)
          this.loginservice.user$.subscribe(user=>{
            console.log(user)
          })
          Swal.fire(
            'login!',
            'Authentification reussit!',
            'success'
          ).then(result =>{

            if(this.userConnected)
              localStorage.setItem('userConnected', JSON.stringify(this.userConnected));


            this.router.navigate(['/Acceuil'])
            window.location.reload();
            this.ngOnInit()
          })
        }else{
          this.errorConnexion= true
        }
      }, error => {},
        ()=>{


      })
    }


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


  mdpOublie() {
    this.router.navigate(['/updatePasseword'])
  }
}
