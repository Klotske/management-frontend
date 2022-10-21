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

interface IReport {
    start: string,
    end: string,
    months: IReportMonth[]
}

interface IReportMonth {
    start: string,
    end: string,
    departments: IReportDepartment[]
}

interface IReportDepartment {
    department: IDepartment,
    monthTotal: number
}

export type { IPosition, IDepartment, IRate, ISchedule, IReport, IReportMonth, IReportDepartment }