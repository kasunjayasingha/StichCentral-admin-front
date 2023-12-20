import {Component, OnInit} from '@angular/core';
import {UserDTO} from "../../../DTO/UserDTO";
import {ConfirmationService, MessageService, ConfirmEventType} from "primeng/api";
import {AppoinmentService} from "../../../service/appoinment.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {ValidationHandlerService} from "../../../service/validation-handler.service";
import {AuthService} from "../../../service/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: UserDTO[] = [];
  userCount = 0;
  unchecked = false;
  checked: boolean = true;
  position: string = '';
  addUser = false;
  userDto: UserDTO = new UserDTO(0, '', '', '',
    '', '', '', '', new Date(), new Date());
  selectedRole: any = null;
  userformSubmitted = false;

  userform = this.formBuilder.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    role: [null, Validators.required],
    userName: [null, [Validators.required, Validators.pattern(this._validationService.userNameValidation())]],
    email: [null, [Validators.required, Validators.pattern(this._validationService.emailValidation())]],
    password: [null, [Validators.required, Validators.minLength(4)]],
  });

  roleType = [
    {name: 'Admin', code: 'ADMIN'},
    {name: 'Designer', code: 'DESIGNER'},
  ];
  userNameAlreadyExsit = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _userService: UserService,
    private _validationService: ValidationHandlerService,
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private route: Router,
  ) {
  }

  get f1() {
    return this.userform.controls;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  onChangeStatus(user: any) {
    if (JSON.parse(sessionStorage.getItem('user')!).role == 'OWNER') {
      if (user.status === 'ACTIVE') {
        user.status = 'DEACTIVATE';
      } else {
        user.status = 'ACTIVE';
      }
      console.log(user.status);
      this._userService.UPDATE_USER(user).subscribe(result => {
        if (result.success == true) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Successfully Updated User',
          });
          this.getAllUsers();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User Update Failed!',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'You not allowed to change this user status',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.getAllUsers();
        }
      });
    }

  }

  async onaddUSerSubmit() {
    this.userformSubmitted = true;
    if (this.userform.invalid) {
      return;
    } else {
      let userNameExsit = await this._authService.checkUsernameExists(this.userDto.userName);
      if (userNameExsit == true) {
        // this.USERNAME_REJECTED();
        this.userNameAlreadyExsit = true;
        return;
      } else {
        this.userNameAlreadyExsit = false;
        this.submitUser();
      }

    }


  }

  submitUser() {
    this.userDto.role = this.selectedRole.code;
    this.userDto.status = 'ACTIVE';
    this._userService.NEW_USER_REGISTRATSION(this.userDto).subscribe(result => {
      if (result.success == true) {
        this.addUser = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successfully Created User',
        });
        this.userform.reset();
        this.userformSubmitted = false;

        this.userDto = new UserDTO(0, '', '', '', '', '',
          '', '', new Date(), new Date());
        this.getAllUsers();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User Creation Failed!',
        });
      }
    });
  }

  getAllUsers() {
    this.processing();
    this._userService.GET_ALL_USERS().subscribe(result => {
      if (result != null) {
        this.users = result.reverse();
        this.userCount = 0;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].status == 'ACTIVE') {
            this.userCount += 1;
          }

        }
        console.log(this.users);
        Swal.close();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There is no users!',
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
    });
  }

  USERNAME_REJECTED() {
    Swal.fire({
      icon: 'warning',
      title: 'This Username is already taken',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })

  }

  editUser(user: UserDTO) {

  }

  deleteUser(user: UserDTO, position: string) {
    this.position = position;
    if (JSON.parse(sessionStorage.getItem('user')!).role == 'OWNER') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + user.userName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this._userService.DELETE_USER(user).subscribe(result => {
            if (result.success == true) {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Successfully Deleted User',
              });
              this.getAllUsers();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User Deletion Failed!',
              });
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
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'You not allowed to delete this user',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
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

}
