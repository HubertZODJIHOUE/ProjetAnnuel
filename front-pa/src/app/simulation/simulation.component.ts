import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {SimulationServiceService} from "../services/simulation/simulation-service.service";

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent  implements  OnInit{
  simulationForm!: FormGroup
  public lesPays: string[]= [];
  public filteredCountry: string[]= [];
  constructor(private  fb: FormBuilder , private simulationService : SimulationServiceService) {
  }
  ngOnInit(): void {
    this.simulationForm = this.fb.group({
      pays:['',[]],
      produit:['',[]],
      matiere:['',[]],
      typesimulation:['',[]],


    },{validators: this.validFormSearch.bind(this)})

  }


  getAllcontrie() {
    this.simulationService.getCountiesListe().subscribe(res=>{ this.lesPays= res},error => {}, ()=> {
      console.log(this.lesPays)
    })
  }

  validFormSearch(control : AbstractControl): {[key:string]: boolean}| null{
    console.log(control)

    let paysSaisie = this.simulationForm?.get('pays')?.value

    const errors: {[key: string]: boolean} = {};

    this.filteredCountry = this.lesPays.filter(element =>
      element.toLowerCase().includes(paysSaisie.toLowerCase())
    );

    if(this.simulationForm){



    }



    Object.keys(errors)

    return null;
  }


  annuler() {

  }

  valider() {

  }
}
