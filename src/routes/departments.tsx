import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IDepartment } from "../models";

interface DepartmentInput {
    name: string
}

const DepartmentsPage = () => {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const { register, handleSubmit } = useForm<DepartmentInput>()

    const onSubmit = handleSubmit((data) => {
        fetch('api/departments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(res => res.json())
            .then(dep => setDepartments([...departments, dep]))
            .catch(err => console.log(err));
    })

    const onDelete = (id: number) => 
    {
        fetch(`api/departments/${id}`, {method: 'DELETE'})
            .then((response) => {
                if (!response.ok) return;
                setDepartments(departments.filter((department) => {
                    return department.id != id;
                }));
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetch('api/departments')
            .then((response) => response.json())
            .then((data) => setDepartments(data))
            .catch((err) => console.log(err))
    }, []);

    return (
        <div className="w-full h-full grid grid-cols-3 grid-rows-1 gap-4 p-4 bg-gray-200 rounded-xl">
            <div className="block p-4 col-span-2 row-end-auto bg-white rounded-xl overflow-y-auto">
                <table className="w-full text-sm text-left rounded bg-gray-100">
                    <thead className="text-base capitalize bg-gray-50 rounded-xl">
                        <tr>
                            <th scope="col" className="py-3 px-6">ID</th>
                            <th scope="col" className="py-3 px-6">Название отдела</th>
                            <th scope="col" className="py-3 px-6">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((department: IDepartment) => (
                            <tr key={department.id} className="text-base">
                                <td className="py-4 px-6">{department.id}</td>
                                <td className="py-4 px-6">{department.name}</td>
                                <td className="py-4 px-6">
                                    <button onClick={() => onDelete(department.id)} className="font-medium text-red-600 hover:underline">
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex row-end-auto bg-white rounded-xl p-4 h-fit max-h-full overflow-y-auto">
                <form onSubmit={onSubmit} className="space-y-6 w-full h-full px-2">
                    <h4 className="font-semibold text-lg">Добавить отдел</h4>
                    <div>
                        <label className="block text-sm font-medium">Название отдела</label>
                        <input className="bg-gray-100 border rounded block w-full p-2" {...register("name", {required: true})} placeholder="Отдел кадров" required></input>
                    </div>
                    <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Добавить отдел</button>
                </form>
            </div>
        </div>
    )
}

export default DepartmentsPage

