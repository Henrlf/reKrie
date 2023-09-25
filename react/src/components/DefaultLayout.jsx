import {Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function DefaultLayout() {
    const {user, token} = useStateContext();

    if (token) {
        return loggedLayout();
    } else {
        return unloggedLayout();
    }
}

function unloggedLayout() {
    return (
        <>
            <div id="loginLayout" >
                <header>
                    <div>
                        <Navbar bg="dark" data-bs-theme="dark">
                            <Container>
                                <Navbar.Brand href="/home">ReKrie</Navbar.Brand>

                                <Nav className="me-auto">
                                    <Nav.Link href="/home">Home</Nav.Link>
                                    <Nav.Link href="">Produtos</Nav.Link>
                                </Nav>

                                <ButtonGroup aria-label="Basic example" className="justify-content-end">
                                    <Button href="/login" variant="light">Login</Button>
                                    <Button href="/cadastrousuario" variant="light">Cadastrar-se</Button>
                                </ButtonGroup>

                            </Container>
                        </Navbar>
                    </div>
                </header>

                <main>
                    <Outlet/>
                </main>
            </div>
        </>
    )
}

function loggedLayout() {
    return (
        <>
            <Nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Top navbar</a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>

                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </Nav>

            <Outlet/>
        </>
    )
}
