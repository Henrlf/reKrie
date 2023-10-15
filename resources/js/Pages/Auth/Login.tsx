import { useEffect, FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';


export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Entrar" />
            <div className="w-full sm:max-w-md mt-2 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <div className="flex items-center justify-center">
                <span className="ml-2 text-xl text-black">Entrar na ReKrie</span>

            </div>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
           
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="E-mail" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Senha" />
                    <div className="relative">
                        <TextInput
                            id="password"
                            type={isPasswordVisible ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleTogglePasswordVisibility}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2"
                        >
                            {isPasswordVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 20" fill="none">
                                <g id="style=linear">
                                    <g id="eye-open">
                                        <path id="vector" d="M15 12C15 13.6592 13.6592 15 12 15C10.3408 15 9 13.6592 9 12C9 10.3408 10.3408 9 12 9C13.6592 9 15 10.3408 15 12Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="vector_2" d="M12 19.27C15.53 19.27 18.82 17.4413 21.11 14.2764C22.01 13.0368 22.01 10.9532 21.11 9.71356C18.82 6.54861 15.53 4.71997 12 4.71997C8.46997 4.71997 5.17997 6.54861 2.88997 9.71356C1.98997 10.9532 1.98997 13.0368 2.88997 14.2764C5.17997 17.4413 8.46997 19.27 12 19.27Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </g>
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 20" fill="none">
                                <g id="style=linear">
                                    <g id="eye-close">
                                        <path id="vector" d="M15.6487 5.39489C14.4859 4.95254 13.2582 4.72021 12 4.72021C8.46997 4.72021 5.17997 6.54885 2.88997 9.71381C1.98997 10.9534 1.98997 13.037 2.88997 14.2766C3.34474 14.9051 3.83895 15.481 4.36664 16.0002M19.3248 7.69653C19.9692 8.28964 20.5676 8.96425 21.11 9.71381C22.01 10.9534 22.01 13.037 21.11 14.2766C18.82 17.4416 15.53 19.2702 12 19.2702C10.6143 19.2702 9.26561 18.9884 7.99988 18.4547" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="vector_2" d="M15 12C15 13.6592 13.6592 15 12 15M14.0996 9.85541C13.5589 9.32599 12.8181 9 12 9C10.3408 9 9 10.3408 9 12C9 12.7293 9.25906 13.3971 9.69035 13.9166" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="vector_3" d="M2 21.0002L22 2.7002" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" />
                                    </g>
                                </g>
                            </svg>}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600">Manter-me conectado</span>
                    </label>
                </div>

                <div className="flex flex-col items-center justify-center mt-4">
                    <PrimaryButton className="w-full h-11 mb-2 flex items-center justify-center" disabled={processing}>
                        Login
                    </PrimaryButton>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="mt-4 underline text-sm text-gray-600 hover:text-gray-900 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Esqueceu sua senha?
                        </Link>
                    )}
                    <div className="relative w-full mt-4">
                        <div className="absolute left-0 top-1/2 w-1/2 bg-gray-300 h-px transform -translate-y-1/2"></div>
                        <div className="absolute right-0 top-1/2 w-1/2 bg-gray-300 h-px transform -translate-y-1/2"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500">ou</div>
                    </div>

                    <div className="mt-4 underline text-sm text-gray-600 hover:text-gray-900 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Link
                            href={route('register')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Criar nova conta?
                        </Link>
                    </div>
                </div>
            </form>
        </div>
        </GuestLayout>
    );
}
