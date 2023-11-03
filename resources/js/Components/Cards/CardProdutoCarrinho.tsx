import React, {useEffect} from "react";
import axios from "axios";
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";

export default function CardProdutoCarrinho(produto: { produto: any }) {
    let nome = produto.produto.produtoNome;
    let descricao = produto.produto.produtoDescricao;
    let img = produto.produto.produtoImg;
    let qunatidade = produto.produto.quantidade;
    let preco = produto.produto.produtoPreco.toFixed(2);

    const submit = () => {
        axios.delete(route('carrinhocompra.delete', {idCarrinho: produto.produto.idCarrinho}))
            .then(response => {
                localStorage.setItem('deleteSuccess', 'true');
                window.location.reload();
            })
            .catch(error => {
                toast.error('Não foi possível remover o produto do carrinho. Por favor, tente novamente.');
            });
    };

    useEffect(() => {
        const deleteSuccess = localStorage.getItem('deleteSuccess');

        if (deleteSuccess === 'true') {
            toast.success('Produto removido com sucesso.');
            localStorage.removeItem('deleteSuccess');
        }
    }, []);

    return (
        <div className="div-card-carrinho">
            <div className="div-card-carrinho-image">
                <img style={{borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'}} src={img}/>
            </div>

            <div className="div-card-carrinho-body">
                <div className="div-title">
                    <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                        <h4 style={{display: 'flex', margin: 'auto 0'}}>
                            {nome}
                        </h4>
                        &nbsp;
                        <h6 style={{margin: 'auto 0'}}>
                            {"(" + qunatidade + ")"}
                        </h6>
                    </div>

                    <h5 style={{margin: 'auto 0', color: '#6e6e73'}}>
                        {"R$ " + String(preco).replace('.', ',')}
                    </h5>
                </div>

                <div style={{margin: '0 6px', borderColor: '#9c9ca4'}} className="border-1 w-100"/>

                <div className="div-descricao ">
                    <h6 style={{margin: '5px 0', color: '#6e6e73'}}>
                        {descricao}
                    </h6>
                </div>
            </div>

            <div className="div-card-carrinho-buttom">
                <Button onClick={submit} variant="clean" className="button" title="Remover produto">
                    <FontAwesomeIcon style={{margin: 'auto 0'}} icon={faTimes}/>
                </Button>
            </div>
        </div>
    );
}
