
import { PageProps } from '@/types';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';


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
  const [frete, setFrete] = useState<any>(null);

  const handleQuantidadeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantidade = parseInt(event.target.value, 10);
    setQuantidade(isNaN(newQuantidade) ? 1 : newQuantidade);
  };

  const handleCalcularFrete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verificar se o campo do CEP está preenchido
    if (!cep.trim()) {
      toast.error('Por favor, informe um CEP válido.');
      return;
    }

    try {
      // Adicionar o valor do CEP à URL da solicitação
      const url = `/api/shipping/${cep}?altura=${produto.altura}&largura=${produto.largura}&comprimento=${produto.comprimento}`;
      const response = await fetch(url);
      const responseBody = await response.json();

      // Armazenar os valores do frete no estado
      setFrete(responseBody.data);
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
                    <InputMask
                      mask="99999-999"
                      maskChar=""
                      style={{ border: '0px', borderRadius: '5px' }}
                      placeholder="99999-999"
                      type="text"
                      value={cep}
                      onChange={(e: any) => setCep(e.target.value)}
                    />
                    <ButtonGroup className="div-product-button">
                      <Button className="btn btn-outline-success ml-5 text-white" type="submit">
                        Calcular
                      </Button>
                    </ButtonGroup>
                  </form>
                  <div className='mt-1' style={{ textAlign: 'center' }}>
                    {frete && (
                      <div>
                        <h5 className='m-4'>Informações de Frete</h5>
                        <div style={{ textAlign: 'left' }}>
                          <p>CEP: {frete.cep}</p>
                          <p>Estado: {frete.state}</p>
                          <p>Cidade: {frete.city}</p>
                          {frete.street && <p>Endereço: {frete.street}</p>} {/* Renderiza somente se a rua estiver presente */}
                          <p>Serviço: {frete.service}</p>
                          <p>Prazo de Entrega: {frete.prazo_entrega}</p>
                          <p>Valor do Frete: {Number(frete.valor_frete).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                      </div>
                    )}
                  </div>
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
