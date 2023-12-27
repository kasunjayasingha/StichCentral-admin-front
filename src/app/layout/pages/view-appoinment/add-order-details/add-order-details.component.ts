import {Component, OnInit} from '@angular/core';
import {AppointmentsDTO} from "../../../../DTO/AppointmentsDTO";
import {ClientSampleDTO} from "../../../../DTO/clientSampleDTO";
import {CustomerDTO} from "../../../../DTO/customerDTO";
import {ConfirmationService, MessageService, ConfirmEventType} from 'primeng/api';
import {AppoinmentService} from "../../../../service/appoinment.service";
import {FormBuilder, Validators} from "@angular/forms";
import {OrderDetailsDTO} from "../../../../DTO/OrderDetailsDTO";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {saveAs} from 'file-saver';
import * as FileSaver from "file-saver";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-add-order-details',
  templateUrl: './add-order-details.component.html',
  styleUrls: ['./add-order-details.component.scss']
})
export class AddOrderDetailsComponent implements OnInit {

  display: boolean = false;
  selectedOrderType: any = null;
  selectedSwingPlace: any = null;
  orderformSubmitted = false;
  selectedPayment: any = null;

  orderDetailsArray: OrderDetailsDTO[] = [];
  orderDetailsArrayStatusComplete: OrderDetailsDTO[] = [];
  formData: FormData = new FormData();

  orderDetails: OrderDetailsDTO = new OrderDetailsDTO(0, '', '', 0, '', '', 0, '', new Date(), 0, '', new Date(), new Date(), '',
    new ClientSampleDTO(0, '', '', '', '', 0, new Date(), new Date(),));

  appoinmentInfo: AppointmentsDTO = new AppointmentsDTO(0,
    0,
    new Date(),
    '',
    '',
    '',
    '',
    new ClientSampleDTO(0, '', '', '', '', 0, new Date(), new Date(),),
    new CustomerDTO(0, '', '', '', '', 0, '', '', '', '', 0, '', '', new Date(), new Date()),
    [new OrderDetailsDTO(0, '', '', 0, '', '', 0, '', new Date(), 0, '', new Date(), new Date(), '',
      new ClientSampleDTO(0, '', '', '', '', 0, new Date(), new Date(),))], this.formData
  );

  position: string = '';

  orderType = [
    {name: 'T-Shirt', code: 'TSHIRT'},
    {name: 'Badges', code: 'BADGES'},
  ];

  payment = [
    {name: 'Full', code: 'FULL'},
    {name: 'Half', code: 'HALF'},
  ];

