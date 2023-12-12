import {PageProps} from '@/types';
import React, {useEffect, useState} from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link} from "@inertiajs/react";
import {Button, ButtonGroup, Card, Container, Carousel, Dropdown} from "react-bootstrap";
import {toast} from "react-toastify";
import Separator from "@/Components/Separator";
import axios from "axios";

export default function Dashboard({auth, produtos}: PageProps<{ produtos: any }>) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortedProdutos, setSortedProdutos] = useState(produtos);
    const [sortOption, setSortOption] = useState<'menor' | 'maior'>('menor');

    const addProdutoCarrinho = (idProduto: any) => {
        axios.post(route('carrinhocompra.create', {idProduto: idProduto, quantidade: 1}))
            .then(response => {
                toast.success('Produto adicionado ao carrinho de compras.');
            })
            .catch(error => {
                toast.error('Não foi possível adicionar o produto ao carrinho. Por favor, tente novamente.');
            });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % produtos.length);
        }, 10000);

        return () => clearInterval(intervalId);
    }, [produtos.length]);

    const handleImageClick = (index: number) => {
        const produto = produtos[index];
        // Redirecionar para a página de detalhes do produto
        window.location.href = route('produto.detalhes', {codigo: produto.codigo});
    };

    const handleSortChange = (option: 'menor' | 'maior') => {
        // Novo estado para rastrear a opção selecionada
        setSortOption(option);
        // Inverta a ordem de ordenação quando a função for chamada
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);

        // Clone o array original de produtos para evitar mutações diretas
        const clonedProdutos = [...produtos];

        // Ordene o array clonado com base no preço
        clonedProdutos.sort((a, b) => {
            // Certifique-se de que a.valor e b.valor são números antes de comparar
            const priceA = typeof a.valor === 'number' ? a.valor : parseFloat(a.valor.replace('R$', '').replace(',', '.'));
            const priceB = typeof b.valor === 'number' ? b.valor : parseFloat(b.valor.replace('R$', '').replace(',', '.'));

            return newSortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });

        // Atualize o estado dos produtos ordenados com o array ordenado
        setSortedProdutos(clonedProdutos);
    };

    return (
        <GuestLayout user={auth.user}>
            <Head title="Dashboard"/>
            <div className="w-75 bg-gray-300">
                <Container className="mx-auto px-0">
                    <Carousel
                        activeIndex={currentImageIndex}
                        onSelect={(selectedIndex, e) => handleImageClick(selectedIndex)}
                    >
                        {produtos.map((produto: any, index: number) => (
                            <Carousel.Item key={produto.id}>
                                <Link href={route('produto.detalhes', {codigo: produto.id})}>
                                    <img
                                        className="d-block w-100"
                                        src={produto.imagem}
                                        alt={'Produto ${index + 1}'}
                                        onClick={() => handleImageClick(index)}
                                        style={{maxHeight: '400px', objectFit: 'cover'}}
                                    />
                                </Link>

                                <Carousel.Caption>
                                    <h3>{produto.nome}</h3>
                                    <p>{produto.descricao}</p>
                                    <div className="text-center col-lg-6 col-mg-12 mx-auto opacity-90">
                                        <p style={{marginBottom: '0', color: 'black', borderTopLeftRadius: '8px', borderTopRightRadius: '8px'}} className="mx-auto bg-white font-bold">
                                            {Number(produto.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                        </p>
                                        <ButtonGroup className="div-product-button-group mx-auto">
                                            <Button onClick={() => addProdutoCarrinho(produto.id)} className="btn btn-outline-success text-white div-product-button w-50" style={{width: '60%', borderBottomLeftRadius: '8px'}}>
                                                Adicionar ao carrinho
                                            </Button>
                                            <Button onClick={() => addProdutoCarrinho(produto.id)} className="btn btn-outline-success text-white div-product-button w-50" style={{width: '40%', borderBottomRightRadius: '8px'}}>
                                                Comprar
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Container>

                <div className="d-flex justify-content-around p-3 flex-wrap">
                    <div className="mb-2 w-100">
                        <Dropdown style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Dropdown.Toggle
                                variant="secondary"
                                id="dropdown-basic"
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: 'black'
                                }}>
                                <span style={{fontWeight: 'bold'}}>Ordenar por:</span>
                                <span style={{color: 'blue'}}> {sortOption === 'menor' ? 'Menor preço' : 'Maior preço'}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                style={{marginLeft: '60px', backgroundColor: 'ButtonFace', opacity: 0.9}}>
                                <Dropdown.Item
                                    onClick={() => handleSortChange('menor')}
                                    active={sortOption === 'menor'}
                                    style={{backgroundColor: 'transparent', color: 'blue'}}
                                >Menor preço</Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => handleSortChange('maior')}
                                    active={sortOption === 'maior'}
                                    style={{backgroundColor: 'transparent', color: 'blue'}}
                                >Maior preço </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {sortedProdutos.map((produto: any) => (
                        <div key={"product_card_" + produto.id} className="div-product">
                            <Card key={"card_" + produto.id} className="div-product-card">
                                <Link href={route('produto.detalhes', {codigo: produto.id})}>
                                    <Card.Img variant="top" src={produto.imagem} style={{height: '250px', objectFit: 'cover'}}/></Link>
                                <Card.Body className="p-2">
                                    <Card.Text className="text-body-secondary h6 mt-1 float-end">
                                        {Number(produto.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                    </Card.Text>
                                    <Card.Title className="d-flex align-items-center h1">{produto.nome}</Card.Title>
                                    <Separator/>
                                    <Card.Text style={{textAlign: 'justify'}}>{produto.descricao}</Card.Text>
                                    <Dropdown.Divider/>
                                </Card.Body>
                            </Card>
                            <ButtonGroup className="div-product-button-group mx-auto" style={{width: 'calc(100% - 2px)'}}>
                                <Button onClick={() => addProdutoCarrinho(produto.id)} className="btn btn-outline-success div-product-button text-white">
                                    Adicionar ao carrinho
                                </Button>
                                <Button onClick={() => addProdutoCarrinho(produto.id)} className="btn btn-outline-success div-product-button text-white">
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
