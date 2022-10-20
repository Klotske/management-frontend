interface IPosition {
    id: number,
    title: string
}

interface IDepartment {
    id: number,
    name: string
}

interface IRate {
    id: number,
    positionId: number,
    position?: IPosition,
    startDate: string,
    amount: number
}

interface ISchedule {
    id: number,
    departmentId: number,
    department?: IDepartment,
    positionId: number,
    position?: IPosition,
    startDate: string,
    quantity: number
}

export type { IPosition, IDepartment, IRate, ISchedule }