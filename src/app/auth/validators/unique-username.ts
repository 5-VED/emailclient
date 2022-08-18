import {Injectable} from "@angular/core";
import {AsyncValidator, FormControl} from "@angular/forms";
import {AuthService} from "../auth.service";
import {catchError, Observable, of} from "rxjs";
import {map} from "rxjs/operators"

@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {
  constructor(private userName: AuthService) {
  }

  validate = (control: FormControl): Observable<any> | null => {
    const {value} = control;

    return this.userName.usernameAvailable(value).pipe(
      map((value) => {
        if (value.available) {
          return null
        }
      }),
      catchError((err) => {
        console.log(err)
        if (err.error.username) {
          return of({nonUniqueUsername: true})
        } else {
          return of({noConnection: true})
        }
      })
    )
  }
}
