import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {APPIONMENT_URL_API} from "../app.component";
import {AppointmentsDTO} from "../DTO/AppointmentsDTO";
import {OrderDetailsDTO} from "../DTO/OrderDetailsDTO";
import {DashBoardDTO} from "../DTO/DashBoardDTO";
import {map} from "rxjs";

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

  GET_ALL_ORDERDETAILS() {
    return this.http.get<any>(APPIONMENT_URL_API.GET_ALL_ORDERDETAILS, {headers: this.ConfigService.getHeaders()});
  }

  UPDATE_ORDER_DETAILS(order: OrderDetailsDTO) {
    return this.http.post<any>(APPIONMENT_URL_API.UPDATE_ORDER_DETAILS, order, {headers: this.ConfigService.getHeaders()});
  }

  GET_DASHBOARD_DETAILS(year: any) {
    return this.http.get<any>(APPIONMENT_URL_API.GET_DASHBOARD_DETAILS + '/' + year, {headers: this.ConfigService.getHeaders()}).pipe(map(result => (result as Array<DashBoardDTO>)));
  }

  GET_ALL_APPOINMENTSWITHORDER() {
    return this.http.get<any>(APPIONMENT_URL_API.GET_ALL_APPOINMENTSWITHORDER, {headers: this.ConfigService.getHeaders()});
  }

  DOWNLOAD_FILE(id: number) {
    return this.http.get(APPIONMENT_URL_API.DOWNLOAD_FILE + id, {responseType: 'blob'});
  }
}
