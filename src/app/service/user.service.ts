import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {ADMIN_URL_API} from "../app.component";
import {UserDTO} from "../DTO/UserDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private ConfigService: ConfigService,
  ) {
  }

  NEW_USER_REGISTRATSION(userDto: UserDTO) {
    return this.http.post<any>(ADMIN_URL_API.NEW_USER_REGISTRATSION, userDto, {headers: this.ConfigService.getHeaders()});
  }

  GET_ALL_USERS() {
    return this.http.get<any>(ADMIN_URL_API.GET_ALL_USERS, {headers: this.ConfigService.getHeaders()});
  }

  UPDATE_USER(userDto: UserDTO) {
    return this.http.post<any>(ADMIN_URL_API.NEW_USER_REGISTRATSION, userDto, {headers: this.ConfigService.getHeaders()});
  }

  DELETE_USER(userDto: UserDTO) {
    return this.http.post<any>(ADMIN_URL_API.DELETE_USER, userDto, {headers: this.ConfigService.getHeaders()});
  }

  GET_USER_DETAILS(username: string) {
    return this.http.get<any>(ADMIN_URL_API.GET_USER_DETAILS + username, {headers: this.ConfigService.getHeaders()});
  }
}
