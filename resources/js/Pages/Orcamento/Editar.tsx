import {PageProps} from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";
import {Head} from "@inertiajs/react";
import {Button, Col, Container, Form, InputGroup, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandshake, faLeftLong, faAnglesRight, faTimes, faCheck} from '@fortawesome/free-solid-svg-icons'
import BtnVoltar from "@/Components/Buttons/BtnVoltar";
import {toast} from "react-toastify";
import {NumericFormat} from "react-number-format";
import axios from "axios";

export default function Adicionar({auth, orcamento, usuario}: PageProps<{ orcamento: any, usuario: any }>) {
    const user = auth.user;

    const avancarOrcamento = (idOrcamento: any) => {
        axios.put(route('orcamento.avancar', {idOrcamento: idOrcamento}))
            .then(response => {
                localStorage.setItem('avancarSuccess', 'true');
                window.location.reload();
            })
            .catch(error => {
                toast.error('Não foi possível avançar a situação do orçamento. Por favor, tente novamente.');
            });
    };

    const rejeitarOrcamento = (idOrcamento: any) => {
        axios.put(route('orcamento.rejeitar', {idOrcamento: idOrcamento}))
            .then(response => {
                localStorage.setItem('rejeitarSuccess', 'true');
                window.location.reload();
            }).catch(error => {
                toast.error('Não foi possível rejeitar este orçamento. Por favor, tente novamente.');
            });
    };

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const rejeitarSuccess = localStorage.getItem('rejeitarSuccess');
        const avancarSuccess = localStorage.getItem('avancarSuccess');

        if (rejeitarSuccess === 'true') {
            toast.success('Pedido de orçamento rejeitado com sucesso.');
            localStorage.removeItem('rejeitarSuccess');
        }

        if (avancarSuccess === 'true') {
            toast.success('Situação do orçamento avançada com sucesso.');
            localStorage.removeItem('avancarSuccess');
        }
    }, []);

    return (
        <GuestLayout user={auth.user}>
            <Head title="Orçamento"/>
            <Container className="w-75 my-4 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg text-center">
                <div className="row mb-4">
                    <div className="w-50 d-flex flex-row ">
                        <FontAwesomeIcon className="mx-sm-2 mt-lg-2 h3" icon={faHandshake}/>
                        {user.admin ?
                            <h3 className="my-auto">Orçamento de {orcamento.usuarioDescription}</h3>
                            :
                            <h3 className="my-auto">Visualização de Orçamento</h3>
                        }
                    </div>

                    <div className="w-50 d-flex flex-row-reverse">
                        {user.admin ?
                            <div className="d-flex flex-nowrap">
                                {orcamento.situacao === 1 ?
                                    <Button
                                        onClick={() => rejeitarOrcamento(orcamento.id)}
                                        variant="danger"
                                        className="shadow border d-flex justify-content-center align-items-center h-button mx-1"
                                    >
                                        <FontAwesomeIcon className="mt-lg-2 h6" style={{marginRight: '10px'}} icon={faTimes}/>
                                        Rejeitar pedido
                                    </Button>
                                    : ''}

                                {orcamento.situacao < 5 ?
                                    <Button
                                        onClick={() => avancarOrcamento(orcamento.id)}
                                        variant="primary"
                                        className="shadow border d-flex justify-content-center align-items-center h-button mx-1"
                                        style={orcamento.situacao === 1 ? {background: "#02ad37"} : {}}
                                    >
                                        <FontAwesomeIcon className="mt-lg-2 h6" style={{marginRight: '10px'}} icon={orcamento.situacao === 1 ? faCheck : faAnglesRight}/>
                                        {orcamento.situacao === 1 ? "Aprovar pedido" : "Avançar situação"}
                                    </Button>
                                    : ''}

                                <Button
                                    href={'/orcamento'}
                                    variant="light"
                                    className="shadow border-black border-1 border-opacity-25 d-flex justify-content-center align-items-center h-button mx-1"
                                    style={{width: '115px'}}
                                >
                                    <FontAwesomeIcon className="mt-lg-2 h5" style={{marginRight: '10px'}} icon={faLeftLong}/>
                                    Voltar
                                </Button>
                            </div>
                            :
                            <BtnVoltar destino={'/orcamento'} auth={auth}/>
                        }
                    </div>
                </div>

                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="descricao">
                            <Form.Label className='d-flex ml-2'>Descrição</Form.Label>
                            <Form.Control
                                value={orcamento.descricao}
                                as="textarea"
                                style={{minHeight: "100px"}}
                                readOnly={true}
                                className="disabled"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="3">
                            <Form.Label className='d-flex ml-2'>Material</Form.Label>
                            <Form.Control
                                value={orcamento.materialDescription}
                                readOnly={true}
                                className="disabled"
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className='d-flex ml-2'>Largura (cm)</Form.Label>
                            <NumericFormat
                                className="form-control disabled"
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                placeholder="0,00"
                                readOnly={true}
                                defaultValue={orcamento.largura.toFixed(2)}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className='d-flex ml-2'>Altura (cm)</Form.Label>
                            <NumericFormat
                                className="form-control disabled"
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                placeholder="0,00"
                                readOnly={true}
                                defaultValue={orcamento.altura.toFixed(2)}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className='d-flex ml-2'>Comprimento* (cm)</Form.Label>
                            <NumericFormat
                                className="form-control disabled"
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                placeholder="0,00"
                                readOnly={true}
                                defaultValue={orcamento.comprimento.toFixed(2)}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className='d-flex ml-2'>Peso (kg)</Form.Label>
                            <NumericFormat
                                className="form-control disabled"
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                placeholder="0,00"
                                readOnly={true}
                                defaultValue={orcamento.peso.toFixed(2)}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3 d-flex flex-row-reverse">
                        <Form.Group as={Col} md="3">
                            <Form.Label className='d-flex ml-2'>Situação</Form.Label>
                            <Form.Control
                                value={orcamento.situacaoDescription}
                                readOnly={true}
                                className="disabled"
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3">
                            <Form.Label className='d-flex ml-2'>Data do pedido</Form.Label>
                            <Form.Control
                                value={new Date(orcamento.created_at).toLocaleDateString()}
                                readOnly={true}
                                className="disabled"
                            />
                        </Form.Group>
                    </Row>

                    {user.admin ?
                        <div>
                            <hr/>
                            <h4 className="d-flex align-items-start ml-2 text-gray-500">{'Usuário'}</h4>

                            <Container className="d-flex flex-nowrap p-0">
                                <InputGroup className="flex-nowrap w-60 pr-2">
                                    <InputGroup.Text className="disabled">E-mail:</InputGroup.Text>
                                    <InputGroup.Text className="w-100">{usuario.email}</InputGroup.Text>
                                </InputGroup>

                                <InputGroup className="flex-nowrap w-30 pr-2">
                                    <InputGroup.Text className="disabled">CPF:</InputGroup.Text>
                                    <InputGroup.Text className="w-100">{usuario.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4')}</InputGroup.Text>
                                </InputGroup>

                                <InputGroup className="flex-nowrap w-30 pr-2">
                                    <InputGroup.Text className="disabled">Telefone:</InputGroup.Text>
                                    <InputGroup.Text className="w-100">{usuario.telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3')}</InputGroup.Text>
                                </InputGroup>
                            </Container>
                        </div>
                        : ''}
                </Form>
            </Container>
        </GuestLayout>
    );
}
