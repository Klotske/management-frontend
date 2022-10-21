import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IReport, IReportDepartment, IReportMonth } from "../models";

interface ReportInput {
    startDate: string,
    endDate: string,
}

const ReportPage = () => {
    const [report, setReport] = useState<IReport | null>(null);

    const { register, handleSubmit } = useForm<ReportInput>()

    const onSubmit = handleSubmit((data) => {
        fetch(`api/report?startDate=${data.startDate}&endDate=${data.endDate}`)
            .then((response) => {
                if (!response.ok) return;
                return response.json()
            })
            .then((rep: IReport) => setReport(rep))
            .catch(err => console.log(err));
    })

    return (
        <div className="w-full h-full grid grid-cols-4 grid-rows-1 gap-4 p-4 bg-gray-200 rounded-xl">
            <div className="block p-4 col-span-3 row-end-auto bg-white rounded-xl overflow-y-auto">
                <table className="w-full text-sm text-left rounded bg-gray-100">
                    <thead className="text-base capitalize bg-gray-50 rounded-xl">
                        <tr>
                            <th scope="col" className="py-3 px-6">Название отдела</th>
                            <th scope="col" className="py-3 px-6">Дата начала месяца</th>
                            <th scope="col" className="py-3 px-6">Дата конца месяца</th>
                            <th scope="col" className="py-3 px-6">ФОТ отдела</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report?.months.map((repMonth: IReportMonth) => (
                            repMonth.departments.map((repDepartment: IReportDepartment) => (
                                <tr key={`m-${repMonth.start}-d-${repDepartment.department.id}`}>
                                    <td className="py-4 px-6">{repDepartment.department.name}</td>
                                    <td className="py-4 px-6">{repMonth.start}</td>
                                    <td className="py-4 px-6">{repMonth.end}</td>
                                    <td className="py-4 px-6">{repDepartment.monthTotal}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex bg-white rounded-xl p-4 h-fit max-h-full overflow-y-auto">
                <form onSubmit={onSubmit} className="space-y-6 w-full h-full p-2">
                    <h4 className="font-semibold text-lg">Отчет</h4>
                    <div>
                        <label className="block text-sm font-medium">Дата начала периода</label>
                        <input type='date' className="bg-gray-100 border rounded block w-full p-2" {...register("startDate", {required: true})} required></input>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Дата конца периода</label>
                        <input type='date' className="bg-gray-100 border rounded block w-full p-2" {...register("endDate", {required: true})} required></input>
                    </div>

                    <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Выбрать</button>
                </form>
            </div> 
        </div>
    )
}

export default ReportPage

