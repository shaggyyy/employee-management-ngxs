import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../app/core/service/authentication.service'
import { Store } from '@ngxs/store';
import { PatchEmpolyeeAfterRefresh } from './core/actions/core.actions';

@Injectable({
  providedIn: 'root'
})
export class HasUserGuard implements CanActivate {

  constructor(
    private store : Store,
    private authenticationService: AuthenticationService,
    private router: Router) {}

  canActivate() {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/dashboard'])
      return false
    } else {
      return true
    }
  }
  
}
