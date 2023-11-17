import { PageProps } from '@/types';
import React, { useEffect, useState } from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from "@inertiajs/react";
import { Button, ButtonGroup, Card, Container, Carousel, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import Separator from "@/Components/Separator";
import axios from "axios";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

export default function Dashboard({ auth, produtos }: PageProps<{ produtos: any }>) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const addProdutoCarrinho = (idProduto: any) => {
        // ... (código existente para adicionar produto ao carrinho)
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % produtos.length);
        }, 10000);

        return () => clearInterval(intervalId);
    }, [produtos.length]);

    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <GuestLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="w-90 bg-gray-300">
                <Container className="text-center">
                    <div className="col-lg-12 pt-1 mx-auto">
                        {/* Carrossel de Imagens */}
                        <Carousel
                            activeIndex={currentImageIndex}
                            onSelect={(selectedIndex, e) => handleImageClick(selectedIndex)}>
                            {produtos.map((produto: any, index: number) => (
                                <Carousel.Item key={produto.id}>
                                    <img
                                        className="d-block w-100"
                                        src={produto.imagem}
                                        alt={'Produto ${index + 1}'}
                                        onClick={() => handleImageClick(index)}
                                        style={{ maxHeight: '400px', objectFit: 'cover' }}/>
                                    <Carousel.Caption>
                                        <h3>{produto.nome}</h3>
                                        <p>{produto.descricao}</p>
                                        <div className="text-center col-lg-6 col-mg-12 mx-auto">
                                            <p style={{marginBottom: '0', background: 'rgba(255, 255, 255, 0.7)', color: 'black', fontWeight: 'bold', borderTopLeftRadius: '50px', borderTopRightRadius: '50px' }} className="mx-auto">
                                                {Number(produto.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </p>
                                            <ButtonGroup className="div-product-button-group mx-auto">
                                                <Button onClick={() => addProdutoCarrinho(produto.id)} className="div-product-button" style={{width:'60%',borderBottomLeftRadius:'50px', opacity: 0.8 }}>
                                                    Adicionar ao carrinho
                                                </Button>
                                                <Button onClick={() => addProdutoCarrinho(produto.id)} className="div-product-button" style={{width:'40%',borderBottomRightRadius:'50px',opacity: 0.8 }}>
                                                    Comprar
                                                </Button>
                                            </ButtonGroup>
                                        </div>

                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </Container>
                {/* Lista de Produtos */}
                <div className="d-flex justify-content-around p-3 flex-wrap">
                    {produtos.map((produto: any) => (
                        <div key={"product_card_" + produto.id} className="div-product">
                            <Card key={"card_" + produto.id} className="div-product-card">
                                <Card.Img variant="top" src={produto.imagem} style={{ height: '250px', objectFit: 'cover' }} />
                                <Card.Body className="p-2">
                                    <Card.Text className="text-body-secondary h6 mt-1 float-end">
                                        {Number(produto.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </Card.Text>
                                    <Card.Title className="d-flex align-items-center h1">{produto.nome}</Card.Title>
                                    <Separator />
                                    <Card.Text style={{ textAlign: 'justify' }}>{produto.descricao}</Card.Text>
                                    <Dropdown.Divider />
                                </Card.Body>
                            </Card>
                            <ButtonGroup className="div-product-button-group mx-auto" style={{ width: 'calc(100% - 2px)' }}>
                                <Button onClick={() => addProdutoCarrinho(produto.id)} className="div-product-button">
                                    Adicionar ao carrinho
                                </Button>
                                <Button onClick={() => addProdutoCarrinho(produto.id)} className="div-product-button">
                                    Comprar
                                </Button>
                            </ButtonGroup>
                        </div>
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}
