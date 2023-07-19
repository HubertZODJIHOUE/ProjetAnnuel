import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login/login.service";
import {HttpClient} from "@angular/common/http";
import {UserCreate} from "./Models/User";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements  OnInit{
  isDropdownVisible: boolean = false;
  public  connectedInformation: UserCreate| null = null
  public userConnectedToken :  string| undefined |null= null
  public userConneted :  any;
  loggedIn: boolean = false;
  constructor(private loginService : LoginService , private http: HttpClient, private router:Router, private  authService : AuthService) {
  }
  ngOnInit() {
    this.checkLoggedInStatus()
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/Acceuil']);

    }
    const jsonString = localStorage.getItem('userConnected');
      if(jsonString){
         this.userConneted = JSON.parse(jsonString);

      }




    // console.log("je suis dans le appp")
    // this.loginService.getUserCreate().subscribe(user=> this.connectedInformation = user)
    // this.userConneted =localStorage.getItem('userconnected')
    // if(this.userConneted)
    // this.userConneted =JSON.parse(this.userConneted)
    //
    //
    // this.checkLoggedInStatus();
    //
    // // Écoute les modifications du localStorage
    // window.addEventListener('storage', (event: StorageEvent) => {
    //   alert('y a eu changement')
    //
    //
    //   if (event.key === 'loggedIn') {
    //     this.checkLoggedInStatus();
    //   }
    // });
  }

  checkLoggedInStatus() {
    this.loggedIn = this.authService.isAuthenticated();
  }

  // title = 'front-pa';
  // public isconneted: boolean=  false;
  //
  deconnected() {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    this.authService.logout();
    localStorage.removeItem('token');
    this.userConnectedToken = null;
    this.router.navigate(['/Login']);
    this.ngOnInit();
  }

  //
  // checkLoggedInStatus() {
  //   const loggedInValue = localStorage.getItem('loggedIn');
  //   this.loggedIn = loggedInValue === 'true';
  // }

  showDropdown() {
    this.isDropdownVisible = true;
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }


  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  updataUser() {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log("update")
    this.router.navigate(['/updateUser'])

  }
}
