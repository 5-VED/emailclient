import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface UserNameAvailableResponse {
  available: boolean

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }
  usernameAvailable(username: string) {
    return this.http.post<UserNameAvailableResponse>('https://api.angular-email.com/auth/username', {
      username
    })
  }
}
