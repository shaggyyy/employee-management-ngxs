import { ProfileDetails } from '../model/profile.model'
import { Employee } from 'src/app/core/model/employee.model'

export class UpdateEmpolyees {
    static readonly type = '[Profile] UpdateEmpolyees'

    constructor(public details: ProfileDetails) {

    }
}

export class UpdateEmpolyeesSuccess {
    static readonly type = '[Profile] UpdateEmpolyeesSuccess'

    constructor(public employee: any) {}
}
