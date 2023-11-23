import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {AppoinmentService} from "../../../../service/appoinment.service";
import {MessageService} from "primeng/api";
import {AppointmentsDTO} from "../../../../DTO/AppointmentsDTO";

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent implements OnInit {
  appoinments: AppointmentsDTO[] = [];
  status = 'PENDING';
  selectedStatus: any = null;

  dropdownItems = [
    {name: 'PENDING', code: 'PENDING'},
    {name: 'COMPLETED', code: 'COMPLETED'},
    {name: 'CANCELLED', code: 'CANCELLED'}
  ];

  constructor(
    private _appoinmentService: AppoinmentService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.getAllAppoinments();
    // this.appoinments = [
    //   {
    //     id: '1000',
    //     code: 'f230fh0g3',
    //     name: 'Bamboo Watch',
    //     description: 'Product Description',
    //     image: 'bamboo-watch.jpg',
    //     price: 65,
    //     category: 'Accessories',
    //     quantity: 24,
    //     inventoryStatus: 'INSTOCK',
    //     rating: 5
    //   }
    // ];
  }

  getAllAppoinments() {
    this.processing();
    this._appoinmentService.GET_ALL_APPOINMENTS(this.status).subscribe((res: any) => {

      if (res != null) {
        this.appoinments = res.reverse();
        console.log(JSON.stringify(this.appoinments));
        Swal.close();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There is no pending appoinments!',
        })
      }


    }, error => {
    });
  }

  selectDropDown() {
    this.status = this.selectedStatus.code;
    console.log("status " + this.status);
    this.getAllAppoinments();
  }

  viewAppoinment(appoinment: AppointmentsDTO) {
    console.log("single appoinment---------------- " + JSON.stringify(appoinment));
    sessionStorage.setItem("SINGLE_APPOINMENT_DETAILS", JSON.stringify(appoinment));
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

}
