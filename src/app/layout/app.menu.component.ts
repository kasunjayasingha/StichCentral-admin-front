import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
        ]
      },
      {
        label: 'Panel  Components',
        items: [
          {label: 'View Appoinment', icon: 'pi pi-fw pi-id-card', routerLink: ['/view-appointment']},
          {label: 'View Customer', icon: 'pi pi-fw pi-check-square', routerLink: ['/view-customers']},
          {
            label: 'Marketing',
            icon: 'pi pi-fw pi-eye',
            items: [
              {
                label: 'Customers',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/customers']
              },
              {
                label: 'Appoinments',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/auth/error']
              },
              {
                label: 'Samples',
                icon: 'pi pi-fw pi-file',
                routerLink: ['/auth/access']
              }
            ],

          },

          {
            label: 'Production',
            icon: 'pi pi-fw pi-eye',
            items: [
              {
                label: 'Work Distribution',
                icon: 'pi pi-fw pi-users',
                items: [
                  {
                    label: 'Samples',
                    icon: 'pi pi-fw pi-file',
                    routerLink: ['/auth/access']
                  },
                  {},
                  {},
                ],
              },
              {
                label: 'Appoinments',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/auth/error']
              },
              {
                label: 'Samples',
                icon: 'pi pi-fw pi-file',
                routerLink: ['/auth/access']
              }
            ],

          },
          {
            label: 'Finance',
            icon: 'pi pi-fw pi-eye',
            items: [

              {
                label: 'Orders',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/view-orders']
              },
              {
                label: 'Samples',
                icon: 'pi pi-fw pi-file',
                routerLink: ['/auth/access']
              }
            ],

          }
        ]
      }
    ];
  }
}
