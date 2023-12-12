import {PageProps} from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";
import {Head} from "@inertiajs/react";
import {Container} from "react-bootstrap";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faFileInvoice} from '@fortawesome/free-solid-svg-icons'
import Separator from "@/Components/Separator";
import CardProdutoCarrinho from "@/Components/Cards/CardProdutoCarrinho";

export default function Listagem({auth, produtosCarrinho}: PageProps<{ produtosCarrinho: any }>) {

    const handleFinalizarCompra = () => {
        // Adicione a lógica para finalizar a compra aqui
        console.log("Compra finalizada!");
    };

    return (
        <GuestLayout user={auth.user}>
            <Head title="Carrinho de compras"/>

            <Container className="w-75 my-4 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg text-center">
                <div className="d-flex flex-row">
                    <FontAwesomeIcon className="mx-sm-2 mt-2 h4" icon={faCartShopping}/>
                    <h3 className="my-auto">Carrinho de Compras</h3>
                </div>

                <Separator/>

                {produtosCarrinho.length ? (
                    <>
                        {produtosCarrinho.map((produto: any) =>
                            <CardProdutoCarrinho key={"card_" + produto.idCarrinho} produto={produto}/>
                        )}
                        <Separator/>

                        <div className="div-resumo-carrinho">
                            <div className="div-title">
                                    <FontAwesomeIcon className="my-auto mr-2 h5" icon={faFileInvoice}/>
                                <h3 style={{margin: 'auto 0'}}>
                                    RESUMO
                                </h3>
                            </div>
                            <div className="div-totais">
                                <h6>{"Valor total: R$ " + produtosCarrinho.reduce((total: any, produto: any) => total + (produto.produtoPreco * produto.quantidade), 0)}</h6>
                                <h6>Valor do frete: R$ 10,00</h6>
                            </div>
                        </div>

                        <Separator/>

                        <button className="btn btn-primary" onClick={() => handleFinalizarCompra()}>
                            Finalizar compra
                        </button>

                    </>
                ) : (
                    <h4 className="mx-auto">Carrinho de compras vazio</h4>
                )}

            </Container>
        </GuestLayout>
    );
}
