import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import { Button, ButtonGroup, Nav, Navbar, Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "../../css/ReactToastify.css";
import "../../css/Custom.css";

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(true);

    if (user) {
        // Renderize o conteúdo do Authenticated se o usuário estiver logado
        return (
            <div>
                <header>
                    <div>
                        <Navbar bg="gray-800" data-bs-theme="dark" className="lh-lg">
                            <Container>
                                <div className='w-full flex items-center justify-start mb-20'>
                                    <Navbar.Brand href="/">ReKrie</Navbar.Brand>
                                    <Nav className="me-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                        <Nav.Link href="/produto">Produtos</Nav.Link>
                                        <Nav.Link href="/material">Materiais</Nav.Link>
                                    </Nav>
                                </div>
                                <div className='w-full flex items-center justify-center'>
                                    <ApplicationLogo className="" />
                                </div>
                                <div className='w-full flex items-center justify-end mb-20'>
                                    <div className="ml-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        {user.name}

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('profile.edit')}>Peril do Usuário</Dropdown.Link>
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    Sair
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            </Container>
                        </Navbar>
                    </div>
                </header>
                <main className="min-h-screen flex flex-col items-center bg-gray-800">
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
    } else {
        // Renderize o conteúdo do Guest se o usuário não estiver logado
        return (
            <div>
                <header>
                    <div>
                        <Navbar bg="gray-800" data-bs-theme="dark" className="lh-lg">
                            <Container>
                                <div className='w-full flex items-center justify-start mb-20'>
                                    <Navbar.Brand href="/">ReKrie</Navbar.Brand>
                                    <Nav className="me-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                        <Nav.Link href="/produto">Produtos</Nav.Link>
                                        <Nav.Link href="/material">Materiais</Nav.Link>
                                    </Nav>
                                </div>
                                <div className='w-full flex items-center justify-center'>
                                    <ApplicationLogo className="" />
                                </div>
                                <div className='w-full flex items-center justify-end mb-20'>
                                    <ButtonGroup aria-label="Basic example" className="justify-content-end">
                                        <Button href="/login" variant="light">Entrar</Button>
                                        <Button href="/register" variant="light">Cadastrar-se</Button>
                                    </ButtonGroup>
                                </div>
                            </Container>
                        </Navbar>
                    </div>
                </header>

                <main className="min-h-screen flex flex-col items-center bg-gray-800">
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
}