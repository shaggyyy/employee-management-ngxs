import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Action, State, StateContext } from '@ngxs/store'
import produce from "immer"
import { catchError, switchMap } from "rxjs/operators"

import {
    AuthenticateEmployeeSuccess,
    GetEmpolyees,
    GetEmployeeById,
    GetEmployeeByIdSuccess,
    GetEmpolyeesSuccess,
    PatchEmpolyeeAfterRefresh,
    registerEmpolyee,
    registerEmpolyeeSuccess,
} from '../actions/core.actions'
import { Employee } from '../model/employee.model'
import { EmployeeService } from '../../emplyee-profile/service/employee.service';
import { ProfileStateModel } from '../../emplyee-profile/state/profile.state';

export class CoreStateModel {
    currentEmployee: ProfileStateModel
    employees: Employee[]
    employeeById: Employee
}

@State<CoreStateModel>({
    name: 'core',
    defaults: new CoreStateModel(),
})

@Injectable()
export class CoreState {

    constructor(
        private employeeService: EmployeeService,
    ) { }

    @Action(GetEmpolyees)
    getEmployee({ dispatch }: StateContext<CoreStateModel>) {
        return this.employeeService.getEmployees().pipe(
            switchMap((result) => dispatch(new GetEmpolyeesSuccess(result['data']))),
            catchError((err: HttpErrorResponse | Error) => {
                throw err
            }),
        )
    }

    @Action(GetEmpolyeesSuccess)
    getEmployeeSuccess({ patchState }: StateContext<CoreStateModel>, employees: GetEmpolyeesSuccess) {
        patchState({
            employees: employees.employees
        })
    }

    @Action(AuthenticateEmployeeSuccess)
    authenticateSuccess({ setState, getState }: StateContext<CoreStateModel>, employee: Employee) {
        setState(produce(getState(), (draft) => {
            draft.currentEmployee = employee['employee']
        }))
    }

    @Action(registerEmpolyee)
    registerEmpolyee({ dispatch }: StateContext<CoreStateModel>, details: Employee) {
        return this.employeeService.registerEmployees(details['employee']).pipe(
            switchMap((result) => dispatch(new registerEmpolyeeSuccess(result['data']))),
            catchError((err: HttpErrorResponse | Error) => {
                throw err
            }),
        )
    }

    @Action(registerEmpolyeeSuccess)
    registerEmpolyeeSuccess({ patchState, getState }: StateContext<CoreStateModel>, employee: Employee) {
        patchState({
            employees: [...getState().employees, employee['employee']]
        })
    }

    @Action(PatchEmpolyeeAfterRefresh)
    PatchEmpolyeeAfterRefresh({ dispatch }: StateContext<CoreStateModel>, employeeId: number) {
        dispatch(new GetEmployeeById(employeeId))
    }

    @Action(GetEmployeeById)
    GetEmployeeById({ dispatch }: StateContext<CoreStateModel>, employeeId: number) {
        return this.employeeService.getEmployeesByID(employeeId['employee']).pipe(
            switchMap((result) => dispatch(new GetEmployeeByIdSuccess(result['data']))),
            catchError((err: HttpErrorResponse | Error) => {
                throw err
            }),
        )
    }

    @Action(GetEmployeeByIdSuccess)
    GetEmployeeByIdSuccess({ patchState }: StateContext<CoreStateModel>, employeeId: Employee) {
        patchState({
            employeeById: employeeId['employee']
        })
    }

}