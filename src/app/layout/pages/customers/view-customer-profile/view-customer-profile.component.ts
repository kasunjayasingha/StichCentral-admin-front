import {Component, OnInit} from '@angular/core';
import {CustomerDTO} from "../../../../DTO/customerDTO";

@Component({
  selector: 'app-view-customer-profile',
  templateUrl: './view-customer-profile.component.html',
  styleUrls: ['./view-customer-profile.component.scss']
})
export class ViewCustomerProfileComponent implements OnInit{

  customerInfo: CustomerDTO = new CustomerDTO(0, '', '', '', '', 0, '', '', '', '', 0, '', '', new Date(), new Date());

    constructor(
    ) {
    }

    ngOnInit(): void {
      if(sessionStorage.getItem('SINGLE_CUSTOMER_DETAILS')){
        this.customerInfo = JSON.parse(sessionStorage.getItem('SINGLE_CUSTOMER_DETAILS')!);
      }
    }

}
