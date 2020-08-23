import {   Injectable } from '@angular/core';
import {Router, CanActivate, CanActivateChild} from '@angular/router';
import {AdminService} from './admin.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private router: Router, private adms: AdminService) {}
  canActivate() {
    if (this.adms.loggedIn() ) {
      return true;

    } else {
      this.router.navigate(['/login']);
      return false; }


  }
  canActivateChild() {
    if (this.adms.loggedIn) {
      return true;

    }
    this.router.navigate(['/login']);
    return false;
    }

}
