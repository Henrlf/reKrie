import {useRef, useState} from "react";
import {Link} from "react-router-dom";
import axiosCliente from "../axios-cliente.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function CadastroUsuario() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const cpfRef = useRef();
    const telefoneRef = useRef();
    const idGrupoRef = useRef();

    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            cpf: cpfRef.current.value,
            telefone: telefoneRef.current.value.toString(),
            idGrupo: idGrupoRef.current.value,
        };

        axiosCliente.post('/cadastrousuario', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                console.log(payload)
                if (response && response.status === 422) {

                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <h1 className="title">Acesse sua conta</h1>

                        {errors &&
                            <div className="alert">
                                {Object.keys(errors).map(key => (
                                    <p>
                                        {errors[key]}
                                    </p>
                                ))}
                            </div>
                        }

                        <input ref={nameRef} type="text" placeholder="Nome completo"/>
                        <input ref={emailRef} type="email" placeholder="Email"/>
                        <input ref={passwordRef} type="password" placeholder="Senha"/>
                        <input ref={passwordConfirmationRef} type="password" placeholder="Confirmação da senha"/>
                        <input ref={cpfRef} type="text" data-inputmask="'mask': '999.999.999-99'" placeholder="CPF"/>
                        <input ref={telefoneRef} type="tel" placeholder="Telefone"/>
                        <input ref={idGrupoRef} type="hidden" defaultValue="2"/>

                        <button className="btn btn-block">Cadastrar</button>

                        <p className="message">
                            <Link to="/login">Já possui uma conta ReKrie? Entrar</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
