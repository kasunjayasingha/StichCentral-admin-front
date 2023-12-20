import {CanActivateFn} from '@angular/router';
import {Injectable} from "@angular/core";
import {LoginComponent} from "../login/login.component";


export const authguardGuard: CanActivateFn = (route, state) => {


  if (sessionStorage.getItem('user')) {
    return true;
  } else {
    return false;
  }

};
