import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatchPassword} from "../validators/match-password";
import {UniqueUsername} from "../validators/unique-username"

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  userForm: FormGroup;
  userName: RegExp = /^[a-zA-Z0-9]+$/;

  constructor(
    private formBuilder: FormBuilder,
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername
  ) {
  }

  ngOnInit(): void {
    this.createUserForm()
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
        userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.minLength(3), Validators.maxLength(40)], [this.uniqueUsername.validate]],
        password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      }, {validators: [this.matchPassword.validate]}
    )
    return this.userForm
  }

  get f() {
    return this.userForm.controls
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    return absCtrl as FormControl;
  }

}
