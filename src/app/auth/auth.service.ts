import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";

interface UserNameAvailableResponse {
  available: boolean
}

interface SignUpCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpResponse {
  username: string;
}

interface SignInCredentials{
  username: string;
  password: string;
}

interface SignInResponse {
  username: string;
  authenticated: boolean;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  isSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  usernameAvailable(username: string) {
    return this.http.post<UserNameAvailableResponse>(`${this.rootUrl}/auth/username`, {
      username
    });
  }

  signUp(credentials: SignUpCredentials) {
    return this.http.post<SignUpResponse>(`${this.rootUrl}/auth/signup`,
      credentials).pipe(tap(() => {
        this.isSignedIn$.next(true);
      }));
  }

  checkAuth() {
    return this.http.get<SignInResponse>(`${this.rootUrl}/auth/signedin`).pipe(tap(({ authenticated }) => {
      this.isSignedIn$.next(authenticated);
    }))
  }

  signOut() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(tap(() => {
      this.isSignedIn$.next(false);
    }))
  }

  signIn(credentials: SignInCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(() => {
          this.isSignedIn$.next(true)
        })
      )
  }

}
