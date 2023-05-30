import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User, UserLogin} from "../../Models/User";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url :string =  'https://28a2-46-193-6-190.ngrok-free.app/user/'

  constructor(private http : HttpClient) { }



  getAuthenticate(body:UserLogin): Observable<User> {
    return this.http.post<any>( this.url + 'connexion', body)
  }
}
