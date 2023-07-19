import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User, UserCreate, UserLogin} from "../../Models/User";
import {HttpClient} from "@angular/common/http";
import {Signalement} from "../../Models/Signalement";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public localUrl = 'http://localhost:3000/'
  public isconected = new BehaviorSubject<UserCreate| null>(null);

  constructor(private http : HttpClient) { }




   // public getUserCreate(){
   //   return this.isconected.asObservable();
   // }



  // public setUserCreate(user: UserCreate | null) {
  //   this.isconected.next(user);
  // }

  // publishValue(user: UserCreate) {
  //   this.isconected.next(user);
  // }

  private userSubject = new BehaviorSubject<UserCreate| null>(null);
  public user$ = this.userSubject.asObservable();

  updateData(user: UserCreate) {
    this.userSubject.next(user);
  }


  // updateUser(id: number, updatedUser: any): Observable<any> {
  //   const url = `${this.localUrl}user/${id}`;
  //   return this.http.put(url, updatedUser);
  // }

  updateUser(id: number, updatedUser: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const url = `${this.localUrl}user/${id}`;
    const headers = {
      Authorization: `Bearer ${authToken}`
    };
    return this.http.put(url, updatedUser, { headers });
  }




  getAuthenticate(body:UserLogin): Observable<any> {

    return this.http.post<any>( this.localUrl + 'user/connexion', body)
  }

  postSignalement(body:Signalement): Observable<Signalement> {

    return this.http.post<Signalement>( this.localUrl+'signalement', body)
  }

  createAccount(body:any): Observable<any>
  {
     return this.http.post<any>(this.localUrl+ 'user/inscription',body)
  }

}
