import {PageProps} from '@/types';
import React from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import {Head} from "@inertiajs/react";
import {Button, ButtonGroup, Card, Container, Dropdown} from "react-bootstrap";
import {toast} from "react-toastify";
import Separator from "@/Components/Separator";
import axios from "axios";

export default function Dashboard({auth, produtos}: PageProps<{ produtos: any }>) {

    const addProdutoCarrinho = (idProduto: any) => {
        axios.post(route('carrinhocompra.create', {idProduto: idProduto}))
            .then(response => {
                toast.success('Produto adicionado ao carrinho de compras.');
            })
            .catch(error => {
                toast.error('Não foi possível adicionar o produto ao carrinho. Por favor, tente novamente.');
            });
    };

    console.log(produtos);

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
                        <div key={"product_card_" + produto.id} className="div-product">

                            <Card key={"card_" + produto.id} className="div-product-card">
                                <Card.Img variant="top" src={produto.imagem}/>

                                <Card.Body className="p-2">
                                    <Card.Text className="text-body-secondary h6 mt-1 float-end">{"R$ " + String(produto.valor.toFixed(2)).replace('.', ',')}</Card.Text>
                                    <Card.Title className="d-flex align-items-center h1">{produto.nome}</Card.Title>
                                    <Separator/>
                                    <Card.Text style={{textAlign: "justify"}}>{produto.descricao}</Card.Text>
                                    <Dropdown.Divider/>
                                </Card.Body>
                            </Card>

                            <ButtonGroup className="div-product-button-group mx-auto" style={{width: 'calc(100% - 2px)'}}>
                                <Button onClick={() => addProdutoCarrinho(produto.id)} className="div-product-button">
                                    Adicionar ao carrinho
                                </Button>

                                <Button onClick={() => addProdutoCarrinho(produto.id)} className="div-product-button">
                                    Comprar
                                </Button>
                            </ButtonGroup>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
