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
  public lesPays: { code: string; name: string; }[] =[];
  public materials: { id: string; name: string; }[] =[];
  public produits: { id: string; name: string; }[] =[];
  public lesProduits: string[]= [];
  public filteredCountry: string[]= [];
  public launchSimulation : boolean = false
  selectedcountries: string='';
  selectedMaterial:string= '';
  paysDeProvenance: string ='';
  paysTeinture: string ='';
  produit:string = '';
  result: any
  constructor(private  fb: FormBuilder , private simulationService : SimulationServiceService) {
  }
  ngOnInit(): void {
    this.simulationForm = this.fb.group({
      pays:['',[]],
      produit:['',[]],
      matiere:['',[]],
      typesimulation:['',[]],
      paysDeProvenance:['',[]],
      poids:["", ],
      impact:['',]



    },{validators: this.validFormSearch.bind(this)})
    this.getAllcontrie()
    this.getProducts()
    this.getSimulator()
    this.getMaterial()
    // this.getSimulatorDetails()
    // this.getSimulatorById("")


  }


  getAllcontrie() {
    this.simulationService.getCountiesListe().subscribe(res=>{ console.log(res), this.lesPays = res},error => {}, ()=> {

    })
  }

  getProducts(){
    this.simulationService.getProducts().subscribe(res=>{console.log(res), this.produits= res},error => {}, ()=> {
    })
  }

  getSimulator(){
    this.simulationService.getSimulator().subscribe(res=>{console.log(res) },error => {}, ()=> {

    })
  }

  getMaterial(){
    this.simulationService.getMaterial().subscribe(res=>{console.log(res) , this.materials= res},error => {}, ()=> {

    })
  }

  // getSimulatorById(idImpact :string){
  //   this.simulationService.getSimulatorByID(idImpact).subscribe(res=>{ console.log(res)},error => {}, ()=> {
  //
  //   })
  // }

  // getSimulatorDetails(){
  //   this.simulationService.getSimulatorDetails().subscribe(res=>{console.log(res) },error => {}, ()=> {
  //
  //   })
  // }
  impact: any;






  validFormSearch(control : AbstractControl): {[key:string]: boolean}| null{

    let paysSaisie = this.simulationForm?.get('pays')?.value

    const errors: {[key: string]: boolean} = {};

    // this.filteredCountry = this.lesPays.filter(element =>
    //   element.toLowerCase().includes(paysSaisie.toLowerCase())
    // );

    if(this.simulationForm){




    }



    Object.keys(errors)

    return null;
  }


  annuler() {

  }

  valider() {
    let mater;
    this.launchSimulation = true
    this.materials.forEach(material=>{
      if(material.name=== this.simulationForm.get('matiere')?.value){
        mater= material
      }
    })
    const data ={

      "mass": 88,
      "materials": [
        {
          "id": "lin",
          "share": 1
        }
      ],
      "product": "jupe",
      "countrySpinning": "CN",
      "countryFabric": "CN",
      "countryDyeing": "FR",
      "countryMaking": "FR"
    }

  }

  testSimulation() {
    const data ={

      "mass": 3,
      "materials": [
      {
        "id": "coton",
        "share": 1
      }
    ],
      "product": "tshirt",
      "countrySpinning": "FR",
      "countryFabric": "FR",
      "countryDyeing": "FR",
      "countryMaking": "FR"
    }

    this.simulationService.createPost(data).subscribe(res=>{console.log('@@@@@', res), this.result = res})
  }

  retour() {
    this.result=null
  }
}
