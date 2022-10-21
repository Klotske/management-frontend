import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Input, Label, Select, Submit } from "../components/form";
import { IPosition, IDepartment, ISchedule } from "../models";

interface ScheduleInput {
    departmentId: number,
    positionId: number,
    startDate: string,
    quantity: number
}

const SchedulesPage = () => {
    const [schedules, setSchedules] = useState<ISchedule[]>([]);

    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [positions, setPositions] = useState<IPosition[]>([]);

    const { register, handleSubmit } = useForm<ScheduleInput>()

    const onSubmit = (data: ScheduleInput) => {
        fetch('api/schedules', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then((response) => {
                if (!response.ok) return;
                return response.json()
            })
            .then((schedule: ISchedule) => setSchedules([...schedules, schedule].sort((a, b) => (
                a.startDate.split('-').reverse().join().localeCompare(b.startDate.split('-').reverse().join())
            )
            )))
            .catch(err => console.log(err));
    }

    const onDelete = (id: number) => {
        fetch(`api/schedules/${id}`, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) return;
                setSchedules(schedules.filter((schedule) => {
                    return schedule.id != id;
                }));
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetch('api/schedules')
            .then((response) => {
                if (!response.ok) return;
                return response.json()
            })
            .then((data: ISchedule[]) => setSchedules(data.sort((a, b) => (
                a.startDate.split('-').reverse().join().localeCompare(b.startDate.split('-').reverse().join())
            )
            )))
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        fetch('api/departments')
            .then((response) => response.json())
            .then((data) => setDepartments(data))
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        fetch('api/positions')
            .then((response) => response.json())
            .then((data) => setPositions(data))
            .catch((err) => console.log(err))
    }, []);

    return (
        <div className="w-full h-full grid grid-cols-4 grid-rows-1 gap-4 p-4 bg-gray-200 rounded-xl">
            <div className="block p-4 col-span-3 row-end-auto bg-white rounded-xl overflow-y-auto">
                <table className="w-full text-sm text-left rounded bg-gray-100">
                    <thead className="text-sm bg-gray-50 rounded-xl">
                        <tr>
                            <th scope="col" className="py-3 px-4">Название отдела</th>
                            <th scope="col" className="py-3 px-4">Название должности</th>
                            <th scope="col" className="py-3 px-4">Дата начала действия</th>
                            <th scope="col" className="py-3 px-4">Кол-во</th>
                            <th scope="col" className="py-3 px-4">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule: ISchedule) => (
                            <tr key={schedule.id} className="text-base border-b">
                                <td className="py-4 px-4">{schedule.department!.name}</td>
                                <td className="py-4 px-4">{schedule.position!.title}</td>
                                <td className="py-4 px-4">{schedule.startDate}</td>
                                <td className="py-4 px-4">{schedule.quantity}</td>
                                <td className="py-4 px-4">
                                    <button onClick={() => onDelete(schedule.id)} className="font-medium text-red-600 hover:underline">
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex bg-white rounded-xl p-4 h-fit max-h-full overflow-y-auto">
                <Form onSubmit={onSubmit}>
                    {({ register }) => (
                        <>
                            <h4 className="font-semibold text-lg">Добавить расписание</h4>
                            <div>
                                <Label text="Отдел" />
                                <Select {...register('departmentId', { required: true })} options={
                                    departments.map(((dep) => ({ value: dep.id, label: dep.name })))} />
                            </div>
                            <div>
                                <Label text="Позиция" />
                                <Select {...register('positionId', { required: true })} options={
                                    positions.map(((pos) => ({ value: pos.id, label: pos.title })))} />
                            </div>
                            <div>
                                <Label text="Дата начала действия" />
                                <Input type="date" {...register("startDate", { required: true })} required />
                            </div>
                            <div>
                                <Label text="Кол-во сотрудников" />
                                <Input type="number" {...register("quantity", { required: true })} required />
                            </div>
                            <Submit text="Добавить" />
                        </>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default SchedulesPage

