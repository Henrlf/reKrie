import {useEffect, FormEventHandler} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';
import {useState} from 'react';

export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        cpf: '',
        telefone: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const formatCPF = (inputCPF: string) => {
        const numericCPF = inputCPF.replace(/\D/g, '');
        const formatted = numericCPF.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        );
        setData('cpf', numericCPF);
        setFormattedCPF(formatted);
    };

    const formatTelefone = (inputTelefone: string) => {
        const numericTelefone = inputTelefone.replace(/\D/g, '');
        const formatted = `(${numericTelefone.slice(0, 2)}) ${numericTelefone.slice(2, 7)}-${numericTelefone.slice(7)}`;
        setData('telefone', numericTelefone);
        setFormattedTelefone(formatted);
    };

    const [formattedCPF, setFormattedCPF] = useState('');
    const [formattedTelefone, setFormattedTelefone] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const marginLabel = 'ml-2';

    return (
        <GuestLayout user={undefined}>
            <Head title="Registrar-se"/>
            <div className="w-full sm:max-w-md mt-2 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="flex items-center justify-center">
                    <span className="ml-2 text-xl text-black">Crie uma nova conta na ReKrie</span>
                </div>
                <div className="flex items-center justify-center">
                    <span className="ml-2 text-sm text-gray-600">É rápido e fácil.</span>
                </div>
                <form onSubmit={submit} className="mx-auto">
                    <div>
                        <InputLabel htmlFor="name" value="Nome*" className={marginLabel}/>

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2"/>
                    </div>
                    <div className="mt-2">
                        <InputLabel htmlFor="email" value="Email*" className={marginLabel}/>

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2"/>
                    </div>
                    <div className="mt-2" style={{display: 'flex'}}>
                        <div style={{flex: 1, marginRight: '10px'}}>
                            <InputLabel htmlFor="cpf" value="CPF*" className={marginLabel}/>

                            <TextInput
                                id="cpf"
                                type="text"
                                name="cpf"
                                maxLength={14}
                                value={formattedCPF}
                                className="mt-1 block w-full"
                                autoComplete="cpf"
                                onChange={(e) => formatCPF(e.target.value)}
                                required
                            />

                            <InputError message={errors.cpf} className="mt-2"/>
                        </div>

                        <div style={{flex: 1}}>
                            <InputLabel htmlFor="telefone" value="Telefone" className={marginLabel}/>

                            <TextInput
                                id="telefone"
                                type="text"
                                name="telefone"
                                maxLength={15}
                                value={formattedTelefone}
                                className="mt-1 block w-full"
                                autoComplete="telefone"
                                onChange={(e) => formatTelefone(e.target.value)}
                            />

                            <InputError message={errors.telefone} className="mt-2"/>
                        </div>
                    </div>
                    <div className="mt-2" style={{display: 'flex'}}>
                        <div style={{flex: 1, marginRight: '10px'}}>
                            <InputLabel htmlFor="password" value="Senha*" className={marginLabel}/>
                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <button type="button" onClick={handleTogglePasswordVisibility} className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2">
                                    {isPasswordVisible ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 20" fill="none">
                                            <g id="style=linear">
                                                <g id="eye-open">
                                                    <path id="vector" d="M15 12C15 13.6592 13.6592 15 12 15C10.3408 15 9 13.6592 9 12C9 10.3408 10.3408 9 12 9C13.6592 9 15 10.3408 15 12Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path id="vector_2" d="M12 19.27C15.53 19.27 18.82 17.4413 21.11 14.2764C22.01 13.0368 22.01 10.9532 21.11 9.71356C18.82 6.54861 15.53 4.71997 12 4.71997C8.46997 4.71997 5.17997 6.54861 2.88997 9.71356C1.98997 10.9532 1.98997 13.0368 2.88997 14.2764C5.17997 17.4413 8.46997 19.27 12 19.27Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"
                                                          strokeLinejoin="round"/>
                                                </g>
                                            </g>
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 20" fill="none">
                                            <g id="style=linear">
                                                <g id="eye-close">
                                                    <path id="vector"
                                                          d="M15.6487 5.39489C14.4859 4.95254 13.2582 4.72021 12 4.72021C8.46997 4.72021 5.17997 6.54885 2.88997 9.71381C1.98997 10.9534 1.98997 13.037 2.88997 14.2766C3.34474 14.9051 3.83895 15.481 4.36664 16.0002M19.3248 7.69653C19.9692 8.28964 20.5676 8.96425 21.11 9.71381C22.01 10.9534 22.01 13.037 21.11 14.2766C18.82 17.4416 15.53 19.2702 12 19.2702C10.6143 19.2702 9.26561 18.9884 7.99988 18.4547"
                                                          stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path id="vector_2" d="M15 12C15 13.6592 13.6592 15 12 15M14.0996 9.85541C13.5589 9.32599 12.8181 9 12 9C10.3408 9 9 10.3408 9 12C9 12.7293 9.25906 13.3971 9.69035 13.9166" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path id="vector_3" d="M2 21.0002L22 2.7002" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                                </g>
                                            </g>
                                        </svg>}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-2"/>
                        </div>

                        <div style={{flex: 1}}>
                            <InputLabel htmlFor="password_confirmation" value="Confirmar senha*" className={marginLabel}/>
                            <div className="relative">
                                <TextInput
                                    id="password_confirmation"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleTogglePasswordVisibility}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2"
                                >
                                    {isPasswordVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 20" fill="none">
                                        <g id="style=linear">
                                            <g id="eye-open">
                                                <path id="vector" d="M15 12C15 13.6592 13.6592 15 12 15C10.3408 15 9 13.6592 9 12C9 10.3408 10.3408 9 12 9C13.6592 9 15 10.3408 15 12Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path id="vector_2" d="M12 19.27C15.53 19.27 18.82 17.4413 21.11 14.2764C22.01 13.0368 22.01 10.9532 21.11 9.71356C18.82 6.54861 15.53 4.71997 12 4.71997C8.46997 4.71997 5.17997 6.54861 2.88997 9.71356C1.98997 10.9532 1.98997 13.0368 2.88997 14.2764C5.17997 17.4413 8.46997 19.27 12 19.27Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"
                                                      strokeLinejoin="round"/>
                                            </g>
                                        </g>
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 20" fill="none">
                                        <g id="style=linear">
                                            <g id="eye-close">
                                                <path id="vector"
                                                      d="M15.6487 5.39489C14.4859 4.95254 13.2582 4.72021 12 4.72021C8.46997 4.72021 5.17997 6.54885 2.88997 9.71381C1.98997 10.9534 1.98997 13.037 2.88997 14.2766C3.34474 14.9051 3.83895 15.481 4.36664 16.0002M19.3248 7.69653C19.9692 8.28964 20.5676 8.96425 21.11 9.71381C22.01 10.9534 22.01 13.037 21.11 14.2766C18.82 17.4416 15.53 19.2702 12 19.2702C10.6143 19.2702 9.26561 18.9884 7.99988 18.4547"
                                                      stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path id="vector_2" d="M15 12C15 13.6592 13.6592 15 12 15M14.0996 9.85541C13.5589 9.32599 12.8181 9 12 9C10.3408 9 9 10.3408 9 12C9 12.7293 9.25906 13.3971 9.69035 13.9166" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path id="vector_3" d="M2 21.0002L22 2.7002" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                                            </g>
                                        </g>
                                    </svg>}
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-2"/>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-4">
                        <PrimaryButton className="w-full h-11 mb-2 flex items-center justify-center" disabled={processing}>
                            Registrar
                        </PrimaryButton>
                        <div className="flex items-center justify-end mt-4">
                            <Link
                                href={route('login')}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Já é registrado?
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
