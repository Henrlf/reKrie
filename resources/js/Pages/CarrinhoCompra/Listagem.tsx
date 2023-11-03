import {PageProps} from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";
import {Head} from "@inertiajs/react";
import {Container} from "react-bootstrap";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import Separator from "@/Components/Separator";
import CardProdutoCarrinho from "@/Components/Cards/CardProdutoCarrinho";

export default function Listagem({auth, produtosCarrinho}: PageProps<{ produtosCarrinho: any }>) {

    return (
        <GuestLayout user={auth.user}>
            <Head title="Carrinho de compras"/>

            <Container className="w-75 mt-4 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg text-center">
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


                    </>
                ) : (
                    <h4 className="mx-auto">Carrinho de compras vazio</h4>
                )}

            </Container>
        </GuestLayout>
    );
}
