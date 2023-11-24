import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Table} from "primeng/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  chartData: any;
  chartOptions: any;
  items!: MenuItem[];
  customers1: Customer[] = [];
  loading: boolean = false;
  @ViewChild('filter') filter!: ElementRef;
  representatives: Representative[] = [];
  statuses: any[] = [];
  activityValues: number[] = [0, 100];


  constructor() {
  }

  ngOnInit(): void {
    this.initChart();
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];

    this.customers1 = [
      {
        "id": 1000,
        "name": "James Butt",
        "country": {
          "name": "Algeria",
          "code": "dz"
        },
        "company": "Benton, John B Jr",
        "date": "2015-09-13",
        "status": "unqualified",
        "activity": 17,
        "representative": {
          "name": "Ioni Bowcher",
          "image": "ionibowcher.png"
        }
      },
      {
        "id": 1001,
        "name": "Josephine Darakjy",
        "country": {
          "name": "Egypt",
          "code": "eg"
        },
        "company": "Chanay, Jeffrey A Esq",
        "date": "2019-02-09",
        "status": "proposal",
        "activity": 0,
        "representative": {
          "name": "Amy Elsner",
          "image": "amyelsner.png"
        },
      },
      {
        "id": 1002,
        "name": "Art Venere",
        "country": {
          "name": "Panama",
          "code": "pa"
        },
        "company": "Chemel, James L Cpa",
        "date": "2017-05-13",
        "status": "qualified",
        "activity": 63,
        "representative": {
          "name": "Asiya Javayant",
          "image": "asiyajavayant.png"
        },
      },

    ]
  }




  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
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
