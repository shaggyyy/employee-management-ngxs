import { Employee } from "../model/employee.model"

export class GetEmpolyees {
    static readonly type = '[Core] GetEmpolyees'
}

export class GetEmpolyeesSuccess {
    static readonly type = '[Core] GetEmpolyeesSuccess'

    constructor(public employees: any) {}
}

export class AuthenticateEmployeeSuccess {
    static readonly type = '[Core] AuthenticateEmployeeSuccess'

    constructor(public employee: Employee) {}
}

export class registerEmpolyee {
    static readonly type = '[Core] registerEmpolyee'

    constructor(public employee: Employee) {}
}

export class registerEmpolyeeSuccess {
    static readonly type = '[Core] AddEmpolyeesSuccess'

    constructor(public employee: Employee) {}
}

export class PatchEmpolyeeAfterRefresh {
    static readonly type = '[Core] PatchEmpolyeeAfterRefresh'

    constructor(public employee: string) {}
}

export class GetEmployeeById {
    static readonly type = '[Core] GetEmployeeById'

    constructor(public employee: number) {}
}

export class GetEmployeeByIdSuccess {
    static readonly type = '[Core] GetEmployeeByIdSuccess'

    constructor(public employee: Employee) {}
}