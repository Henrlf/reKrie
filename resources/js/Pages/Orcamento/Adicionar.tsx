import {PageProps} from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";
import {Head, useForm} from "@inertiajs/react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {FormEventHandler, useEffect, useState} from "react";
import {NumericFormat} from 'react-number-format';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandshake, faSave} from '@fortawesome/free-solid-svg-icons'
import BtnVoltar from "@/Components/Buttons/BtnVoltar";
import {toast} from "react-toastify";

export default function Adicionar({auth, materiais}: PageProps<{ materiais: any }>) {
    const {data, setData, post, processing, errors, reset} = useForm({
        idMaterial: '',
        descricao: '',
        valor: '0.00',
        largura: '0.00',
        altura: '0.00',
        comprimento: '0.00',
        peso: '0.00',
        situacao: '1'
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
                post(route("orcamento.create"));

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
            <Head title="Materiais"/>
            <Container className="w-75 my-4 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg text-center">
                <div className="row mb-4">
                    <div className="w-50 d-flex flex-row ">
                        <FontAwesomeIcon className="mx-sm-2 mt-lg-2 h3" icon={faHandshake}/>
                        <h3 className="my-auto">Criação de Orçamento</h3>
                    </div>

                    <div className="w-50 d-flex flex-row-reverse">
                        <BtnVoltar destino={'/orcamento'} auth={auth}/>
                    </div>
                </div>

                <Form noValidate validated={validated} onSubmit={submit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="descricao">
                            <Form.Label className='d-flex ml-2'>Descrição* (Mínimo de 10 caracteres) </Form.Label>
                            <Form.Control
                                autoComplete="off"
                                as="textarea"
                                style={{minHeight: "100px"}}
                                minLength={10}
                                onChange={(e) => setData('descricao', e.target.value)}
                                placeholder="Descrição..."
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="3" controlId="idMaterial">
                            <Form.Label className='d-flex ml-2'>Material*</Form.Label>
                            <Form.Select
                                onChange={(e) => setData('idMaterial', e.target.value)}
                                required
                            >
                                <option value=''>Selecione um Material</option>

                                {materiais.map((material: any) => (
                                    <option value={material.id}>{material.nome}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="largura">
                            <Form.Label className='d-flex ml-2'>Largura* (cm)</Form.Label>
                            <NumericFormat
                                className="form-control"
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                onChange={(e) => setData('largura', e.target.value)}
                                placeholder="0,00"
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="altura">
                            <Form.Label className='d-flex ml-2'>Altura* (cm)</Form.Label>
                            <NumericFormat
                                className="form-control"
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                onChange={(e) => setData('altura', e.target.value)}
                                placeholder="0,00"
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="comprimento">
                            <Form.Label className='d-flex ml-2'>Comprimento* (cm)</Form.Label>
                            <NumericFormat
                                className="form-control"
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                onChange={(e) => setData('comprimento', e.target.value)}
                                placeholder="0,00"
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="peso">
                            <Form.Label className='d-flex ml-2'>Peso (kg)</Form.Label>
                            <NumericFormat
                                className="form-control"
                                thousandSeparator="."
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                onChange={(e) => setData('peso', e.target.value)}
                                placeholder="0,00"
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <div className="d-flex flex-row-reverse">
                            <Button type="submit" className="h-button d-flex justify-content-center align-items-center">
                                <FontAwesomeIcon className="mx-sm-2 mt-lg-2 h6" icon={faSave}/>
                                Finalizar orçamento
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Container>
        </GuestLayout>
    );
}


