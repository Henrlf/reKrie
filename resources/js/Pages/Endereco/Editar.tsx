import {PageProps} from "@/types";
import {Head, useForm} from "@inertiajs/react";
import React, {FormEventHandler, useState} from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faSave} from "@fortawesome/free-solid-svg-icons";
import BtnVoltar from "@/Components/Buttons/BtnVoltar";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

export default function Editar({auth, endereco}: PageProps<{ endereco: any }>) {
    const {data, setData, put, processing, errors, reset} = useForm({
        id: endereco.id,
        endereco: endereco.endereco,
        numero: endereco.numero,
        complemento: endereco.endereco,
        uf: endereco.uf,
        cidade: endereco.cidade,
        bairro: endereco.bairro,
        cep: endereco.cep,
        situacao: endereco.situacao
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
                put(route("endereco.update"));

                toast.success('Endereço atualizado com sucesso.');
            } catch (error) {
                toast.success('Não foi possível atualizar o endereço. Por favor, tente novamente.');
            }
        }
    };

    return (
        <GuestLayout user={auth.user}>
            <Head title="Endereços"/>
            <Container className="w-75 my-4 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg text-center">
                <div className="row mb-4">
                    <div className="w-50 d-flex flex-row ">
                        <FontAwesomeIcon className="mx-sm-2 mt-lg-2 h3" icon={faLocationDot}/>
                        <h3 className="my-auto">Editar Endereço</h3>
                    </div>

                    <div className="w-50 d-flex flex-row-reverse">
                        <BtnVoltar destino={'/usuario/endereco'} auth={auth}/>
                    </div>
                </div>

                <Form noValidate validated={validated} onSubmit={submit}>
                    {/*endereco*/}
                    {/*situacao*/}
                    <Row className="mb-3">
                        <Form.Group as={Col} md="9" controlId="endereco">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Endereço*</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Endereço"
                                defaultValue={endereco.endereco}
                                onChange={(e) => setData('endereco', e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3" className="justify-end" controlId="situacao">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Situação</Form.Label>
                            <Form.Select
                                onChange={(e) => setData('situacao', e.target.value)}
                                defaultValue={endereco.situacao}
                                required
                            >
                                <option value='1'>Habilitado</option>
                                <option value='0'>Desabilitado</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    {/*complemento*/}
                    {/*numero*/}
                    <Row className="mb-3">
                        <Form.Group as={Col} md="9" controlId="complemento">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Complemento</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Complemento"
                                defaultValue={endereco.complemento}
                                onChange={(e) => setData('complemento', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3" className="justify-end" controlId="numero">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Número*</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="number"
                                placeholder="Número"
                                defaultValue={endereco.numero}
                                onChange={(e) => setData('numero', e.target.value)}
                                min={0}
                                required
                            />
                        </Form.Group>
                    </Row>

                    {/*uf*/}
                    {/*cidade*/}
                    {/*bairro*/}
                    {/*cep*/}
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3" controlId="uf">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Estado</Form.Label>
                            <Form.Select
                                onChange={(e) => setData('uf', e.target.value)}
                                defaultValue={endereco.uf}
                                required
                            >
                                <option disabled value=''>Selecione um estado</option>
                                <option value='AC'>Acre</option>
                                <option value='AL'>Alagoas</option>
                                <option value='AP'>Amapá</option>
                                <option value='AM'>Amazonas</option>
                                <option value='BA'>Bahia</option>
                                <option value='CE'>Ceará</option>
                                <option value='DF'>Distrito Federal</option>
                                <option value='ES'>Espírito Santo</option>
                                <option value='GO'>Goiás</option>
                                <option value='MA'>Maranhão</option>
                                <option value='MT'>Mato Grosso</option>
                                <option value='MS'>Mato Grosso do Sul</option>
                                <option value='MG'>Minas Gerais</option>
                                <option value='PA'>Pará</option>
                                <option value='PB'>Paraíba</option>
                                <option value='PR'>Paraná</option>
                                <option value='PE'>Pernambuco</option>
                                <option value='PI'>Piauí</option>
                                <option value='RJ'>Rio de Janeiro</option>
                                <option value='RN'>Rio Grande do Norte</option>
                                <option value='RS'>Rio Grande do Sul</option>
                                <option value='RO'>Rondônia</option>
                                <option value='RR'>Roraima</option>
                                <option value='SC'>Santa Catarina</option>
                                <option value='SP'>São Paulo</option>
                                <option value='SE'>Sergipe</option>
                                <option value='TO'>Tocantins</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="cidade">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Cidade*</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Cidade"
                                defaultValue={endereco.cidade}
                                required
                                onChange={(e) => setData('cidade', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="bairro">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>Bairro*</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Bairro"
                                defaultValue={endereco.bairro}
                                required
                                onChange={(e) => setData('bairro', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="cep">
                            <Form.Label style={{display: "flex", marginLeft: "7px"}}>CEP*</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="CEP"
                                defaultValue={endereco.cep}
                                required
                                onChange={(e) => setData('cep', e.target.value)}
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
