import {Component, OnInit} from '@angular/core';
import {AppointmentsDTO} from "../../../DTO/AppointmentsDTO";
import {AppoinmentService} from "../../../service/appoinment.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {OrderDetailsDTO} from "../../../DTO/OrderDetailsDTO";


@Component({
  selector: 'app-add-design',
  templateUrl: './add-design.component.html',
  styleUrls: ['./add-design.component.scss']
})
export class AddDesignComponent implements OnInit {
  orders: OrderDetailsDTO[] = [];

  constructor(
    private _appoinmentService: AppoinmentService,
    private messageService: MessageService,
    private route: Router,
  ) {
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  async addDesign(design: OrderDetailsDTO) {

    await Swal.fire({
      input: "textarea",
      inputLabel: "Design description",
      inputValue: design.description,
      inputAttributes: {
        'disabled': 'true',
      },
      confirmButtonText: "Upload",
      showCancelButton: true
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const {value: file} = await Swal.fire({
          title: "Select your design",
          input: "file",
          inputAttributes: {
            "accept": "image/*",
            "aria-label": "Upload your design"
          }
        });
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            Swal.fire({
              title: "Your uploaded design",
              imageUrl: e.target?.result as string,
              imageAlt: "The uploaded design",
              confirmButtonText: "Submit",
              showCancelButton: true,
              showLoaderOnConfirm: true,
              preConfirm: () => {
                return fetch("https://jsonplaceholder.typicode.com/posts/1")
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(response.statusText);
                    }
                    return response.json();
                  })
                  .catch(error => {
                    Swal.showValidationMessage(
                      `Request failed: ${error}`
                    );
                  });
              },
            })
          };
          reader.readAsDataURL(file);
        }
      }
    });


  }

  getAllOrders() {
    this.processing();
    this._appoinmentService.GET_ALL_APPOINMENTSWITHORDER().subscribe((res: any) => {
      if (res != null) {
        this.orders = res;
        console.log(JSON.stringify(this.orders));
        Swal.close();
      }
    });


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
