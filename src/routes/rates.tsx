import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IPosition, IRate } from "../models";

interface RateInput {
    positionId: number,
    startDate: string,
    amount: number
}

const RatesPage = () => {
    const [rates, setRates] = useState<IRate[]>([]);
    const [positions, setPositions] = useState<IPosition[]>([]);

    const { register, handleSubmit } = useForm<RateInput>()

    const onSubmit = handleSubmit((data) => {
        fetch('api/rates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then((response) => {
                if (!response.ok) return;
                return response.json()
            })
            .then((rate: IRate) => setRates([...rates, rate].sort((a, b) => (
                a.startDate.split('-').reverse().join().localeCompare(b.startDate.split('-').reverse().join())
            )
            )))
            .catch(err => console.log(err));
    })

    const onDelete = (id: number) => 
    {
        fetch(`api/rates/${id}`, {method: 'DELETE'})
            .then((response) => {
                if (!response.ok) return;
                setRates(rates.filter((rate) => {
                    return rate.id != id;
                }));
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetch('api/rates')
            .then((response) => {
                if (!response.ok) return;
                return response.json()
            })
            .then((data: IRate[]) => setRates(data.sort((a, b) => (
                a.startDate.split('-').reverse().join().localeCompare(b.startDate.split('-').reverse().join())
            )
            )))
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
                    <thead className="text-base capitalize bg-gray-50 rounded-xl">
                        <tr>
                            <th scope="col" className="py-3 px-6">Название должности</th>
                            <th scope="col" className="py-3 px-6">Дата начала действия</th>
                            <th scope="col" className="py-3 px-6">Ставка</th>
                            <th scope="col" className="py-3 px-6">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.map((rate: IRate) => (
                            <tr key={rate.id} className="text-base">
                                <td className="py-4 px-6">{rate.position!.title}</td>
                                <td className="py-4 px-6">{rate.startDate}</td>
                                <td className="py-4 px-6">{rate.amount}</td>
                                <td className="py-4 px-6">
                                    <button onClick={() => onDelete(rate.id)} className="font-medium text-red-600 hover:underline">
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex bg-white rounded-xl p-4 h-fit max-h-full overflow-y-auto">
                <form onSubmit={onSubmit} className="space-y-6 w-full h-full p-2">
                    <h4 className="font-semibold text-lg">Добавить ставку</h4>
                    <div>
                        <label className="block text-sm font-medium">Позиция</label>
                        <select className="bg-gray-100 border rounded block w-full p-2" {...register("positionId", {required: true})} required>
                            <option></option>
                            {positions.map(pos => (
                                <option key={pos.id} value={pos.id}>{pos.title}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Дата начала действия</label>
                        <input type='date' className="bg-gray-100 border rounded block w-full p-2" {...register("startDate", {required: true})} required></input>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Ставка в месяц</label>
                        <input type='number' className="bg-gray-100 border rounded block w-full p-2" {...register("amount", {required: true})} placeholder="10000" required></input>
                    </div>
                    <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Добавить</button>
                </form>
            </div> 
        </div>
    )
}

export default RatesPage

