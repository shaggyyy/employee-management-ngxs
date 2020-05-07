import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../../core/model/employee.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { ProfileDetails } from '../model/profile.model';
import { UpdateEmpolyees } from '../action/profile.action';
import { GetEmployeeById } from 'src/app/core/actions/core.actions';

@Component({
  selector: 'app-emplyee-profile',
  templateUrl: './emplyee-profile.component.html',
  styleUrls: ['./emplyee-profile.component.scss']
})
export class EmplyeeProfileComponent implements OnInit {

  employeeById: Employee = {
    role: '',
    department: '',
    manager_id: 0,
    email: '',
    id: 0,
    name: '',
  }
  employeeById$: Observable<Employee>
  employees$: Observable<Employee>
  currentEmployee$: Observable<Employee>
  currentEmployee: Employee
  profileUpdateForm: FormGroup
  ratingUpdateForm: FormGroup
  isUpdateOption: boolean
  isRatingOption: boolean
  isUpdateBtnDisabled: boolean

  constructor(
    private store: Store,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.currentEmployee$ = this.store.select((state) => state['core'])
    this.employeeById$ = this.store.select((state) => state['core'])
    this.createUpdateForms()
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  createUpdateForms() {
    this.profileUpdateForm = this.formBuilder.group({
      hobbies: [""],
      interests: [""],
    })
    this.ratingUpdateForm = this.formBuilder.group({
      rating: [""]
    })
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetEmployeeById(id))
    this.employeeById$.subscribe((employeeById) => {
      this.employeeById = employeeById['employeeById']
      this.employeeAccessControl(id)
    })
  }

  updateProfile(type: string) {
    let formPrevValue = {}
    if (type === 'profile') {
      formPrevValue = {
        hobbies: "",
        interests: "",
      }
      if (!_.isEqual(this.profileUpdateForm.value, formPrevValue)) {
        this.store.dispatch(new UpdateEmpolyees(this.getUpdateDetails(this.profileUpdateForm.value, 'profile')));
      }
    } else {
      formPrevValue = {
        rating: ""
      }
      if (!_.isEqual(this.ratingUpdateForm.value, formPrevValue)) {
        this.store.dispatch(new UpdateEmpolyees(this.getUpdateDetails(this.ratingUpdateForm.value, 'rating')));
      }
    }
  }

  getUpdateDetails(updateDetails, type): ProfileDetails {
    if (type === 'profile') {
      return {
        id: +this.route.snapshot.paramMap.get('id'),
        hobbies: updateDetails['hobbies'],
        interests: updateDetails['interests'],
      }
    } else {
      return {
        id: +this.route.snapshot.paramMap.get('id'),
        rating: updateDetails['rating'],
      }
    }
  }

  employeeAccessControl(id) {
    this.currentEmployee$.subscribe((employee) => {
      this.currentEmployee = employee['currentEmployee']
      if (employee['currentEmployee']['id'] === id) {
        this.isUpdateOption = true
      } else if (employee['currentEmployee']['role'] === "Manager" && this.employeeById['manager_id'] === employee['currentEmployee']['id']) {
        this.isRatingOption = true
      } else {
        this.isUpdateOption = false
        this.isRatingOption = false
      }
    })
  }

}
