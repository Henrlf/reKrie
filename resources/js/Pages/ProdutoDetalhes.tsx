import { PageProps } from '@/types';
import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const addProdutoCarrinho = (idProduto: any) => {
  axios.post(route('carrinhocompra.create', { idProduto: idProduto }))
    .then(response => {
      toast.success('Produto adicionado ao carrinho de compras.');
    })
    .catch(error => {
      toast.error('Não foi possível adicionar o produto ao carrinho. Por favor, tente novamente.');
    });
};

type ProdutoDetalhesProps = PageProps<{
  produto: {
    id: number;
    nome: string;
    descricao: string;
    imagem: string;
    valor: number;
    // Outros campos do produto que você deseja exibir
  };
}>;

const ProdutoDetalhes: React.FC<ProdutoDetalhesProps> = ({ auth, produto }) => {
  return (
    <GuestLayout user={auth.user}>
      <Head title={`Detalhes do Produto - ${produto.nome}`} />
      <div className="col-lg-12 pt-4 mx-auto">
        <div className="row">
          <div className="col-lg-3 ml-40">
            <img
              className="img-fluid"
              src={produto.imagem}
              alt={produto.nome}
            />
          </div>
          <div className="col-lg-7 d-block">
            <h2>{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <div className="col-lg-5 mr-0">
              <p>
                Valor: {Number(produto.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <div className="d-flex flex-column">
                <label htmlFor="quantidade">Quantidade:</label>
                <input type="number" id="quantidade" className="form-control mb-2" min="1" defaultValue="1" />
                <ButtonGroup className="div-product-button-group mx-auto">
                  <Button onClick={() => addProdutoCarrinho(produto.id)} className="div-product-button" style={{ width: '60%', borderBottomLeftRadius: '50px', opacity: 0.8 }}>
                    Adicionar ao carrinho
                  </Button>
                  <Button onClick={() => addProdutoCarrinho(produto.id)} className="div-product-button" style={{ width: '40%', borderBottomRightRadius: '50px', opacity: 0.8 }}>
                    Comprar
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default ProdutoDetalhes;