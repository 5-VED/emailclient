import {Injectable} from "@angular/core";
import {FormGroup, ValidationErrors, Validator} from "@angular/forms";

@Injectable({providedIn: 'root'})
export class MatchPassword implements Validator {

  validate(formGroup: FormGroup): ValidationErrors | null {
    const {password, confirmPassword} = formGroup.value
    if (password === confirmPassword) {
      return null
    } else {
      return {passwordDontMatch: true}
    }
  }
}
