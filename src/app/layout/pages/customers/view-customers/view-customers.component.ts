import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../../service/customer.service";
import {MessageService} from "primeng/api";
import Swal from "sweetalert2";
import {CustomerDTO} from "../../../../DTO/customerDTO";

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.scss']
})
export class ViewCustomersComponent implements OnInit {
  customers: CustomerDTO[] = [];
  protected readonly indexedDB = indexedDB;

  constructor(
    private _customerService: CustomerService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.processing();
    this._customerService.GET_ALL_CUSTOMERS().subscribe((res: any) => {

      if (res != null) {
        this.customers = res.reverse();
        console.log(JSON.stringify(this.customers));
        Swal.close();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }


    }, error => {
    });
  }

  viewCustomer(customer: CustomerDTO) {
    console.log("---------------- " + JSON.stringify(customer));
    sessionStorage.setItem("SINGLE_CUSTOMER_DETAILS", JSON.stringify(customer));
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
