// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";
import {createRef} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import {useState} from "react";
import axiosClient from "../axios-cliente.js";

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const {setUser, setToken} = useStateContext();
    const [message, setMessage] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
                console.log(data)
            })
            .catch((err) => {
                const response = err.response;

                console.log(response.data.message)

                if (response && response.status === 422) {
                    setMessage(response.data.message);
                }
            });
    };

    return (
        <>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <h1 className="title">Acesse sua conta</h1>

                        {message &&
                            <div className="alert">
                                <p>{message}</p>
                            </div>
                        }

                        <input ref={emailRef} type="email" placeholder="Email"/>
                        <input ref={passwordRef} type="password" placeholder="Password"/>

                        <button className="btn btn-block">Entrar</button>

                        <p className="message">
                            <Link to="/cadastrousuario">Não possui cadastro? Cadastre-se</Link>
                        </p>
                    </form>
                </div>
            </div>

            {/*<Form onSubmit={onSubmit}>*/}
            {/*    <Form.Group className="mb-3" controlId="formBasicEmail">*/}
            {/*        <Form.Label>Email address</Form.Label>*/}

            {/*        <Form.Control type="email" placeholder="Enter email"/>*/}

            {/*        <Form.Text className="text-muted">*/}
            {/*            We'll never share your email with anyone else.*/}
            {/*        </Form.Text>*/}

            {/*    </Form.Group>*/}

            {/*    <Form.Group className="mb-3" controlId="formBasicPassword">*/}
            {/*        <Form.Label>Password</Form.Label>*/}
            {/*        <Form.Control type="password" placeholder="Password"/>*/}
            {/*    </Form.Group>*/}

            {/*    <Button variant="primary" type="submit">*/}
            {/*        Submit*/}
            {/*    </Button>*/}
            {/*</Form>*/}
        </>
    );
}
