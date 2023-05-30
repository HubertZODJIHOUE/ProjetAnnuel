import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../Models/User";
import {Router} from "@angular/router";
import {LoginService} from "../services/login/login.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  public createAcountUser!: FormGroup;

  constructor(private route:Router, private createAcountUserFormBuilder : FormBuilder, private  userService :LoginService) {
    console.log("create account")

  }

  ngOnInit(): void {
    this.ngOninitForm()
  }

  ngOninitForm(){
    console.log("je suis dans le ngoninit")

    this.createAcountUser=this.createAcountUserFormBuilder.group({
      Prenoms:['',[Validators.required]],
      nom:['',[Validators.required]],
      email:['',[Validators.required ,Validators.email]],
      password:['',[Validators.required]],
    })

  }


  onRefuseCreateAccount() {
    console.log('onRefuseCreateAccount')

    this.route.navigate(['/Home'])

  }

  onCreateAccount() {
    let userToInsert: User ={
      "nom" :"",
      "prenom":"this.createAcountUser.get('Prenoms').value",
      "email":"this.createAcountUser.get('email').value",
      "username": "string",
      "password": "string",
      "role": "string"



    }
    // this.userService.postData(userToInsert)
    console.log(userToInsert)
    //@TODO ecrire le service qui permet d'inserrer un utilisateur en passant ar le service de façade
    Swal.fire(
      'Creation de Compte reussit!',
      'Connectez-vous maintenant pour continuer!',
      'success'
    ).then(result =>{
      console.log('onCreateAccount')
      this.route.navigate(['/Login'])
    })



  }

  onLogin() {
    console.log('jai clicker sur login')
    this.route.navigate(['/Login']).then(r => console.log(r))
  }

}
