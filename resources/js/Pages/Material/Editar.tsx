import {PageProps} from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";
import {Head, useForm} from "@inertiajs/react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {FormEventHandler, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCube, faSave} from '@fortawesome/free-solid-svg-icons'
import BtnVoltar from "@/Components/Buttons/BtnVoltar";
import {Id, toast} from "react-toastify";

export default function Adicionar({auth, material}: PageProps<{ material: any }>) {
    const {data, setData, put, processing, errors, reset} = useForm({
        id: material.id,
        nome: material.nome,
        descricao: material.descricao,
        situacao: material.situacao
    });

    const [validated, setValidated] = useState(false);

    const submit: FormEventHandler = async (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        event.preventDefault();
        setValidated(false);

        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            toast.error("Preencha os campos obrigatórios!");
        } else {
            try {
                put(route('material.update'));

                toast.success('Material salvo com sucesso.');
            } catch (error) {
                toast.success('Não foi possível salvar o material. Por favor, tente novamente.');
            }
        }
    };

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    return (
        <GuestLayout>
            <Head title="Materiais"/>
            <Container className="w-75 mt-4 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg text-center">
                <div className="row mb-4">
                    <div className="w-50 d-flex flex-row ">
                        <FontAwesomeIcon className="mx-sm-2 mt-lg-2 h3" icon={faCube}/>
                        <h3 className="my-auto">Adicionar Material</h3>
                    </div>

                    <div className="w-50 d-flex flex-row-reverse">
                        <BtnVoltar destino={'/material'} auth={auth}/>
                    </div>
                </div>

                <Form noValidate validated={validated} onSubmit={submit}>
                    <Row className="mb-3">
                        <Form.Group controlId="id">
                            <Form.Control
                                type="text"
                                value={material.id}
                                onChange={(e) => setData('id', e.target.value)}
                                hidden
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="9" controlId="nome">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Nome* </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome"
                                defaultValue={material.nome}
                                onChange={(e) => setData('nome', e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3" className="justify-end" controlId="situacao">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Situação</Form.Label>
                            <Form.Select
                                defaultValue={material.situacao}
                                onChange={(e) => setData('situacao', e.target.value)}>
                                <option value='1'>Habilitado</option>
                                <option value='0'>Desabilitado</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="descricao">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Descrição"
                                defaultValue={material.descricao}
                                onChange={(e) => setData('descricao', e.target.value)}
                                style={{minHeight: "100px"}}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="d-flex flex-row-reverse mx-0">
                        <Button type="submit" className="h-button d-flex justify-content-center align-items-center" style={{width: "115px"}}>
                            <FontAwesomeIcon className="mx-sm-2 mt-lg-2 h6" icon={faSave}/>
                            Salvar
                        </Button>
                    </Row>
                </Form>
            </Container>
        </GuestLayout>
    );
}
