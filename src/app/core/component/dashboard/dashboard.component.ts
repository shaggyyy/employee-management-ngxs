import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store'
import { GetEmpolyees, PatchEmpolyeeAfterRefresh } from '../../actions/core.actions'
import { Observable } from 'rxjs';
import { Employee } from '../../model/employee.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogConfig, MatDialogRef } from '@angular/material';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  employees$: Observable<Employee>
  employees: Employee[] = []
  filterForm: FormGroup
  currentEmployee$: Observable<Employee>
  currentEmployee: Employee
  isRegisterAvailable = false
  isRegisterFormShowing = false

  ELEMENT_DATA: Employee[] = []

  displayedColumns: string[]
  dataSource: any

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      filter: [""],
    })
  }

  ngOnInit() {
    this.currentEmployee$ = this.store.select((state) => state['core'])
    this.getEmployees()
    this.showEmployees()
    this.isRegisterFunctionalityAvailable()
  }

  getEmployees() {
    this.store.dispatch(new GetEmpolyees());
  }

  updateEmployeeTable(employees: Employee[]) {
    this.ELEMENT_DATA = employees
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  showEmployees() {
    this.employees$ = this.store.select((state) => state['core'])
    this.employees$.subscribe((res) => {
      this.employees = res['employees']
      this.currentEmployee = res['currentEmployee']
      if (this.currentEmployee['role'] !== 'HR') {
        this.displayedColumns = ['id', 'name', 'role']
      } else {
        this.displayedColumns = ['id', 'name', 'role', 'rating']
      }
      this.updateEmployeeTable(res['employees'])
    })
  }

  isRegisterFunctionalityAvailable() {
    if (this.currentEmployee['role'] === 'HR') {
      this.isRegisterAvailable = true
    } else {
      this.isRegisterAvailable = false
    }
  }

  filter() {
    this.employees$.subscribe((res) => {
      if (this.filterForm.value['filter'] !== 'ALL') {
        this.updateEmployeeTable(res['employees'].filter((employee) => employee['department'] === this.filterForm.value['filter']))
      } else {
        this.updateEmployeeTable(res['employees'])
      }
    })
  }

  register() {
    this.isRegisterFormShowing = true
  }


}
