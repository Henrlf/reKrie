import {PageProps} from "@/types";
import GuestLayout from "@/Layouts/GuestLayout";
import {Head} from "@inertiajs/react";
import {Button, Container, Nav, Table} from "react-bootstrap";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faHandshake, faPlus, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'

export default function Listagem({auth, orcamentos}: PageProps<{ orcamentos: any }>) {

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const registros = orcamentos.slice(firstIndex, lastIndex);
    const npage = Math.ceil(orcamentos.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    return (
        <GuestLayout user={auth.user}>
            <Head title="Orçamentos"/>
            <Container className="w-75 my-4 py-3 bg-white shadow-md overflow-hidden sm:rounded-lg text-center">
                <div className="row mb-4">
                    <div className="w-50 d-flex flex-row ">
                        <FontAwesomeIcon className="mx-sm-2 mt-lg-2 h3" icon={faHandshake}/>
                        <h3 className="my-auto">Meus orçamentos</h3>
                    </div>

                    <div className="w-50 d-flex flex-row-reverse">
                        <div className="btn-group">
                            <Button href="/orcamento/adicionar" variant="success" className="shadow border d-flex justify-content-center align-items-center h-button" style={{background: "#02ad37"}}>
                                <FontAwesomeIcon className="mt-lg-2 h6" style={{marginRight: '10px'}} icon={faPlus}/>
                                Realizar orçamento
                            </Button>
                        </div>
                    </div>
                </div>

                <Table striped hover variant="light" className="mt-3 shadow">
                    <thead>
                    <tr>
                        <th className='table-header-bg w-5' style={{borderTopLeftRadius: '5px'}}></th>
                        <th className='table-header-bg'>Descrição</th>
                        <th className='table-header-bg w-10'>Valor</th>
                        <th className='table-header-bg w-20'>Situação</th>
                        <th className='table-header-bg w-15' style={{borderTopRightRadius: '5px'}}>Data do orçamento</th>
                    </tr>
                    </thead>

                    <tbody>
                    {registros.map((orcamento: any, i: any) => (
                        <tr key={i}>
                            <td className="justify-content-center">
                                <Button href={"/orcamento/editar/" + orcamento.id} className="justify-content-center w-100" variant="primary" style={{borderRadius: '3px'}}>
                                    <FontAwesomeIcon className="ml-0.5" icon={faEye}/>
                                </Button>
                            </td>
                            <td>{orcamento.descricao}</td>
                            <td>{'R$ ' + orcamento.valor.toFixed(2)}</td>
                            <td>{orcamento.situacaoDescription}</td>
                            <td>{new Date(orcamento.created_at).toLocaleDateString()}</td>
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
