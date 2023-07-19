import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../services/login/login.service";
import {Router} from "@angular/router";
import {UserCreate} from "../Models/User";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements  OnInit {
  updateForm!: FormGroup
  userToUpdate:any

  showPassword: boolean = false;

  togglePasswordVisibility(hovered: boolean) {
    this.showPassword = hovered;
  }
  constructor(private http : HttpClient, private loginservice :LoginService,
    private authService : AuthService,
   private route: Router, private fb:FormBuilder
    ) {
  // this.loginservice.getUserCreate().subscribe(res=>{this.userToUpdate= res})


    const userConnectedString = localStorage.getItem('userConnected');
    if (userConnectedString !== null) {
      this.userToUpdate = JSON.parse(userConnectedString);
      console.log("@@@@@@@@", this.userToUpdate);
    }


  }

  ngOnInit(): void {

    this.updateForm= this.fb.group({
      Prenoms:[this.userToUpdate? this.userToUpdate.user.prenom:'',[Validators.required]],
      nom:[this.userToUpdate? this.userToUpdate.user.nom:'',[Validators.required]],
      email:[this.userToUpdate? this.userToUpdate.user.email:'',[Validators.required ,Validators.email]],
      password:['',[Validators.required]],
      Username: [this.userToUpdate? this.userToUpdate.user.username:'', [Validators.required]],
      confirPassword:['',[Validators.required] ]
    },{validators: this.validateCreateUser.bind(this)})

  }

  validate() {
    const userToInsert = {
      "nom" : this.updateForm.get('nom')?.value,
      "prenom": this.updateForm.get('Prenoms')?.value,
      "email":  this.updateForm.get('email')?.value,
      "username": this.updateForm.get('Username')?.value,
      "password": this.updateForm.get('password')?.value,
      "role": "2",
    }
    this.loginservice.updateUser(this.userToUpdate.user.id,userToInsert).subscribe(res=>{
      if(res){
        this.authService.logout()
        this.route.navigate(['/Acceuil'])
        window.location.reload();
        this.ngOnInit()
      }
    })
    console.log(userToInsert)

  }

  refuse() {

  }
  validateCreateUser(control: AbstractControl): {[key: string]: boolean} |  null{
    console.log('dz vkdjvjndvknddvkvnkvkd')


    const errors: { [key: string]: boolean } = {};


    if(this.updateForm) {


      const firstPassword = this.updateForm.get('password')?.value

      const secondPasseword = this.updateForm.get('confirPassword')?.value

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
