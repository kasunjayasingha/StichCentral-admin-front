import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import {hide} from "@popperjs/core";
import {UserDTO} from "../DTO/UserDTO";

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];
  userDto: UserDTO = new UserDTO(0, '', '', '',
    '', '', '', '', '', new Date(), new Date());

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.userDto = JSON.parse(sessionStorage.getItem('user')!);

    if (this.userDto.role == 'OWNER') {
      this.model = [
        {
          label: 'Home',
          items: [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/stichcentral']}
          ]
        },
        {
          label: 'Panel  Components',
          items: [
            {label: 'View Appoinment', icon: 'pi pi-fw pi-id-card', routerLink: ['view-appointment'],},
            {label: 'View Customer', icon: 'pi pi-fw pi-check-square', routerLink: ['view-customers']},
            // {
            //   label: 'Marketing',
            //   icon: 'pi pi-fw pi-eye',
            //   items: [
            //     {
            //
            //       label: 'Customers',
            //       icon: 'pi pi-fw pi-users',
            //       routerLink: ['/customers'],
            //     },
            //     {
            //       label: 'Appoinments',
            //       icon: 'pi pi-fw pi-calendar',
            //       routerLink: ['/auth/error']
            //     },
            //     {
            //       label: 'Samples',
            //       icon: 'pi pi-fw pi-file',
            //       routerLink: ['/auth/access']
            //     }
            //   ],
            //
            // },

            {
              label: 'Production',
              icon: 'pi pi-fw pi-eye',
              items: [
                // {
                //   label: 'Work Distribution',
                //   icon: 'pi pi-fw pi-users',
                //   items: [
                //     {
                //       label: 'Samples',
                //       icon: 'pi pi-fw pi-file',
                //       routerLink: ['/auth/access']
                //     },
                //     {},
                //     {},
                //   ],
                // },
                {
                  label: 'Orders',
                  icon: 'pi pi-fw pi-calendar',
                  routerLink: ['view-orders']
                },

              ],

            },
            {
              label: 'Finance',
              icon: 'pi pi-fw pi-eye',
              items: [],

            },
            {
              label: 'Designs',
              icon: 'pi pi-fw pi-eye',
              items: [
                {

                  label: 'Add Design',
                  icon: 'pi pi-fw pi-users',
                  routerLink: ['add-design'],
                },

              ],
            },
            {
              label: 'Users',
              icon: 'pi pi-fw pi-calendar',
              routerLink: ['view-users']
            },
          ]
        }
      ];
    }

    if (this.userDto.role == 'ADMIN') {
      this.model = [
        {
          label: 'Home',
          items: [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/stichcentral']}
          ]
        },
        {
          label: 'Panel  Components',
          items: [
            {label: 'View Customer', icon: 'pi pi-fw pi-check-square', routerLink: ['view-customers']},
            // {
            //   label: 'Marketing',
            //   icon: 'pi pi-fw pi-eye',
            //   items: [
            //     {
            //
            //       label: 'Customers',
            //       icon: 'pi pi-fw pi-users',
            //       routerLink: ['/customers'],
            //     },
            //     {
            //       label: 'Appoinments',
            //       icon: 'pi pi-fw pi-calendar',
            //       routerLink: ['/auth/error']
            //     },
            //     {
            //       label: 'Samples',
            //       icon: 'pi pi-fw pi-file',
            //       routerLink: ['/auth/access']
            //     }
            //   ],
            //
            // },

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

              ],

            },
            {
              label: 'Users',
              icon: 'pi pi-fw pi-calendar',
              routerLink: ['view-users']
            },
          ]
        }
      ];
    }

    if (this.userDto.role == 'DESIGNER') {
      this.model = [

        {
          label: 'Designs',
          icon: 'pi pi-fw pi-eye',
          items: [
            {

              label: 'Add Design',
              icon: 'pi pi-fw pi-users',
              routerLink: ['/add-design'],
            },

          ],
        }


      ];
    }

  }
}
