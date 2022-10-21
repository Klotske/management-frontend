import { useEffect, useState } from "react";
import { Form, Input, Label, Select, Submit } from "../components/form";
import { IPosition, IRate } from "../data/models";

interface RateInput {
    positionId: number,
    startDate: string,
    amount: number
}

const RatesPage = () => {
    const [rates, setRates] = useState<IRate[]>([]);
    const [positions, setPositions] = useState<IPosition[]>([]);

    const onSubmit = (data: RateInput) => {
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
    }

    const onDelete = (id: number) => {
        fetch(`api/rates/${id}`, { method: 'DELETE' })
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
                    <thead className="text-sm bg-gray-50 rounded-xl">
                        <tr>
                            <th scope="col" className="py-3 px-4">Название должности</th>
                            <th scope="col" className="py-3 px-4">Дата начала действия</th>
                            <th scope="col" className="py-3 px-4">Ставка</th>
                            <th scope="col" className="py-3 px-4">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.map((rate: IRate) => (
                            <tr key={rate.id} className="text-base border-b">
                                <td className="py-4 px-4">{rate.position!.title}</td>
                                <td className="py-4 px-4">{rate.startDate}</td>
                                <td className="py-4 px-4">{rate.amount}</td>
                                <td className="py-4 px-4">
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
                <Form onSubmit={onSubmit}>
                    {({ register }) => (
                        <>
                            <h4 className="font-semibold text-lg">Добавить ставку</h4>
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
                                <Label text="Ставка в месяц" />
                                <Input type="number" {...register("amount", { required: true })} required />
                            </div>
                            <Submit text="Добавить" />
                        </>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default RatesPage

