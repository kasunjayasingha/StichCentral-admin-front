import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {APPIONMENT_URL_API} from "../app.component";
import {AppointmentsDTO} from "../DTO/AppointmentsDTO";

@Injectable({
  providedIn: 'root'
})
export class AppoinmentService {

  constructor(
    private http: HttpClient,
    private ConfigService: ConfigService,
  ) {
  }

  GET_ALL_APPOINMENTS(status: string) {
    return this.http.get<any>(APPIONMENT_URL_API.GET_ALL_APPOINMENT + status, {headers: this.ConfigService.getHeaders()});
  }

  CANCEL_APPOINMENT(appoinment: AppointmentsDTO) {
    return this.http.post<any>(APPIONMENT_URL_API.CANCEL_APPOINMENT, appoinment, {headers: this.ConfigService.getHeaders()});
  }

  SAVE_APPOINMENT(appoinment: AppointmentsDTO) {
    return this.http.post<any>(APPIONMENT_URL_API.SAVE_APPOINMENT, appoinment, {headers: this.ConfigService.getHeaders()});
  }
}
