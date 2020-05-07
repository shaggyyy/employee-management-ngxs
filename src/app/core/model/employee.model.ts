export interface Employee {
    role: string,
    department: string,
    interests?: string,
    rating?: number,
    manager_id: number,
    email: string,
    creation_date?: Date,
    id: number,
    name: string,
    hobbies?: string
}