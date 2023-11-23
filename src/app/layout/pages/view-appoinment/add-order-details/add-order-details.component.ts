import {Component, OnInit} from '@angular/core';
import {AppointmentsDTO} from "../../../../DTO/AppointmentsDTO";
import {ClientSampleDTO} from "../../../../DTO/clientSampleDTO";
import {CustomerDTO} from "../../../../DTO/customerDTO";
import {ConfirmationService, MessageService, ConfirmEventType} from 'primeng/api';
import {AppoinmentService} from "../../../../service/appoinment.service";

@Component({
  selector: 'app-add-order-details',
  templateUrl: './add-order-details.component.html',
  styleUrls: ['./add-order-details.component.scss']
})
export class AddOrderDetailsComponent implements OnInit {

  display: boolean = false;
  selectedOrderType: any = null;
  selectedSwingPlace: any = null;


  appoinmentInfo: AppointmentsDTO = new AppointmentsDTO(0,
    0,
    new Date(),
    '',
    '',
    '',
    new ClientSampleDTO(0, '', '', '', '', 0, new Date(), new Date()),
    new CustomerDTO(0, '', '', '', '', 0, '', '', '', '', 0, '', '', new Date(), new Date()));
  position: string = '';

  orderType = [
    {name: 'T-Shirt', code: 'TSHIRT'},
    {name: 'Badges', code: 'BADGES'},
  ];

  swingPlace = [
    {name: 'Inside', code: 'INSIDE'},
    {name: 'Outside', code: 'OUTSIDE'},
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _appoinmentService: AppoinmentService,
  ) {
  }

  ngOnInit(): void {

    if (sessionStorage.getItem('SINGLE_APPOINMENT_DETAILS')) {
      this.appoinmentInfo = JSON.parse(sessionStorage.getItem('SINGLE_APPOINMENT_DETAILS')!);
    }
  }

  confirmPosition(position: string) {
    this.position = position;

    this.confirmationService.confirm({
      message: 'Do you want to cancel this appoinment?',
      header: 'Cancel Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.appoinmentInfo.status = 'CANCELLED';
        this._appoinmentService.CANCEL_APPOINMENT(this.appoinmentInfo).subscribe((res: any) => {
          if (res.success == true) {
            this.messageService.add({severity: 'success', summary: 'Confirmed', detail: 'Appoinment cancelled'});
            this.display = false;
          } else {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong'});
          }
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
            break;
        }
      },
      key: 'positionDialog'
    });
  }

  selectDropDown() {
    // this.appoinmentInfo.orderType = this.selectedStatus.code;
    // console.log("status " + this.appoinmentInfo.orderType);
  }

  selectPlaceDropDown() {
    // this.appoinmentInfo.swingPlace = this.selectedSwingPlace.code;
    // console.log("status " + this.appoinmentInfo.swingPlace);
  }


}
