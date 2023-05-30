import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulationServiceService {

  constructor(private http :HttpClient ) { }
  public url = 'https://localhost:4000'

  getCountiesListe(): Observable<any> {
    return this.http.get<any>('http://localhost:4000/textile/countries')
  }
}
