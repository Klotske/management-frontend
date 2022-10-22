import { useEffect, useState } from "react";
import { Form, Input, Label, Submit } from "../components/form";
import { IDepartment } from "../data/models";

interface DepartmentInput {
    name: string
}

const DepartmentsPage = () => {
    const [departments, setDepartments] = useState<IDepartment[]>([]);

    const onSubmit = (data: DepartmentInput) => {
        fetch('api/departments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(res => res.json())
            .then(dep => setDepartments([...departments, dep]))
            .catch(err => console.log(err));
    }

    const onDelete = (id: number) => {
        fetch(`api/departments/${id}`, { method: 'DELETE' })
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
        <div className="w-full h-full grid grid-cols-4 grid-rows-1 gap-4 p-4 bg-gray-200 rounded-xl">
            <div className="block p-4 col-span-3 row-end-auto bg-white rounded-xl overflow-y-auto">
                <table className="w-full text-sm text-left rounded bg-gray-100">
                    <thead className="text-sm bg-gray-50 rounded-xl">
                        <tr>
                            <th scope="col" className="py-3 px-4">ID</th>
                            <th scope="col" className="py-3 px-4">Название отдела</th>
                            <th scope="col" className="py-3 px-4">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((department: IDepartment) => (
                            <tr key={department.id} className="text-base border-b">
                                <td className="py-4 px-4">{department.id}</td>
                                <td className="py-4 px-4">{department.name}</td>
                                <td className="py-4 px-4">
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
                <Form onSubmit={onSubmit}>
                    {({ register }) => (
                        <>
                            <h4 className="font-semibold text-lg">Добавить отдел</h4>
                            <div>
                                <Label text="Название отдела" />
                                <Input placeholder="Отдел кадров" {...register("name", { required: true })} required />
                            </div>
                            <Submit text="Добавить" />
                        </>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default DepartmentsPage

