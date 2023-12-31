import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useFetchVendedor } from '../hooks/useFetchVendedor';
import ModalEdit from '../components/Modal/Vendedor/ModalEdit';
import './ListAll.css';

const url = "https://octopus-app-8fgh4.ondigitalocean.app/vendedores";

const ListVendedor = () => {

    const { dados: vendedor, httpConfig, loading, error } = useFetchVendedor(url);

    const [modalEditShow, setModalEditShow] = useState(false);
    const [selectedVendedor, setSelectedVendedor] = useState(null);

    const editVend = (vend) => {
        setSelectedVendedor(vend);
        setModalEditShow(true);
    }

    const deleteVend = (id) => {
        httpConfig(id, "DELETE");
    }

    return (
        <div class="container">
            <h2>Listar vendedores</h2>
            {loading && <h2>Carregando dados ...</h2>}
            {error && <h2>{error}</h2>}
            {!error && (
                <Table striped bordered hover variant="dark" className='scroll'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cpf</th>
                            <th>RG</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendedor && vendedor.map((vend) => (
                            <tr>
                                <td>{vend.nome}</td>
                                <td>{vend.cpf}</td>
                                <td>{vend.rg}</td>
                                <td>{vend.telefone}</td>
                                <td>
                                    <div class="d-flex justify-content-around">
                                        <button className='btn btn-secondary' id='actions' onClick={() => editVend(vend)}>Editar</button>
                                        <button className='btn btn-danger' id='actions' onClick={() => deleteVend(vend.id)}>Deletar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        <ModalEdit vendedor={selectedVendedor} show={modalEditShow} onHide={() => setModalEditShow(false)} />
                    </tbody>
                </Table>)}
        </div>
    )
}

export default ListVendedor