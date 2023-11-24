import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppLayoutModule} from "./layout/app.layout.module";
import {DashboardComponent} from './dashboard/dashboard.component';
import {ChartModule} from 'primeng/chart';
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {SliderModule} from "primeng/slider";
import {ProgressBarModule} from "primeng/progressbar";
import {FormsModule} from "@angular/forms";
import {BlockUIModule} from 'primeng/blockui';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {SplitterModule} from 'primeng/splitter';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {BadgeModule} from 'primeng/badge';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AppLayoutModule,
    ChartModule,
    MenuModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    ProgressBarModule,
    FormsModule,
    BlockUIModule,
    ToastModule,
    CalendarModule,
    SplitterModule,
    BadgeModule,
    SweetAlert2Module.forRoot(),
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
