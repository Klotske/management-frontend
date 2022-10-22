import { useEffect, useState } from "react";
import { Form, Input, Label, Submit } from "../components/form";
import { IPosition } from "../data/models";

interface PositionInput {
    title: string
}

const PositionsPage = () => {
    const [positions, setPositions] = useState<IPosition[]>([]);

    const onSubmit = (data: PositionInput) => {
        fetch('api/positions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(res => res.json())
            .then(pos => setPositions([...positions, pos]))
            .catch(err => console.log(err));
    }

    const onDelete = (id: number) => {
        fetch(`api/positions/${id}`, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) return;
                setPositions(positions.filter((position) => {
                    return position.id != id;
                }));
            })
            .catch(err => console.log(err));
    }

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
                            <th scope="col" className="py-3 px-4">ID</th>
                            <th scope="col" className="py-3 px-4">Название позиции</th>
                            <th scope="col" className="py-3 px-4">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((position: IPosition) => (
                            <tr key={position.id} className="text-base border-b">
                                <td className="py-4 px-4">{position.id}</td>
                                <td className="py-4 px-4">{position.title}</td>
                                <td className="py-4 px-4">
                                    <button onClick={() => onDelete(position.id)} className="font-medium text-red-600 hover:underline">
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex row-end-auto bg-white rounded-xl p-4 overflow-y-auto h-fit">
                <Form onSubmit={onSubmit}>
                    {({ register }) => (
                        <>
                            <h4 className="font-semibold text-lg">Добавить должность</h4>
                            <div>
                                <Label text="Название позиции" />
                                <Input placeholder="Программист" {...register("title", { required: true })} required />
                            </div>
                            <Submit text="Добавить" />
                        </>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default PositionsPage

