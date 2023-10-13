import React, {PropsWithChildren} from 'react';
import {Button, ButtonGroup, Nav, Navbar, Container} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import "../../css/ReactToastify.css";
import "../../css/Custom.css";

export default function Guest({children}: PropsWithChildren) {
    return (
        <div>
            <header>
                <div>
                    <Navbar bg="dark" data-bs-theme="dark" className="lh-lg">
                        <Container>
                            <Navbar.Brand href="/">ReKrie</Navbar.Brand>

                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/produto">Produtos</Nav.Link>
                                <Nav.Link href="/material">Materiais</Nav.Link>
                            </Nav>

                            <ButtonGroup aria-label="Basic example" className="justify-content-end">
                                <Button href="/login" variant="light">Login</Button>
                                <Button href="/register" variant="light">Cadastrar-se</Button>
                            </ButtonGroup>

                        </Container>
                    </Navbar>
                </div>
            </header>

            <main className="min-h-screen flex flex-col items-center bg-body-secondary">
                {children}
            </main>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="colored"
            />
        </div>
    );
}
