import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../core/model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  getEmployeeURL = 'http://pythonassign-env.eba-j7xhd99f.ap-south-1.elasticbeanstalk.com/api/employee'
  getEmployeeByIdURL ='http://pythonassign-env.eba-j7xhd99f.ap-south-1.elasticbeanstalk.com/api/employee/'
  updateEmployeeURL = 'http://pythonassign-env.eba-j7xhd99f.ap-south-1.elasticbeanstalk.com/api/employee'
  registerEmployeeURL = 'http://pythonassign-env.eba-j7xhd99f.ap-south-1.elasticbeanstalk.com/api/employee'


  constructor(
    private http: HttpClient,
  ) { }

  public getEmployees(): any {
    return this.http.get<Employee>(this.getEmployeeURL);
  }

  public getEmployeesByID(id: number): any {
    return this.http.get<Employee>( this.getEmployeeByIdURL + id);
  }

  public updateEmployees(details): any {
    return this.http.put<Employee>(this.updateEmployeeURL, details);
  }

  public registerEmployees(details): any {
    return this.http.post<Employee>(this.registerEmployeeURL, details);
  }

}
