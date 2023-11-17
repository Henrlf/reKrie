import "../../css/ReactToastify.css";
import "../../css/Custom.css";
import React, { FormEventHandler, PropsWithChildren } from 'react';
import { Button, ButtonGroup, Nav, Navbar, Container, NavDropdown, Form, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import ApplicationIcon from '@/Components/Logos/ApplicationIcon';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { User } from "@/types";
import { useForm } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Guest({ user, children }: PropsWithChildren<{ user: any }>) {
    let layout = unloggedLayout();

    if (user) {
        if (user.admin) {
            layout = loggedAdminLayout(user);
        } else {
            layout = loggedUserLayout(user);
        }
    }

    return (
        <div>
            <header>
                <Navbar bg="gray-800" data-bs-theme="dark" className="lh-lg">
                    <Container className="flex-nowrap" style={{ "minWidth": "75%" }}>
                        <Navbar.Brand href="/" className="d-flex"><ApplicationIcon />ReKrie</Navbar.Brand>
                        {layout}
                    </Container>
                </Navbar>
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
            <footer>
                <Container className="bg-gray-800 text-light" style={{ "minWidth": "100%" }}>
                    <Row className="pt-4 justify-content-center">
                        <Col md={3} className="d-flex justify-content-end">
                            <div>
                                <h5>Links Úteis</h5>
                                <ul className="list-unstyled">
                                    <li><a href="/sobre">Sobre Nós</a></li>
                                    <li><a href="mailto:cristian.valentini@universo.univates.br">Contato</a></li>
                                    <li><a href="/termos">Termos de Serviço</a></li>
                                    <li><a href="/privacidade">Política de Privacidade</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col md={3} className="ml-3 d-flex justify-content-center">
                            <div>
                                <h5>Categorias</h5>
                                <ul className="list-unstyled">
                                    <li><a href="/categorias/prontaEntrega">À pronta entrega</a></li>
                                    <li><a href="/categorias/encomendas">Encomendas</a></li>
                                    {/* Adicione mais categorias conforme necessário */}
                                </ul>
                            </div>
                        </Col>
                        <Col md={3} className="ml-3 d-flex justify-content-start">
                            <div>
                                <h5>Redes Sociais</h5>
                                <ul className="list-unstyled">
                                    <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                                    <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                                    <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <hr className="bg-light" />
                    <Row className="pt-2">
                        <Col className="text-center">
                            <p>&copy; 2023 ReKrie. Todos os direitos reservados.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>

        </div>
    );
}

function unloggedLayout() {
    const { data, setData, post } = useForm({
        searchDescription: '',
    });

    const submitSearch: FormEventHandler = (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            post(route("dashboard.search"));
        } catch (error) {
            toast.success('Não foi possível realizar a busca. Por favor, tente novamente.');
        }
    };

    return (
        <>
            <Form onSubmit={submitSearch} className="d-flex justify-content-center w-40">
                <Form.Control
                    type="search"
                    placeholder="Pesquisa..."
                    className="mr-2"
                    onChange={(e) => setData('searchDescription', e.target.value)}
                />

                <Button variant="outline-info d-flex align-items-center" onClick={submitSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </Form>

            <ButtonGroup aria-label="Basic example" className="justify-content-end">
                <Button href="/login" variant="light">Login</Button>
                <Button href="/register" variant="light">Cadastrar-se</Button>
            </ButtonGroup>
        </>
    );
}

function loggedUserLayout(user: User) {
    const { data, setData, post } = useForm({
        searchDescription: '',
    });

    const submitSearch: FormEventHandler = (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            post(route("dashboard.search"));
        } catch (error) {
            toast.success('Não foi possível realizar a busca. Por favor, tente novamente.');
        }
    };

    return (
        <>
            <Form onSubmit={submitSearch} className="d-flex justify-content-center w-40">
                <Form.Control
                    type="search"
                    placeholder="Pesquisa..."
                    className="mr-2"
                    onChange={(e) => setData('searchDescription', e.target.value)}
                />

                <Button variant="outline-info d-flex align-items-center" title="Pesquisar" onClick={submitSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </Form>

            <Nav className="d-flex justify-content-end align-items-center">
                <Button href={"/usuario/carrinhocompra"} variant="outline-light" className="nav-btn-size" title="Carrinho de compras">
                    <FontAwesomeIcon icon={faCartShopping} />
                </Button>
                <NavDropdown title={user.name} menuVariant="dark">
                    <NavDropdown.Item href="/usuario/perfil">Perfil</NavDropdown.Item>
                    <NavDropdown.Item href="/usuario/endereco">Endereços</NavDropdown.Item>
                    <NavDropdown.Item href="/usuario/orcamento">Orçamentos</NavDropdown.Item>
                    <NavDropdown.Item href="/usuario/pedido">Meus pedidos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/auth/logout" eventKey={0}>Sair</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </>
    );
}

function loggedAdminLayout(user: User) {
    const { post } = useForm({});

    const enventSelected = (eventKey: any) => {
        if (eventKey == 0) {
            try {
                post(route('logout'));
            } catch (error) {
                toast.success('Não foi possível realizar a busca. Por favor, tente novamente.');
            }
        }
    };

    return (
        <>
            <Nav className="me-auto">
                <Nav.Link href="/produto">Produtos</Nav.Link>
                <Nav.Link href="/material">Materiais</Nav.Link>
            </Nav>

            <Nav className="justify-content-end" activeKey="1" onSelect={enventSelected}>
                <NavDropdown title={user.name} menuVariant="dark">
                    <NavDropdown.Item href="/">Action</NavDropdown.Item>
                    <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="/">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/auth/logout" eventKey={0}>Sair</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </>
    );
}
