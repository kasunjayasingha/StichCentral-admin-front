import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {AppoinmentService} from "../service/appoinment.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {DashBoardDTO} from "../DTO/DashBoardDTO";
import {co} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartData: any;
  chartOptions: any;
  items!: MenuItem[];
  customers1: Customer[] = [];
  loading: boolean = false;
  @ViewChild('filter') filter!: ElementRef;
  representatives: Representative[] = [];
  statuses: any[] = [];
  activityValues: number[] = [0, 100];
  years: any[] = [];
  selctedYear: any = null;
  dashboardDetails: any;
  year: any = null;

  monthlyOrderArray: Array<number> = [];
  monthlyRevenueArray: Array<number> = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _appoinmentService: AppoinmentService,
    private formBuilder: FormBuilder,
    private route: Router,
  ) {
  }

  ngOnInit(): void {
    this.dashboardDetails = new DashBoardDTO(0, 0, 0, 0, 0, 0, 0, 0, 0, []);

    const currentYear = new Date().getFullYear();
    for (let year = 2024; year <= currentYear; year++) {
      this.years.push({name: year, code: year});
    }
    this.selctedYear = currentYear;
    this.getDashboardDetails(this.selctedYear);
  }


  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'],
      datasets: [
        {
          label: 'Orders',
          data: this.monthlyOrderArray,
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--primary-200'),
          borderColor: documentStyle.getPropertyValue('--primary-200'),
          tension: .4
        },
        {
          label: 'Revenue',
          data: this.monthlyRevenueArray,
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--primary-500'),
          borderColor: documentStyle.getPropertyValue('--primary-500'),
          tension: .4
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  setYear() {
    this.selctedYear = this.year.name;
    this.getDashboardDetails(this.selctedYear);

  }


  getDashboardDetails(year: any) {
    this.dashboardDetails.dashBoardDTOList = new Array<DashBoardDTO>();
    this._appoinmentService.GET_DASHBOARD_DETAILS(year).subscribe((res) => {
      if (res != null) {
        console.log("res--- " + JSON.stringify(res));
        this.dashboardDetails = res[0];
        this.dashboardDetails.dashBoardDTOList = res[0].dashBoardDTOList;
        console.log("this.dashboardDetails--- " + JSON.stringify(this.dashboardDetails.dashBoardDTOList));

        if (this.dashboardDetails.dashBoardDTOList && this.dashboardDetails.dashBoardDTOList.length > 0) {
          console.log("Array");
          this.dashboardDetails.dashBoardDTOList.forEach(
            (item: DashBoardDTO) => {
              this.monthlyOrderArray[item.month - 1] = item.montlyOrders;
              this.monthlyRevenueArray[item.month - 1] = item.montlyRevenue;
            }
          );

          console.log("this.monthlyOrderArray--- " + JSON.stringify(this.monthlyOrderArray));
          console.log("this.monthlyRevenueArray--- " + JSON.stringify(this.monthlyRevenueArray));
        } else {
          console.log("dashBoardDTOList is empty or undefined.");
        }

        this.initChart();
        // this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }


}

export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string;
  status?: string;
  activity?: number;
  representative?: Representative;
}

export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}
