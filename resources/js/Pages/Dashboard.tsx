import {PageProps} from '@/types';
import React from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import {Head} from "@inertiajs/react";
import {Button, ButtonGroup, Card, Container, Row} from "react-bootstrap";

export default function Dashboard({auth, produtos}: PageProps<{ produtos: any }>) {
    return (
        <GuestLayout user={auth.user}>
            <Head title="Dashboard"/>

            <div className="w-70 bg-gray-300">
                <Container className="text-center">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">Album example</h1>
                            <p className="lead text-body-secondary">Necessitamos de uma frase de impacto</p>
                        </div>
                    </div>
                </Container>

                <div className="d-flex justify-content-around p-3 flex-wrap">
                    {produtos.map((produto: any) =>
                        <Card className="border-2 productCard">
                            <Card.Img variant="top" src={produto.imagem}/>

                            <Card.Body className="p-2 mb-3">
                                <Card.Text className="text-body-secondary h6 mt-1 float-end">
                                    {"R$ " + produto.valor.replace('.', ',')}
                                </Card.Text>

                                <Card.Title className="d-flex align-items-center h1">
                                    {produto.nome}
                                </Card.Title>

                                <Card.Text style={{textAlign: "justify"}}>{produto.descricao}</Card.Text>

                                <Card.Subtitle className="d-flex flex-nowrap p-0">
                                    <Button href="#" variant="primary" className="text-nowrap mr-2 w-50">Adicionar ao carrinho</Button>
                                    <Button href="#" variant="primary" className="text-nowrap w-50">Comprar</Button>
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
