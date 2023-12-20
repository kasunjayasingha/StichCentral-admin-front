import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../service/config.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserService} from "../service/user.service";
import {ValidationHandlerService} from "../service/validation-handler.service";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  valCheck: string[] = ['remember'];
  loginSubmitForm = false;

  password!: string;
  loginForm = this.formBuilder.group({
    username: [null, [Validators.required, Validators.pattern(this._validationService.userNameValidation())]],
    password: [null, [Validators.required, Validators.minLength(4)]],
  });
  username: any;
  passwordIncorrect = false;

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
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    // this.configService.setIsLogin(true);
  }

  submitLogin() {
    this.loginSubmitForm = true;
    if (this.loginForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);


    this._authService.adminLogin(formData).subscribe((result: any) => {
      if (result.success == true) {
        this.passwordIncorrect = false;

        this._userService.GET_USER_DETAILS(this.username).subscribe((res: any) => {
          if (res != null) {

            Swal.fire({
              icon: 'success',
              title: 'Login Success',
              // text: 'Welcome to Stich Central ' + res.firstName + ' ' + res.lastName,
              html: 'Welcome to Stich Central' + '<br>' + '<b>' + res.firstName + ' ' + res.lastName + '</b>',
              confirmButtonText: 'Ok',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                sessionStorage.setItem('user', JSON.stringify(res));
                if (!(res.role == 'DESIGNER')) {
                  this.route.navigate(['/stichcentral']);
                } else {
                  this.route.navigate(['/add-design']);
                }

              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Retrive user details failed',
              confirmButtonText: 'Ok',
              allowOutsideClick: false,
            });
          }
        });

      } else if (result.success == false && result.message == 'Your account is not active') {
        this.passwordIncorrect = false;
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Your account is temporarily DEACTIVATED',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        });

      } else if (result.success == false && result.message == 'Password is incorrect') {
        this.passwordIncorrect = true;
      } else if (result.success == false && result.message == 'Username or password is incorrect') {
        this.passwordIncorrect = false;
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Username and password are incorrect',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Login Failed',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
        });
      }
    });
  }

}
