import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Input, Label, Submit } from "../components/form";
import { IReport, IReportDepartment, IReportMonth } from "../models";

interface ReportInput {
    startDate: string,
    endDate: string,
}

const ReportPage = () => {
    const [report, setReport] = useState<IReport | null>(null);

    const onSubmit = (data: ReportInput) => {
        fetch(`api/report?startDate=${data.startDate}&endDate=${data.endDate}`)
            .then((response) => {
                if (!response.ok) return;
                return response.json()
            })
            .then((rep: IReport) => setReport(rep))
            .catch(err => console.log(err));
    }

    return (
        <div className="w-full h-full grid grid-cols-4 grid-rows-1 gap-4 p-4 bg-gray-200 rounded-xl">
            <div className="block p-4 col-span-3 row-end-auto bg-white rounded-xl overflow-y-auto">
                <table className="w-full text-sm text-left rounded bg-gray-100">
                    <thead className="text-sm bg-gray-50 rounded-xl">
                        <tr>
                            <th scope="col" className="py-3 px-4">Название отдела</th>
                            <th scope="col" className="py-3 px-4">Дата начала месяца</th>
                            <th scope="col" className="py-3 px-4">Дата конца месяца</th>
                            <th scope="col" className="py-3 px-4">ФОТ отдела</th>
                        </tr>
                    </thead>
                    {report?.months.map((repMonth: IReportMonth) => (
                        <tbody key={`m-${repMonth.start}`} className="border-b-2">
                            {repMonth.departments.map((repDepartment: IReportDepartment) => (
                                <tr key={`d-${repDepartment.department.id}`} className="w-full border-b">
                                    <td className="py-4 px-4">{repDepartment.department.name}</td>
                                    <td className="py-4 px-4">{repMonth.start}</td>
                                    <td className="py-4 px-4">{repMonth.end}</td>
                                    <td className="py-4 px-4">{repDepartment.monthTotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    ))}
                </table>
            </div>

            <div className="flex bg-white rounded-xl p-4 h-fit max-h-full overflow-y-auto">
                <Form onSubmit={onSubmit}>
                    {({ register }) => (
                        <>
                            <h4 className="font-semibold text-lg">Добавить расписание</h4>
                            <div>
                                <Label text="Дата начала периода" />
                                <Input type="date" {...register("startDate", { required: true })} required />
                            </div>
                            <div>
                                <Label text="Дата конца периода" />
                                <Input type="date" {...register("endDate", { required: true })} required />
                            </div>
                            <Submit text="Добавить" />
                        </>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default ReportPage

