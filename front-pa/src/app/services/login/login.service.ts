import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User, UserCreate, UserLogin} from "../../Models/User";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isconected = new BehaviorSubject<UserCreate| null>(null);


   public getUserCreate(){
     return this.isconected.asObservable();
   }

  public setUserCreate(user: UserCreate | null) {
    this.isconected.next(user);
  }

  publishValue(user: UserCreate) {
    this.isconected.next(user);
  }

  url :string =  'https://91ff-93-26-150-94.ngrok-free.app/user/'

  constructor(private http : HttpClient) { }



  getAuthenticate(body:UserLogin): Observable<any> {

    return this.http.post<any>( this.url + 'connexion', body)
  }

  createAccount(body:User): Observable<UserCreate>
  {
     return this.http.post<UserCreate>(this.url+ 'inscription',body)
  }

}
