import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IPosition } from "../models";

interface PositionInput {
    title: string
}

const PositionsPage = () => {
    const [positions, setPositions] = useState<IPosition[]>([]);
    const { register, handleSubmit } = useForm<PositionInput>()

    const onSubmit = handleSubmit((data) => {
        fetch('api/positions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(res => res.json())
            .then(pos => setPositions([...positions, pos]))
            .catch(err => console.log(err));
    })

    const onDelete = (id: number) => 
    {
        fetch(`api/positions/${id}`, {method: 'DELETE'})
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
        <div className="w-3/4 h-4/5 grid grid-cols-3 grid-rows-1 gap-4 p-4 bg-gray-200 rounded-xl">
            <div className="block p-4 col-span-2 row-end-auto bg-white rounded-xl overflow-y-scroll">
                <table className="w-full text-sm text-left rounded bg-gray-100">
                    <thead className="text-base capitalize bg-gray-50 rounded-xl">
                        <tr>
                            <th scope="col" className="py-3 px-6">ID</th>
                            <th scope="col" className="py-3 px-6">Название позиции</th>
                            <th scope="col" className="py-3 px-6">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((position: IPosition) => (
                            <tr key={position.id} className="text-base">
                                <td className="py-4 px-6">{position.id}</td>
                                <td className="py-4 px-6">{position.title}</td>
                                <td className="py-4 px-6">
                                    <button onClick={() => onDelete(position.id)} className="font-medium text-red-600 hover:underline">
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex row-end-auto bg-white rounded-xl p-4">
                <form onSubmit={onSubmit} className="space-y-6 w-full px-2">
                    <h4 className="font-semibold text-lg">Добавить позицию</h4>
                    <div>
                        <label className="block text-sm font-medium">Название позиции</label>
                        <input className="bg-gray-100 border rounded block w-full p-2" {...register("title", {required: true})} placeholder="Программист" required></input>
                    </div>
                    <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Добавить позицию</button>
                </form>
            </div>
        </div>
    )
}

export default PositionsPage

