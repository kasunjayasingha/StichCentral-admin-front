import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationHandlerService {

  constructor() {
  }

  emailValidation() {
    return '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  }

  mobileNumberValidation() {
    return '^[+]*[(]{0,1}(?=(?:\\D*\\d){9,11}\\D*$)\\+?[0-9]{1,3}[\\s-]?(?:\\(0?[0-9]{1,5}\\)|[0-9]{1,5})[-\\s]?[0-9][\\d\\s-]{5,7}\\s?(?:x[\\d-]{0,4})?$';

  }

  telephoneNumberValidation() {
    return '^[+]*[(]{0,1}(?=(?:\\D*\\d){9,11}\\D*$)\\+?[0-9]{1,3}[\\s-]?(?:\\(0?[0-9]{1,5}\\)|[0-9]{1,5})[-\\s]?[0-9][\\d\\s-]{5,7}\\s?(?:x[\\d-]{0,4})?$';
  }

  mobileNumberWithCountryCodeValidation() {
    // return '^((\\+94-?)|94|0)?[0-9]{9}$';
    return '^(?:7|0|(?:\\+94)|(?:\\94))[0-9]{9}$';
    // ^(?:7|0|(?:\+94))[0-9]{9,10}$
    // return '^((?!(0))[0-9]{9}[x|X|v|V]|(?!(0))[0-9]{12})$';
    // return '^[+][(]{0,1}(?=(?:\\D\\d){9,11}\\D*$)\\+?[0-9]{1,3}[\\s-]?(?:\\(0?[0-9]{1,5}\\)|[0-9]{1,5})[-\\s]?[0-9][\\d\\s-]{5,7}\\s?(?:x[\\d-]{0,4})?$';
  }

  sriLankaNICValidation() {
    return '^((?!(0))[0-9]{9}[x|X|v|V]|(?!(0))[0-9]{12})$';
  }

  onlyNumbersAllowed() {
    return '^[0-9]*$';
  }

  onlyNumbersAndDecimalAllowed() {
    return '^[0-9.]*$';
  }

  bankAccountNumberValidation() {
    return '^[0-9]{9,16}$';
  }

  onlyletterAllowed() {
    // return '[a-zA-Z ]*';
    return '^[a-zA-Z \-\]+$';
  }

  onlyletterAndDotAllowed() {
    // return '[a-zA-Z ]*';
    return '^[a-zA-Z. \-\]+$';
  }

  onlySpecialCharactersAllowed() {
    return '/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g';
  }

  onlyletterAndNumbersAllowed() {
    return '^(?=.*[a-zA-Z])[a-zA-Z0-9]+$';
  }

  urlValidation() {
    return '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  }

  lettersAnddot() {
    return '^[a-zA-Z.]+$';
  }

  mobileNumberValidation94() {
    return '"^((\\+91-?)|0)?[0-9]{10}$"';

  }

  yearValidation() {
    return '(19|20)[0-9][0-9]';

  }

  userNameValidation() {
    return '^[a-zA-Z0-9_.]*$';
  }

  passwordValidation() {
    return '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])';
  }
}
