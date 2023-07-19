import { Injectable } from '@angular/core';
import {UserCreate} from "../../Models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';


  constructor() { }

  login(username: string, password: string  , user: any ): boolean {
    console.log("+++++++++++++", user)
    console.log(username)
    console.log(password)
    console.log("je pass dnas le login  ------------------")

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    let valRetour:boolean =false;
    if(user){
      console.log("kpankakak cest true  je debug le false")
      const token = user.token
      if(token){
        localStorage.setItem(this.authTokenKey, token);

      }
      valRetour=true
    }else{
      valRetour=false

    }
    // Effectuez ici la logique de vérification des informations d'identification
    // Si les informations d'identification sont valides, définissez le jeton d'authentification dans le localStorage

   return valRetour
  }

  logout(): void {
    // Supprimez le jeton d'authentification du localStorage lors de la déconnexion
    localStorage.removeItem(this.authTokenKey);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"),
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  }

  isAuthenticated(): boolean {
    // Vérifiez si le jeton d'authentification est présent dans le localStorage
    return !!localStorage.getItem(this.authTokenKey);
  }

  getAuthToken(): string | null {
    // Récupérez le jeton d'authentification depuis le localStorage
    return localStorage.getItem(this.authTokenKey);
  }



}
