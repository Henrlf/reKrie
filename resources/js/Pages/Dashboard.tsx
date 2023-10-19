import {PageProps} from '@/types';
import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from "@inertiajs/react";
import {Button, Card, Container, Placeholder} from "react-bootstrap";
import ProductCard from "@/Pages/Produto/ProductCard";

export default function Dashboard({auth, produtos}: PageProps<{ produtos: any }>) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <Container className="text-center">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Album example</h1>
                        <p className="lead text-body-secondary">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
                    </div>
                </div>
            </Container>

            {produtos.map((produto: any) =>
                <div className="d-flex justify-content-around">

                    <Card style={{width: '20rem'}}>
                        <Card.Img variant="top" src={produto.imagem}/>
                        <Card.Body>
                            <Card.Title>{produto.nome}</Card.Title>
                            <Card.Text>{produto.descricao}</Card.Text>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <Button href="#" variant="primary">Button 1</Button>
                                    <Button href="#" variant="primary">Button 2</Button>
                                </div>
                                
                                <small className="text-body-secondary">{"Preço: R$ " + produto.valor}</small>
                            </div>
                        </Card.Body>
                    </Card>

                </div>
            )}

            {/*<div className="album py-5 bg-body-tertiary">*/}
            {/*    <div className="container">*/}

            {/*        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">*/}
            {/*            <div className="col">*/}
            {/*                <div className="card shadow-sm">*/}
            {/*                    <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>*/}
            {/*                    <div className="card-body">*/}
            {/*                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>*/}
            {/*                        <div className="d-flex justify-content-between align-items-center">*/}
            {/*                            <div className="btn-group">*/}
            {/*                                <button type="button" className="btn btn-sm btn-outline-secondary">View</button>*/}
            {/*                                <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>*/}
            {/*                            </div>*/}
            {/*                            <small className="text-body-secondary">9 mins</small>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="pt-12">*/}
            {/*    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">*/}
            {/*        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">*/}
            {/*            <div className="p-6 text-gray-900">Você está conectado!</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="py-4">*/}
            {/*    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">*/}
            {/*        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">*/}
            {/*            <div className="p-6 text-gray-900">*/}
            {/*                <Link*/}
            {/*                    href={route('product.register')}*/}
            {/*                    className="text-gray-900 hover:text-gray-400 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"*/}
            {/*                >*/}
            {/*                    Registrar produto*/}
            {/*                </Link>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </AuthenticatedLayout>
    );
}
