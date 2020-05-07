import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticateURL = 'http://pythonassign-env.eba-j7xhd99f.ap-south-1.elasticbeanstalk.com/api/login/'
  registerURL = 'http://pythonassign-env.eba-j7xhd99f.ap-south-1.elasticbeanstalk.com/api/employee'
  constructor(private http: HttpClient,) { }

  public authenticateEmployee(email) {
    return this.http.get<Employee>(this.authenticateURL + email);
  }

  public registerEmployee(employee: Employee) {
    return this.http.post<Employee>(this.registerURL, employee);
  }

  public isLoggedIn() {
    return !!(localStorage.getItem('currentEmployee'))
  }
}
