import {Component, OnInit} from '@angular/core';
import {AppoinmentService} from "../../../service/appoinment.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AppointmentsDTO} from "../../../DTO/AppointmentsDTO";
import {ClientSampleDTO} from "../../../DTO/clientSampleDTO";
import {CustomerDTO} from "../../../DTO/customerDTO";
import {OrderDetailsDTO} from "../../../DTO/OrderDetailsDTO";

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent implements OnInit {

  appoinments: AppointmentsDTO[] = [];
  orederDetails: OrderDetailsDTO[] = [];
  selectedPayment: any = null;
  formData: FormData = new FormData();
  updateOderDetailsDto = new OrderDetailsDTO(0, '', '', 0, '', '', 0, '', new Date(), 0, '', new Date(), new Date(), '',
    new ClientSampleDTO(0, '', '', '', '', 0, new Date(), new Date(),));

  payment = [
    {name: 'Half', code: 'HALF'},
    {name: 'Full', code: 'FULL'},

  ];

  constructor(
    private _appoinmentService: AppoinmentService,
    private messageService: MessageService,
    private route: Router,
  ) {
  }

  ngOnInit(): void {
    this.getAllAppoinments();
  }

  getAllAppoinments() {
    this.processing();
    this._appoinmentService.GET_ALL_ORDERDETAILS().subscribe((res: any) => {

      if (res != null) {
        this.orederDetails = res.reverse();
        console.log(JSON.stringify(this.orederDetails));
        Swal.close();
      } else {

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There is no any orders!',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate(['/stichcentral']);
            // this.status = 'COMPLETED';
            // this.selectedStatus = this.dropdownItems[1];
            // this.getAllAppoinments();
          }
        });
      }


    }, error => {
    });
  }

  updateOrderDetails() {
    console.log("updateOrderDetails--- " + JSON.stringify(this.updateOderDetailsDto));
    if (this.updateOderDetailsDto.orderStatus == 'COMPLETED') {
      this.processing2();
    }
    this._appoinmentService.UPDATE_ORDER_DETAILS(this.updateOderDetailsDto).subscribe((res: any) => {
      if (res.success == true) {
        console.log("res--- " + JSON.stringify(res));
        if (res.message == 'mail send') {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Order completed successfully!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.getAllAppoinments();
            }
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Order details update successfully!',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.getAllAppoinments();
            }
          })
        }

      }
    });

  }

  viewOrder(order: OrderDetailsDTO, step: String, index: number) {
    if (step == 'start') {
      order.orderStatus = 'INPROGRESS';
      if (order.payment == 'HALF') {
        order.payment = 'HALF';
      }
      this.updateOderDetailsDto = order;
      this.updateOrderDetails();
    }
    if (step == 'complete') {
      order.orderStatus = 'COMPLETED';
      if (order.payment == 'HALF') {
        order.payment = 'HALF';
      }

      this.updateOderDetailsDto = order;
      this.updateOrderDetails();
    }

  }

  selectDropDown(appoinment: AppointmentsDTO, index: number) {
    if (this.selectedPayment.code == 'FULL') {
      appoinment.orderDetails[index].payment = 'FULL';

    }


  }


  processing() {
    let timerInterval = 0
    Swal.fire({
      title: 'Processing table <b></b> wait..',
      // html: 'Processing... <b></b> wait.',
      icon: 'info',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer()?.querySelector('b')
        timerInterval = setInterval(() => {
          // @ts-ignore
          // b.textContent = Swal.getTimerLeft()
        }, 200)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

  processing2() {
    let timerInterval = 0
    Swal.fire({
      title: 'Sending mail <b></b> wait..',
      // html: 'Processing... <b></b> wait.',
      icon: 'info',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer()?.querySelector('b')
        timerInterval = setInterval(() => {
          // @ts-ignore
          // b.textContent = Swal.getTimerLeft()
        }, 200)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

}
