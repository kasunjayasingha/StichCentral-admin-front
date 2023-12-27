import {Component, OnInit} from '@angular/core';
import {AppointmentsDTO} from "../../../DTO/AppointmentsDTO";
import {AppoinmentService} from "../../../service/appoinment.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {OrderDetailsDTO} from "../../../DTO/OrderDetailsDTO";
import {ClientSampleDTO} from "../../../DTO/clientSampleDTO";
import {HttpErrorResponse} from "@angular/common/http";


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

  async addDesign(design: OrderDetailsDTO, type: string) {

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
          const allowedExtensions = ['jpg', 'jpeg', 'png'];
          const extension = file.name.split('.').pop()?.toLowerCase();
          console.log(extension);
          if (!(allowedExtensions.includes(extension))) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'File type is not allowed!',
              confirmButtonText: 'Ok',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.getAllOrders();
              }
            });
            return;
          }
          if (file.size > 20000000) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'File size should be less than 20MB!',
              confirmButtonText: 'Ok',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.getAllOrders();
              }
            });
            return;
          } else {
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
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('orderId', design.id + '');
                  this._appoinmentService.UPLOAD_DESIGN(formData).subscribe((res: any) => {
                    if (res.success == true) {
                      if (type == 'ADD') {
                        Swal.fire({
                          icon: 'success',
                          title: 'Your design has been uploaded successfully!',
                          confirmButtonText: 'OK',
                          allowOutsideClick: false,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            this.getAllOrders();
                          }
                        });
                      } else {
                        Swal.fire({
                          icon: 'success',
                          title: 'Your design has been updated successfully!',
                          confirmButtonText: 'OK',
                          allowOutsideClick: false,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            this.getAllOrders();
                          }
                        });
                      }

                    }
                  });

                },
              })
            };
            reader.readAsDataURL(file);
          }


        }
      }
    });


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

  getAllOrders() {
    this.processing();
    this._appoinmentService.GET_ALL_APPOINMENTSWITHORDER().subscribe((res: any) => {
      if (res != null) {
        this.orders = res.reverse();
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
