
import { PageProps } from '@/types';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';

const addProdutoCarrinho = (idProduto: any, quantidade: number) => {
  axios.post(route('carrinhocompra.create', { idProduto, quantidade }))
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
    altura: number;
    largura: number;
    comprimento: number;
    peso: number;
    // Outros campos do produto que você deseja exibir
  };
}>;

const ProdutoDetalhes: React.FC<ProdutoDetalhesProps> = ({ auth, produto }) => {
  const [quantidade, setQuantidade] = useState<number>(1);
  const [cep, setCep] = useState<string>('');

  const handleQuantidadeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantidade = parseInt(event.target.value, 10);
    setQuantidade(isNaN(newQuantidade) ? 1 : newQuantidade);
  };

  const handleCalcularFrete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const url = '/api/shipping';
      const response = await fetch(url); 
      const responseBody = await response.json();
      
      alert(responseBody.Data);
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      // Adicione o tratamento de erro conforme necessário
    }
  };

  return (
    <GuestLayout user={auth.user}>
      <Head title={`Detalhes do Produto - ${produto.nome}`} />
      <div className="col-lg-10 pt-4 mx-auto">
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <img
                className="img-fluid"
                src={produto.imagem}
                alt={produto.nome}
                style={{ width: '100%', height: '800px', borderRadius: '5px' }}
              />
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <h2>{produto.nome}</h2>
            <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
              <p>{produto.descricao}</p>
            </div>
            <div className='d-flex'>
              <div className='w-50'>
                <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginTop: '15px', marginRight: '15px', textAlign: 'center' }}>
                  <h5 className='mb-4'>Dimensões do Produto</h5>
                  <div style={{ textAlign: 'left' }}>
                    <p>Altura: {produto.altura} cm</p>
                    <p>Largura: {produto.largura} cm</p>
                    <p>Comprimento: {produto.comprimento} cm</p>
                    <p>Peso: {produto.comprimento} Kg</p>
                  </div>
                </div>
              </div>
              <div className='w-50'>
                <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginTop: '15px', marginLeft: 'auto', textAlign: 'right' }}>
                  <div className="d-flex justify-content align-items-center mb-2">
                    <label htmlFor="quantidade" style={{ marginLeft: '15px', marginRight: '2px' }}>Quantidade:</label>
                    <input type="number" id="quantidade" className="form-control" min="1" value={quantidade} onChange={handleQuantidadeChange} style={{ width: '70px' }} />
                    <p className='ml-10 mb-0'>
                      Total: {Number(produto.valor * quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>
                  <ButtonGroup className="div-product-button-group mx-auto">
                    <Button onClick={() => addProdutoCarrinho(produto.id, quantidade)} className="btn btn-outline-success text-white" style={{ width: '60%', opacity: 0.8 }}>
                      Adicionar ao carrinho
                    </Button>
                    <Button onClick={() => addProdutoCarrinho(produto.id, quantidade)} className="btn btn-outline-success text-white" style={{ width: '40%', opacity: 0.8 }}>
                      Comprar
                    </Button>
                  </ButtonGroup>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginTop: '15px', marginLeft: 'auto' }}>
                  <h5>Informe seu CEP para calcular o Frete</h5>
                  <form action="" className="ml-5 form-inline formShipping" onSubmit={handleCalcularFrete}>
                    <input
                      style={{ border: '0px', borderRadius: '5px' }}
                      placeholder="99999-999"
                      type="text"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}/>
                    <ButtonGroup className="div-product-button">
                      <Button className="btn btn-outline-success ml-5 text-white" type="submit">
                        Calcular
                      </Button>
                    </ButtonGroup>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default ProdutoDetalhes;
