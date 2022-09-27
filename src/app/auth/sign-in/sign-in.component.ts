import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router

  ) { }


  ngOnInit(): void {
    this.SignInUser()
  }

  SignInUser(): FormGroup {
    return this.signInForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.minLength(3), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]]
    })
  }

  get f() {
    return this.signInForm.controls
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    return absCtrl as FormControl
  }

  signIn() {
    if (this.signInForm.invalid) {
      return
    }

    this.authService.signIn(this.signInForm.value).pipe().subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox')
      },
      error: ({ error }) => {
        if (error.username || error.password) {
          this.signInForm.setErrors({ credentials: true });
        }
      }
    }
    )
  }
}

