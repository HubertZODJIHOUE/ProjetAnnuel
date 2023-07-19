import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulationServiceService {
  public localUrl = 'http://localhost:3000/'

  constructor(private http :HttpClient ) { }
  public apiEcobalyseUrl = 'https://ecobalyse.beta.gouv.fr/api/'
  public url = 'https://localhost:4000'

  getCountiesListe(): Observable<any> {
    return this.http.get<any>('http://localhost:4000/textile/countries')
  }

   getProducts(): Observable<any>{
     return this.http.get<any>('http://localhost:4000/textile/products')
   }

  getSimulator(): Observable<any>{
    return this.http.get<any>('http://localhost:4000/textile/simulator')
  }

  getMaterial(): Observable<any>{
    return this.http.get<any>('http://localhost:4000/textile/materials')
  }

  getSignalemnet(): Observable<any>{
    console.log("jfnzdclnddldlsdnlvln")
    return this.http.get<any>(this.localUrl+'signalement')
  }


  // getSimulatorByID(idImpact: string): Observable<any>{
  //   return this.http.get<any>('http://localhost:4000/textile/simulator'+ idImpact)
  // }

  getSimulatorDetails(): Observable<any>{
    return this.http.get<any>('http://localhost:4000/textile/simulator/detailed')
  }
  createPost(postData: any): Observable<any> {
    return this.http.post('http://localhost:4000/textile/simulator', postData);
  }
}
