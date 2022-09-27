import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatchPassword } from "../validators/match-password";
import { UniqueUsername } from "../validators/unique-username"
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  userForm: FormGroup;
  // username: RegExp = /^[a-zA-Z0-9]+$/;

  constructor(
    private formBuilder: FormBuilder,
    public matchPassword: MatchPassword,
    public uniqueUsername: UniqueUsername,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.createUserForm()
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.minLength(3), Validators.maxLength(40)], [this.uniqueUsername.validate]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    }, { validators: [this.matchPassword.validate] }
    )
    return this.userForm
  }

  get f() {
    return this.userForm.controls
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    return absCtrl as FormControl;
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    this.authService.signUp(this.userForm.value).subscribe({
      next: (data) => {
        //Navigate to some other page        
      },
      error: (err) => {
        if (!err.status) {          
          this.userForm.setErrors({ noConnection: true });
        }else{
          this.userForm.setErrors({ unknownError: true });
        }
      }
    });
  }
}
