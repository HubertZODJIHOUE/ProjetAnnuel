import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User, UserCreate, UserLogin} from "../../Models/User";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url :string =  'https://f55e-46-193-6-190.ngrok-free.app/user/'

  constructor(private http : HttpClient) { }



  getAuthenticate(body:UserLogin): Observable<any> {
    console.log('je passe dans le service @@@@@@@@@@@@@@@@@@@@@@@@')
    return this.http.post<any>( this.url + 'connexion', body)
  }

  createAccount(body:User): Observable<UserCreate>
  {
     return this.http.post<UserCreate>(this.url+ 'inscription',body)
  }

}