  swingPlace = [
    {name: 'Inside', code: 'INSIDE'},
    {name: 'Outside', code: 'OUTSIDE'},
  ];
  orderform = this.formBuilder.group({
    orderType: [null, Validators.required],
    material: [null, Validators.required],
    swingPlace: [null, Validators.required],
    quantity: [null, Validators.required],
    payment: [null, Validators.required],
    advance: [null, Validators.required],
    dispatchDate: [null, Validators.required],
    description: [null, Validators.required],
  });
  showSubmitButton = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _appoinmentService: AppoinmentService,
    private formBuilder: FormBuilder,
    private route: Router,
  ) {
  }

  get f1() {
    return this.orderform.controls;
  }

  ngOnInit(): void {

    if (sessionStorage.getItem('SINGLE_APPOINMENT_DETAILS')) {
      this.appoinmentInfo = JSON.parse(sessionStorage.getItem('SINGLE_APPOINMENT_DETAILS')!);
      if (this.appoinmentInfo.status == 'COMPLETED') {
        this.showSubmitButton = true;
        this.orderDetailsArray = this.appoinmentInfo.orderDetails;
      }
    }
  }

  confirmCancel(position: string) {
    this.position = position;

    this.confirmationService.confirm({
      message: 'Do you want to cancel this appoinment?',
      header: 'Cancel Confirmation',
      icon: 'pi pi-info-circle',
      accept: async () => {
        const {value: text} = await Swal.fire({
          input: "textarea",
          inputLabel: "Reason for cancellation",
          inputPlaceholder: "Type your reason here...",
          inputAttributes: {
            "aria-label": "Type your reason here",
          },
          showCancelButton: true
        });
        if (text) {
          this.processing();
          this.appoinmentInfo.status = 'CANCELLED';
          this.appoinmentInfo.cancellationReason = text.toLowerCase();
          this._appoinmentService.CANCEL_APPOINMENT(this.appoinmentInfo).subscribe((res: any) => {
            if (res.success == true) {
              this.messageService.add({severity: 'success', summary: 'Confirmed', detail: 'Appoinment cancelled'});
              Swal.close();
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Appoinment cancelled successfully!',
                confirmButtonText: 'OK',
                allowOutsideClick: false,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  this.route.navigate(['/stichcentral/view-appointment']);
                }
              })
            } else {
              Swal.close();
              this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong'});
            }
          });
        }

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

  confirmAccept(position: string) {
    this.position = position;

    this.confirmationService.confirm({
      message: 'Do you want to accept this appoinment?',
      header: 'Accept Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.processing();
        this.appoinmentInfo.status = 'ACCEPTED';
        this._appoinmentService.CANCEL_APPOINMENT(this.appoinmentInfo).subscribe((res: any) => {
          if (res.success == true) {
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Appoinment accepted successfully!',
              confirmButtonText: 'OK',
              allowOutsideClick: false,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.route.navigate(['/stichcentral/view-appointment']);
              }
            })
            this.messageService.add({severity: 'success', summary: 'Confirmed', detail: 'Appoinment accepted'});
            // this.route.navigate(['view-appointment']);
            // this.display = false;
          } else {
            Swal.close();
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

  onOrderDetailsSubmit() {
    // this.display = false;
    this.orderformSubmitted = true;

    if (this.orderform.invalid) {
      return;
    } else {
      let orderDetails = new OrderDetailsDTO(0, '', '', 0, '', '', 0, '', new Date(), 0, '', new Date(), new Date(), '',
        new ClientSampleDTO(0, '', '', '', '', 0, new Date(), new Date()));
      orderDetails.orderType = this.selectedOrderType.name;
      orderDetails.material = this.orderDetails.material;
      orderDetails.swingPlace = this.selectedSwingPlace.name;
      orderDetails.quantity = this.orderDetails.quantity;
      orderDetails.payment = this.selectedPayment.code;
      orderDetails.advance = this.orderDetails.advance;
      orderDetails.description = this.orderDetails.description;
      orderDetails.dispatchDate = this.orderDetails.dispatchDate;
      orderDetails.appointment_id = this.appoinmentInfo.id;
      orderDetails.clientSample = new ClientSampleDTO(0, '', '', '', '', 0, new Date(), new Date(),);

      console.log("orderDetails " + JSON.stringify(orderDetails));

      if (this.orderDetailsArray.length == 0 || this.orderDetailsArray == undefined
        || this.orderDetailsArrayStatusComplete.length == 0 || this.orderDetailsArrayStatusComplete == undefined) {
        if (this.appoinmentInfo.status == 'COMPLETED') {
          this.orderDetailsArrayStatusComplete.push(orderDetails);
          this.orderDetailsArray.push(orderDetails);

        } else if (this.appoinmentInfo.status == 'ACCEPTED') {
          this.orderDetailsArray.push(orderDetails);
          this.onSubmit();
        } else {
          this.orderDetailsArray.push(orderDetails);
        }
        this.display = false;
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Order details added'});


      } else {
        if (this.appoinmentInfo.status == 'COMPLETED') {
          this.orderDetailsArrayStatusComplete.push(orderDetails);
          this.orderDetailsArray.push(orderDetails);

        } else {
          this.orderDetailsArray.push(orderDetails);
        }
        this.display = false;
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Order details added'});
      }
      console.log("orderDetailsArray " + JSON.stringify(this.orderDetailsArray));
      this.orderformSubmitted = false;
      this.orderform.reset();
      this.showSubmitButton = true;

    }

  }

  selectDropDown() {
    // this.appoinmentInfo.orderType = this.selectedStatus.code;
    // console.log("status " + this.appoinmentInfo.orderType);
  }

  selectPlaceDropDown() {
    // this.appoinmentInfo.swingPlace = this.selectedSwingPlace.code;
    // console.log("status " + this.appoinmentInfo.swingPlace);
  }

  fileDownload(clientSample: ClientSampleDTO) {
    this._appoinmentService.DOWNLOAD_FILE(clientSample.id).subscribe(
      res => {
        let doctype = res.type;
        var file = new Blob([res], {type: doctype});
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        //  download file
        const a = document.createElement('a')
        // let doctype = res.type;
        var file = new Blob([res], {type: doctype});
        var fileURL = URL.createObjectURL(file);
        a.href = fileURL
        a.download = clientSample.file_name + '';
        a.click();
      },
      (error: HttpErrorResponse) => {
        console.error('Error downloading the file', error);
        // Handle error appropriately, e.g., show a user-friendly error message.
      }
    );
  }


  onSubmit() {
    if (this.appoinmentInfo.status == 'COMPLETED') {
      this.appoinmentInfo.orderDetails = this.orderDetailsArrayStatusComplete;
    } else {
      this.appoinmentInfo.orderDetails = this.orderDetailsArray;
    }

    // this.appoinmentInfo.status = "COMPLETED";
    console.log("appoinmentInfo " + JSON.stringify(this.appoinmentInfo));
    this._appoinmentService.SAVE_APPOINMENT(this.appoinmentInfo).subscribe((res: any) => {
      if (res.success == true) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Order details added successfully!',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.route.navigate(['/stichcentral/view-appointment']);
          }
        });

        this.orderDetailsArray = [];
        this.showSubmitButton = false;

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });
  }


  processing() {
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
