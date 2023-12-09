import {PageProps} from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";
import {Head, useForm} from "@inertiajs/react";
import {Col, Container, Form, Row} from "react-bootstrap";
import React, {FormEventHandler, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandshake, faSave} from '@fortawesome/free-solid-svg-icons'
import BtnVoltar from "@/Components/Buttons/BtnVoltar";
import {toast} from "react-toastify";
import {NumericFormat} from "react-number-format";

export default function Adicionar({auth, orcamento}: PageProps<{ orcamento: any }>) {
    const {data, setData, put, processing, errors, reset} = useForm({
        id: orcamento.id,
        descricao: orcamento.descricao,
        idMaterial: orcamento.idMaterial,
        valor: orcamento.valor,
        largura: orcamento.largura,
        altura: orcamento.altura,
        comprimento: orcamento.comprimento,
        peso: orcamento.peso,
        situacao: orcamento.situacao
    });

    const [validated, setValidated] = useState(false);

    const submit: FormEventHandler = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        event.preventDefault();

        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            toast.error("Preencha os campos obrigatórios!")
        } else {
            try {
                put(route("orcamento.create"));

                toast.success('Orçamento realizado com sucesso.');
            } catch (error) {
                toast.success('Não foi possível finalizar o orçamento. Por favor, tente novamente.');
            }
        }
    };

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    return (
        <GuestLayout user={auth.user}>
            <Head title="Orçamento"/>
            <Container className="w-75 my-4 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg text-center">
                <div className="row mb-4">
                    <div className="w-50 d-flex flex-row ">
                        <FontAwesomeIcon className="mx-sm-2 mt-lg-2 h3" icon={faHandshake}/>
                        <h3 className="my-auto">Visualização de Orçamento</h3>
                    </div>

                    <div className="w-50 d-flex flex-row-reverse">
                        <BtnVoltar destino={'/orcamento'} auth={auth}/>
                    </div>
                </div>

                <Form noValidate validated={validated} onSubmit={submit}>
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

                </Form>
            </Container>
        </GuestLayout>
    );
}
