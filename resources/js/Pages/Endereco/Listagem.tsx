import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import {Button, Container, Nav, Table} from "react-bootstrap";
import React, {useState} from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faLocationDot, faPenToSquare, faPlus} from "@fortawesome/free-solid-svg-icons";

export default function Listagem({auth, enderecos}: PageProps<{ enderecos: any }>) {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const registros = enderecos.slice(firstIndex, lastIndex);
    const npage = Math.ceil(enderecos.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    return (
        <GuestLayout user={auth.user}>
            <Head title="Endereços"/>
            <Container className="w-75 mt-4 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg text-center">
                <div className="row mb-4">
                    <div className="w-50 d-flex flex-row ">
                        <FontAwesomeIcon className="mx-sm-2 mt-lg-2 h3" icon={faLocationDot}/>
                        <h3 className="my-auto">Seus Endereços</h3>
                    </div>

                    <div className="w-50 d-flex flex-row-reverse">
                        <div className="btn-group w-25">
                            <Button href="/usuario/endereco/adicionar" variant="success" className="shadow border d-flex justify-content-center align-items-center h-button" style={{background: "#02ad37"}}>
                                <FontAwesomeIcon className="mt-lg-2 h6" style={{marginRight: '10px'}} icon={faPlus}/>
                                Adicionar
                            </Button>
                        </div>
                    </div>
                </div>

                <Table striped hover variant="light" className="mt-3 shadow">
                    <thead>
                    <tr>
                        <th style={{width: "5%", background: '#cecece', borderTopLeftRadius: '5px'}}></th>
                        <th style={{background: '#cecece'}}>Endereço</th>
                        <th style={{width: "10%", background: '#cecece'}}>Número</th>
                        <th style={{width: "15%", background: '#cecece'}}>Cidade</th>
                        <th style={{width: "15%", background: '#cecece'}}>Bairro</th>
                        <th style={{width: "15%", background: '#cecece'}}>Situação</th>
                        <th style={{width: "15%", background: '#cecece', borderTopRightRadius: '5px'}}>Alteração</th>
                    </tr>
                    </thead>

                    <tbody>
                    {registros.map((endereco: any, i: any) => (
                        <tr key={i}>
                            <td className="justify-content-center">
                                <Button href={"/usuario/endereco/editar/" + endereco.id} className="justify-content-center w-100" variant="primary" style={{borderRadius: '3px'}}>
                                    <FontAwesomeIcon className="ml-0.5" icon={faPenToSquare}/>
                                </Button>
                            </td>
                            <td>{endereco.endereco}</td>
                            <td>{endereco.numero}</td>
                            <td>{endereco.uf} - {endereco.cidade}</td>
                            <td>{endereco.bairro}</td>
                            <td>{endereco.situacao ? 'Habilitado' : 'Desabilitado'}</td>
                            <td>{new Date(endereco.updated_at).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                <Nav>
                    <ul className="pagination m-auto">
                        <li className="page-item">
                            {currentPage === numbers[0] ? (
                                <a href="#" className="page-link disabled" onClick={prePage}>
                                    <FontAwesomeIcon className="mx-1" icon={faAngleLeft}/>
                                </a>
                            ) : (
                                <a href="#" className="page-link" onClick={prePage}>
                                    <FontAwesomeIcon className="mx-1" icon={faAngleLeft}/>
                                </a>
                            )}
                        </li>
                        {
                            numbers.map((id, i) => (
                                <li className={`page-item ${currentPage === id ? 'active' : ''}`} key={i}>
                                    <a href="#" className="page-link" onClick={() => changeCPage(id)}>
                                        {id}
                                    </a>
                                </li>
                            ))
                        }
                        <li className="page-item">
                            {currentPage === numbers[numbers.length - 1] ? (
                                <a href="#" className="page-link disabled" onClick={nextPage}>
                                    <FontAwesomeIcon className="mx-1" icon={faAngleRight}/>
                                </a>
                            ) : (
                                <a href="#" className="page-link" onClick={nextPage}>
                                    <FontAwesomeIcon className="mx-1" icon={faAngleRight}/>
                                </a>
                            )}
                        </li>
                    </ul>
                </Nav>
            </Container>
        </GuestLayout>
    );

    function prePage() {
        if (currentPage !== numbers[0]) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage !== numbers[numbers.length - 1]) {
            setCurrentPage(currentPage + 1);
        }
    }

    function changeCPage(id: any) {
        setCurrentPage(id);
    }
}

