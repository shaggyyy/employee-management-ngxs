import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store'
import { catchError, switchMap } from "rxjs/operators"

import { UpdateEmpolyees, UpdateEmpolyeesSuccess } from '../action/profile.action';
import { ProfileDetails } from '../model/profile.model';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../../core/model/employee.model';
import { GetEmployeeByIdSuccess } from '../../core/actions/core.actions';


export class ProfileStateModel {
    currentEmployee: Employee
}

@State<ProfileStateModel>({
    name: 'profile',
    defaults: new ProfileStateModel(),
})

@Injectable()
export class ProfileState {

    constructor(private employeeService: EmployeeService) { }

    @Action(UpdateEmpolyees)
    UpdateEmpolyees({ dispatch }: StateContext<ProfileStateModel>, details: ProfileDetails) {
        return this.employeeService.updateEmployees(details['details']).pipe(
            switchMap((result) => dispatch(new UpdateEmpolyeesSuccess(result['data']))),
            catchError((err: HttpErrorResponse | Error) => {
              throw err
            }),
          )
    }

    @Action(UpdateEmpolyeesSuccess)
    UpdateEmpolyeesSuccess({ dispatch, patchState }: StateContext<ProfileStateModel>, employee: Employee) {
        console.log(employee)
        dispatch(new GetEmployeeByIdSuccess(employee['employee']))
    }
    
}