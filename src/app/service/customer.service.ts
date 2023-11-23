import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {CUSTOMER_URL_API} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient,
    private ConfigService: ConfigService
  ) { }

  // SAVE_CUSTOMER(client: CustomerDTO) {
  //   return this.http.post<any>(NEW_USER_REGISTRATSION_URL_API.REGISTER, client, {headers: this.ConfigService.getHeaders()});
  // }
  //
  // GET_CUSTOMER(email: string) {
  //   return this.http.get<any>(NEW_USER_REGISTRATSION_URL_API.GET_CUSTOMER + email, {headers: this.ConfigService.getHeaders()});
  // }

  GET_ALL_CUSTOMERS() {
    return this.http.get<any>(CUSTOMER_URL_API.GET_ALL_CUSTOMER, {headers: this.ConfigService.getHeaders()});
  }
}
