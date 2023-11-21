import { Component } from '@angular/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'StichCentral-admin-front';

}
export const AUTENTICATION_URL_API = environment.AUTENTICATION_URL;
export const CUSTOMER_URL_API = environment.CUSTOMER_URL;
export const APPIONMENT_URL_API = environment.APPOINMENT_STEP_URL;
