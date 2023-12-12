import { PageProps } from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { Container, Modal, Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import Separator from "@/Components/Separator";
import CardProdutoCarrinho from "@/Components/Cards/CardProdutoCarrinho";

export default function Listagem({ auth, produtosCarrinho }: PageProps<{ produtosCarrinho: any }>) {
    const [produtosSelecionados, setProdutosSelecionados] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState({});
    const [totalValue, setTotalValue] = useState(0);
    const [selectedProductsDetails, setSelectedProductsDetails] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [enderecos, setEnderecos] = useState([]); // Adicione esta linha

    useEffect(() => {
        const fetchEnderecos = async () => {
            try {
                const response = await fetch('/usuario/enderecos'); // Substitua pela sua URL de API real
                const data = await response.json();
                console.log('Dados da API:', data); // Adicione esta linha
                setEnderecos(data.enderecos);
            } catch (error) {
                console.error('Erro ao buscar endereços:', error);
            }
        };
    
        fetchEnderecos();
    }, []);

    const handleCheckboxChange = (idCarrinho: never) => {
        setProdutosSelecionados((prevSelected) => {
            if (prevSelected.includes(idCarrinho)) {
                return prevSelected.filter((id) => id !== idCarrinho);
            } else {
                return [...prevSelected, idCarrinho];
            }
        });
    };

    const handleFinalizarCompra = () => {
        const produtosParaFinalizar = produtosCarrinho.filter(
            (produto: { idCarrinho: never }) => produtosSelecionados.includes(produto.idCarrinho)
        );

        if (produtosParaFinalizar.length === 0) {
            // Nenhum produto marcado, exibe um alerta
            alert("Nenhum produto foi marcado para finalizar a compra. Por favor, selecione pelo menos um produto.");
            return;
        }

        setUserData({
            name: auth.user.name,
            email: auth.user.email,
            // Adicione outras informações do usuário conforme necessário
        });

        const total = produtosParaFinalizar.reduce(
            (total: number, produto: { produtoPreco: number; quantidade: number }) =>
                total + produto.produtoPreco * produto.quantidade,
            0
        );
        setTotalValue(total);

        setSelectedProductsDetails(produtosParaFinalizar); // Atualiza o estado com os detalhes dos produtos selecionados

        setShowModal(true);
        console.log("Produtos marcados para finalizar:", produtosParaFinalizar);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <GuestLayout user={auth.user}>
            <Head title="Carrinho de compras" />
            <Container className="w-75 my-4 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg text-center">
                <div className="d-flex flex-row">
                    <FontAwesomeIcon className="mx-sm-2 mt-2 h4" icon={faCartShopping} />
                    <h3 className="my-auto">Carrinho de Compras</h3>
                </div>
                <Separator />
                {produtosCarrinho.length ? (
                    <>
                        {produtosCarrinho.map((produto: any) => (
                            <div key={"card_" + produto.idCarrinho} className="d-flex flex-row align-items-center">
                                <input
                                    type="checkbox"
                                    checked={produtosSelecionados.includes(produto.idCarrinho)}
                                    onChange={() => handleCheckboxChange(produto.idCarrinho)}
                                    className="mr-2"
                                />
                                <CardProdutoCarrinho produto={produto} />
                            </div>
                        ))}
                        <Separator />
                        <div className="div-resumo-carrinho">
                            <div className="div-title">
                                <FontAwesomeIcon className="my-auto mr-2 h5" icon={faFileInvoice} />
                                <h3 style={{ margin: 'auto 0' }}>
                                    RESUMO
                                </h3>
                            </div>
                            <div className="div-totais">
                                <h6>{"Valor total: " + Number(produtosCarrinho
                                    .filter((produto: { idCarrinho: never; }) => produtosSelecionados.includes(produto.idCarrinho))
                                    .reduce((total: any, produto: any) => total + produto.produtoPreco * produto.quantidade, 0)
                                ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h6>
                                <button onClick={handleFinalizarCompra} className="btn btn-primary mt-3">
                                    Finalizar Compra
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <h4 className="mx-auto">Carrinho de compras vazio</h4>
                )}
                <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes da Compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{userData.name}</p>
                    <p>{userData.email}</p>
                    <p>Produtos Selecionados:</p>
                    {selectedProductsDetails.map((produto: any) => (
                        <div key={produto.idCarrinho} className="mb-3">
                            <h5>{produto.produtoNome || "Nome do Produto Indisponível"}</h5>
                            <p>Quantidade: {produto.quantidade}</p>
                            <p>Valor Unitário: {produto.produtoPreco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                            <p>Total: {(produto.produtoPreco * produto.quantidade).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                        </div>
                    ))}
                    <Form.Group controlId="enderecoSelect">
                        <Form.Label>Selecione o Endereço de Entrega:</Form.Label>
                        <Form.Control as="select" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                            <option value="" disabled>Selecione um endereço</option>
                            {/* Mapeie os endereços disponíveis e crie as opções do combobox */}
                            {enderecos.map((endereco: any) => (
                                <option key={endereco.id} value={endereco.id}>{endereco.endereco}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleFinalizarCompra}>
                        Finalizar Compra
                    </Button>
                </Modal.Footer>
            </Modal>
            </Container>
        </GuestLayout>
    );
}
