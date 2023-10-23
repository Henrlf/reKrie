import {PageProps} from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";
import {Head, useForm} from "@inertiajs/react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {FormEventHandler, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCube, faSave} from '@fortawesome/free-solid-svg-icons'
import BtnVoltar from "@/Components/Buttons/BtnVoltar";
import {Id, toast} from "react-toastify";

export default function Adicionar({auth}: PageProps) {
    const {data, setData, post, processing, errors, reset} = useForm({
        nome: '',
        descricao: '',
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
                post(route("material.create"));

                toast.success('Material cadastrado com sucesso.');
            } catch (error) {
                toast.success('Não foi possível cadastrar o material. Por favor, tente novamente.');
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
                        <Form.Group as={Col} md="9" controlId="nome">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Nome* </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome"
                                onChange={(e) => setData('nome', e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3" className="justify-end" controlId="situacao">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Situação</Form.Label>
                            <Form.Select
                                onChange={(e) => setData('situacao', e.target.value)}
                                defaultValue={1}
                                required
                            >
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
                                onChange={(e) => setData('descricao', e.target.value)}
                                style={{minHeight: "100px"}}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="d-flex flex-row-reverse mx-0">
                        <Button type="submit" className="h-button d-flex justify-content-center align-items-center" style={{width: "115px"}}>
                            <FontAwesomeIcon className="mx-sm-2 mt-lg-2 h6" icon={faSave}/>
                            Adicionar
                        </Button>
                    </Row>
                </Form>
            </Container>
        </GuestLayout>
    );
}
