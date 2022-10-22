import React from "react";
import { FieldValues, SubmitHandler, useForm, UseFormReturn, UseFormRegisterReturn } from "react-hook-form";

// Input component
type InputProps = Partial<UseFormRegisterReturn> & { type?: string, placeholder?: string }

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <input className="bg-gray-100 border rounded block w-full p-2"
        ref={ref} {...props} />
})

// Select conponent
type Option = {
    label: React.ReactNode;
    value: string | number | string[];
};

type SelectProps = UseFormRegisterReturn & { options: Option[] };

const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    return <select className="bg-gray-100 border rounded block w-full p-2"
        {...props}>
        {props.options.map(({ label, value }) => (
            <option key={value.toString()} value={value}>{label}</option>
        ))}
    </select>
})

// Form component
type FormProps<TFormValues extends FieldValues> = {
    onSubmit: SubmitHandler<TFormValues>;
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
};

const Form = <TFormValues extends Record<string, any> = Record<string, any>>({
    onSubmit,
    children,
}: FormProps<TFormValues>) => {
    const methods = useForm<TFormValues>();
    return (
        <form className="flex flex-grow flex-col justify-between w-full h-full p-2 space-y-6"
            onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
    );
};

// Submit
type SubmitProps = {
    text: string
}

const Submit = ({ text }: SubmitProps) => {
    return (
        <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            {text}
        </button>)
}

// Label
type LabelProps = {
    text: string
}

const Label = ({ text }: LabelProps) => {
    return (
        <label className="block text-sm font-medium">
            {text}
        </label>)
};

export { Form, Input, Select, Submit, Label }
