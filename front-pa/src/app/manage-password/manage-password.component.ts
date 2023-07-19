import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.scss']
})
export class ManagePasswordComponent implements OnInit{
  myForm!: FormGroup;
  paswwordForm!: FormGroup;
  iscorrectUsernameAndEmail: boolean=true;
  showPassword: boolean = false;

  togglePasswordVisibility(hovered: boolean) {
    this.showPassword = hovered;
  }
  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.paswwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {  });
  }


  ValiderMotDepass() {

  }

  refuserMotDePass() {

  }

  validerUserEmail() {

  }

  refuserUserEmail() {

  }
}
