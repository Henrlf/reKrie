import {PageProps} from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";
import {Head, useForm} from "@inertiajs/react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {ChangeEvent, FormEventHandler, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBasket, faSave} from '@fortawesome/free-solid-svg-icons'
import BtnVoltar from "@/Components/Buttons/BtnVoltar";
import {toast} from "react-toastify";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function Adicionar({auth, materiais}: PageProps<{ materiais: any }>) {
    const {data, setData, post, processing, errors, reset} = useForm({
        nome: '',
        descricao: '',
        situacao: '',
        imagem: '',
        largura: '',
        altura: '',
        comprimento: '',
        peso: '',
        valor: '',
        idMaterial: ''
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
                console.log(data)
                post(route("produtos.create"));

                toast.success('Produto cadastrado com sucesso.');
            } catch (error) {
                toast.success('Não foi possível cadastrar o produto. Por favor, tente novamente.');
            }
        }
    };

    const [value, setValue] = useState<string>('');

    const handleValor = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value.replace(/[^0-9.]/g, '');

        const parsedValue: number = parseFloat(value);

        if (!isNaN(parsedValue)) {
            const formattedValue: string = parsedValue.toLocaleString('en-US', {
                style: 'currency',
                currency: 'BRL',
            });

            setValue(formattedValue);
            setData('valor', value);
        } else {
            setValue('');
            setData('valor', '');
        }
    };

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Produtos</h2>}
        >
            <Head title="Produtos"/>
            <Container className="w-75 mt-4 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg text-center">
                <div className="row mb-4">
                    <div className="w-50 d-flex flex-row ">
                        <FontAwesomeIcon className="mx-sm-2 mt-lg-2 h3" icon={faShoppingBasket}/>
                        <h3 className="my-auto">Adicionar Produto</h3>
                    </div>

                    <div className="w-50 d-flex flex-row-reverse">
                        <BtnVoltar destino={'/produto'} auth={auth}/>
                    </div>
                </div>

                <Form noValidate validated={validated} onSubmit={submit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="nome">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Nome* </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome"
                                onChange={(e) => setData('nome', e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="valor">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Valor</Form.Label>
                            <Form.Control
                                type="text"
                                value={value}
                                onChange={handleValor}
                                placeholder="R$0.00"
                                spellCheck={false}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3" className="justify-end" controlId="situacao">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Situação</Form.Label>
                            <Form.Select
                                onChange={(e) => setData('situacao', e.target.value)}
                                required
                            >
                                <option value='' disabled selected>Selecione a situação</option>
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
                                maxLength={255}
                                placeholder="Descrição"
                                onChange={(e) => setData('descricao', e.target.value)}
                                style={{minHeight: "100px"}}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="imagem">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Imagem (URL)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="URL"
                                onChange={(e) => setData('imagem', e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="3" controlId="largura">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Largura (cm)</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                step="any"
                                placeholder="Largura"
                                onChange={(e) => setData('largura', e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="comprimento">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Comprimento (cm)</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                step="any"
                                placeholder="Comprimento"
                                onChange={(e) => setData('comprimento', e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="altura">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Altura (cm)</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                step="any"
                                placeholder="Altura"
                                onChange={(e) => setData('altura', e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="peso">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Peso (kg)</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                step="any"
                                placeholder="Peso"
                                onChange={(e) => setData('peso', e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="idMaterial">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Material</Form.Label>
                            <Form.Select
                                onChange={(e) => setData('idMaterial', e.target.value)}
                                required
                            >
                                <option value='' disabled selected>Selecione um material</option>
                                {materiais.map((material: any) => (
                                    <option value={material.id}>{material.nome}</option>
                                ))}
                            </Form.Select>
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
        </AuthenticatedLayout>
    );
}
