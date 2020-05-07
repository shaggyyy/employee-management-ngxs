import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthenticateEmployeeSuccess } from 'src/app/core/actions/core.actions';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store,
    private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: [""],
      companyId: [""]
    })
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.authenticateEmployee(this.loginForm.value['email']).subscribe((result) => {
      this.store.dispatch(new AuthenticateEmployeeSuccess(result['data']));
      localStorage.setItem('currentEmployee', result['data']['id'])
      this.router.navigate(['dashboard'])
    })
  }

}
