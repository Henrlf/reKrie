import { useEffect, FormEventHandler } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import {PageProps} from "@/types";
import React, { useState, ChangeEvent } from 'react';

export default function RegisterProduct({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        value: '',
        stock_quantity: '',
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('products.create'));
    };

    const [value, setValue] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value.replace(/[^0-9.]/g, '');

        const parsedValue: number = parseFloat(value);

        if (!isNaN(parsedValue)) {
            const formattedValue: string = parsedValue.toLocaleString('en-US', {
                style: 'currency',
                currency: 'BRL',
            });

            setValue(formattedValue);
            setData('value', formattedValue)
        } else {
            setValue('');
            setData('value', '')
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registrar produto</h2>}>
            <Head title="Registrar produto" />
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Nome" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="description" value="Descrição" />

                            <TextInput
                                id="description"
                                type="text"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('description', e.target.value)}
                                required
                            />

                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="value" value="Valor" />

                            <TextInput
                                id="value"
                                type="text"
                                name="value"
                                value={data.value}
                                className="mt-1 block w-full"
                                onChange={handleChange}
                                placeholder="R$ 0.00"
                                required
                            />

                            <InputError message={errors.value} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="stock_quantity" value="Quantidade em estoque" />

                            <TextInput
                                id="stock_quantity"
                                type="number"
                                min="0"
                                name="stock_quantity"
                                value={data.stock_quantity}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('stock_quantity', e.target.value)}
                                required
                            />

                            <InputError message={errors.stock_quantity} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ml-4" disabled={processing}>
                                Registrar
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
