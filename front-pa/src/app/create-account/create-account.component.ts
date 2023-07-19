import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {User, UserCreate} from "../Models/User";
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

  showPassword: boolean = false;

  togglePasswordVisibility(hovered: boolean) {
    this.showPassword = hovered;
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
      Username: ['', [Validators.required]],
      confirPassword:['', ]

      // nom: string,
      //   prenom: string,
      //   email: string,
      //   username: string,
      //   password: string,
      //   date_creation?: Date
      // role: string

    }, {validators:this.validateCreateUser.bind(this)})

  }


  onRefuseCreateAccount() {
    console.log('onRefuseCreateAccount')

    this.route.navigate(['/Login'])

  }

  onCreateAccount() {



      const userToInsert = {
        "nom" : this.createAcountUser.get('nom')?.value,
        "prenom": this.createAcountUser.get('Prenoms')?.value,
        "email":  this.createAcountUser.get('email')?.value,
        "username": this.createAcountUser.get('Username')?.value,
        "password": this.createAcountUser.get('password')?.value,
        "role": "2",
      }
      console.log(userToInsert)
      //
      this.userService.createAccount(userToInsert).subscribe(res=>{
        if(res.token){
          Swal.fire(
            'Creation de Compte reussit!',
            'Connectez-vous maintenant pour continuer!',
            'success'
          ).then(result =>{
            console.log('onCreateAccount')
            this.route.navigate(['/Login'])
          })
          }

      }, error => {

      },
      ()=>{


        })


    // this.userService.postData(userToInsert)
    // console.log(userToInsert)
    //@TODO ecrire le service qui permet d'inserrer un utilisateur en passant ar le service de façade




  }

  onLogin() {
    console.log('jai clicker sur login')
    this.route.navigate(['/Login']).then(r => console.log(r))
  }


  validateCreateUser(control: AbstractControl): {[key: string]: boolean} |  null{
    console.log('dz vkdjvjndvknddvkvnkvkd')


    const errors: { [key: string]: boolean } = {};


    if(this.createAcountUser) {


      const firstPassword = this.createAcountUser.get('password')?.value

      const secondPasseword = this.createAcountUser.get('confirPassword')?.value

      if (firstPassword) {
        if (!/[a-z]/.exec(firstPassword)) {

          console.log("@@@@@@@@@@@@@@@@@@@@")


          errors['erreurMinuscule'] = true;
        }

        if (!/[A-Z]/.exec(firstPassword)) {

          errors['erreurMajuscule'] = true;
        }

        if (!/[0-9]/.exec(firstPassword)) {

          errors['erreurChiffre'] = true;
        }

        if (!/[@$!%*?&]/.exec(firstPassword)) {

          errors['erreureCaracSpeciale'] = true;
        }

        if (firstPassword.length < 8) {
          errors['erreurTaille'] = true;

        }
        if (firstPassword!== secondPasseword) {
          errors['erreurIdentiqueMdp'] = true;

        }

      }




      if (Object.keys(errors).length > 0) {

        return errors;

      }



    }

    return null;

  }

}


