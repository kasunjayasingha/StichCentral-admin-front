import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {AUTENTICATION_URL_API} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
  }

  async checkUsernameExists(username: string) {
    return new Promise((resolve, reject) => {
      let response: string;
      const promise = this.http.get(AUTENTICATION_URL_API.CHEACK_USERNAME.USERNAME + '/' + username).toPromise();
      promise.then((data) => {
        console.log('Promise resolved with: ' + data);
        // @ts-ignore
        response = data.success == true;
        resolve(response);
      }).catch((error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
        reject('Not a good response 500');
        // this.toastr.error(' Upload Failed');
      });
    });
  }

  adminLogin(loginData: FormData): any {
    return this.http.post(AUTENTICATION_URL_API.LOGIN, loginData);
  }
}
