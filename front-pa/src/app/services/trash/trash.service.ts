import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserLogin} from "../../Models/User";
import {Observable} from "rxjs";
import {Dechet} from "../../Models/Dechet";

@Injectable({
  providedIn: 'root'
})
export class TrashService {

  public  url = 'https://91ff-93-26-150-94.ngrok-free.app/'
  // public trashs =this.http.get<Dechet>( this.url +'dechet')
  public  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4OTQzODQ5NSwiZXhwIjoxNjg5NDQyMDk1fQ.jzlskPqcIseBpaFkF3B3nReVR2dyhw2jqA71pWx4A8Y'

  constructor(private http :HttpClient) { }


  // return this.http.get(`${this.apiUrl}/endpoint`, { headers });
  // getTrash(): Observable<Dechet[]> {
  //   console.log(localStorage.getItem('token'))
  //
  //
  //   const headers = new HttpHeaders().set('Authorization', `${localStorage.getItem('token')}`);
  //
  //   return this.http.get<Dechet[]>( 'https://20a2-93-26-150-94.ngrok-free.app/dechet',{ headers })
  // }



  trashs = [
    {
      id : 1,
      img_path : "../../assets/tri/dechets/bouteilleverre1.jpg"
    },
    {
      id : 1,
      img_path : "../../assets/tri/dechets/fenetre.jpg"
    },
    {
      id : 2,
      img_path : "../../assets/tri/dechets/bocal.jpg"
    },
    {
      id : 2,
      img_path : "../../assets/tri/dechets/goblet.jpg"
    },
    {
      id : 3,
      img_path : "../../assets/tri/dechets/brique-carton.jpg"
    },
    {
      id : 3,
      img_path : "../../assets/tri/dechets/journal.jpg"
    },
    {
      id : 4,
      img_path : "../../assets/tri/dechets/canette1.jpg"
    },
    {
      id : 4,
      img_path : "../../assets/tri/dechets/clous.jpg"
    },
    {
      id : 5,
      img_path : "../../assets/tri/dechets/orga.jpg"
    },
    {
      id : 5,
      img_path : "../../assets/tri/dechets/orga.jpg"
    },
    {
      id : 6,
      img_path : "../../assets/tri/dechets/ampoule1.jpg"
    },
    {
      id : 6,
      img_path : "../../assets/tri/dechets/ecran.jpg"
    }
  ];
  public getL1(){

    return this.trashs.filter(elem => elem.id <= 3);
  }
  public getL2(){
    return this.trashs.filter(elem => elem.id <= 4);
  }
  public getL3(){
    return this.trashs.filter(elem => elem.id <= 5);
  }
  public getL4(){
    return this.trashs;
  }
}
