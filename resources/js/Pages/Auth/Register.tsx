import {useEffect, FormEventHandler} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';

export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        cpf: '',
        telefone: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const marginLabel = 'ml-2';

    return (
        <GuestLayout>
            <Head title="Registrar-se"/>

            <form onSubmit={submit} className="w-50 mx-auto">
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

                <div className="mt-4">
                    <InputLabel htmlFor="cpf" value="CPF*" className={marginLabel}/>

                    <TextInput
                        id="cpf"
                        name="cpf"
                        maxLength={14}
                        value={data.cpf}
                        className="mt-1 block w-full"
                        autoComplete="cpf"
                        onChange={(e) => setData('cpf', e.target.value)}
                        required
                    />

                    <InputError message={errors.cpf} className="mt-2"/>
                </div>

                <div className="mt-4">
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

                <div className="mt-4">
                    <InputLabel htmlFor="telefone" value="Telefone" className={marginLabel}/>

                    <TextInput
                        id="telefone"
                        name="telefone"
                        value={data.telefone}
                        maxLength={20}
                        className="mt-1 block w-full"
                        autoComplete="telefone"
                        onChange={(e) => setData('telefone', e.target.value)}
                    />

                    <InputError message={errors.telefone} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Senha*" className={marginLabel}/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar senha*" className={marginLabel}/>

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2"/>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Já é registrado?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Registrar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
