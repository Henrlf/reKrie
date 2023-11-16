import { PageProps } from '@/types';
import React, { useEffect, useState } from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from "@inertiajs/react";
import { Button, ButtonGroup, Card, Container, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import Separator from "@/Components/Separator";
import axios from "axios";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";



export default function Dashboard({ auth, produtos }: PageProps<{ produtos: any }>) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const addProdutoCarrinho = (idProduto: any) => {
        axios.post(route('carrinhocompra.create', { idProduto: idProduto }))
            .then(response => {
                toast.success('Produto adicionado ao carrinho de compras.');
            })
            .catch(error => {
                toast.error('Não foi possível adicionar o produto ao carrinho. Por favor, tente novamente.');
            });
    };

    console.log(produtos);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % produtos.length);
        }, 15000);

        return () => clearInterval(intervalId);
    }, [produtos.length]);

    const handleImageClick = () => {
        setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % produtos.length);
    };

    return (
        <GuestLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="w-90 bg-gray-300">
                <Container className="text-center">
                    <div className="col-lg-6 col-md-8 pt-4   mx-auto">
                        {/* Painel de Imagens */}
                        <div className="image-panel" style={{ position: 'relative', height: '400px', overflow: 'hidden', borderRadius: '25px' }}>
                            {produtos.map((produto: any, index: number) => (
                                <div key={produto.id} style={{ position: 'absolute', width: '100%', height: '100%', display: index === currentImageIndex ? 'block' : 'none' }}>
                                    <img
                                        src={produto.imagem}
                                        alt={`Produto ${index + 1}`}
                                        onClick={handleImageClick}
                                    />
                                    {/* Valor no canto inferior esquerdo */}
                                    <div style={{ position: 'absolute', bottom: '0', left: '0', padding: '8px', background: 'rgba(255, 255, 255, 0.7)' }}>
                                        {Number(produto.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </div>
                                        <ButtonGroup className="div-product-button-group mx-auto" style={{ position: 'absolute', bottom: '0', right: '0', display: 'flex', width: '60%' }}>
                                            <Button onClick={() => addProdutoCarrinho(produto.id)} className="div-product-button">
                                                Adicionar ao carrinho
                                            </Button>

                                            <Button onClick={() => addProdutoCarrinho(produto.id)} className="div-product-button">
                                                Comprar
                                            </Button>
                                        </ButtonGroup>
                                </div>
                            ))}
                            <SlArrowRight
                                className="arrow right"
                                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', fontSize: '48px', color: 'white', cursor: 'pointer' }}
                                onClick={() => setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % produtos.length)}
                            />
                            <SlArrowLeft
                                className="arrow left"
                                style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', fontSize: '48px', color: 'white', cursor: 'pointer' }}
                                onClick={() => setCurrentImageIndex((prevIndex: number) => (prevIndex - 1 + produtos.length) % produtos.length)}
                            />

                        </div>
                    </div>
                </Container>
                <div className="d-flex justify-content-around p-3 flex-wrap">
                    {produtos.map((produto: any) =>
                        <div key={"product_card_" + produto.id} className="div-product">

                            <Card key={"card_" + produto.id} className="div-product-card">
                                <Card.Img
                                    variant="top"
                                    src={produto.imagem}
                                    style={{ height: '250px', objectFit: 'cover' }} // Defina a altura desejada
                                />

                                <Card.Body className="p-2">
                                    <Card.Text className="text-body-secondary h6 mt-1 float-end"> {Number(produto.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Card.Text>
                                    <Card.Title className="d-flex align-items-center h1">{produto.nome}</Card.Title>
                                    <Separator />
                                    <Card.Text style={{ textAlign: "justify" }}>{produto.descricao}</Card.Text>
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
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
