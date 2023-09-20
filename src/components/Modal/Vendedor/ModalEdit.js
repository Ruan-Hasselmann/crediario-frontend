import React, { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import './ModalEdit.css';

const url = "http://localhost:8080/vendedores";

function ModalEdit(props) {

    const { httpConfig } = useFetch(url);

    const [vend, setVend] = useState({
        id: '',
        cpf: '',
        nome: '',
        rg: '',
        telefone: ''
    });

    const handleChangeVendedor = (event) => {
        const { name, value } = event.target;
        setVend({
            ...vend,
            [name]: value,
        });
    };

    const loadInfo = (info) => {

        setVend({
            id: info.vendedor.id,
            cpf: info.vendedor.cpf,
            nome: info.vendedor.nome,
            rg: info.vendedor.rg,
            telefone: info.vendedor.telefone
        })
    }

    const handleSubmit = async (event) => {
        httpConfig(vend, "PUT", "editar");
    };

    return (
        <Modal {...props} onShow={() => loadInfo(props)} aria-labelledby="contained-modal-title-vcenter" dialogClassName="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar vendedor
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    {props.vendedor && (
                        <form onSubmit={handleSubmit} class="row gy-2 gx-3 align-items-center">
                            <div class="row gy-2 gx-3 align-items-center">
                                <div class="col-12 mb-3">
                                    <label for="floatingInput">Nome completo</label>
                                    <Form.Control controlId="floatingInput" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="nome"
                                        value={vend.nome}
                                        onChange={handleChangeVendedor}
                                        required />
                                </div>
                                <div class="col-4 mb-3">
                                    <label for="floatingInput">Cpf</label>
                                    <Form.Control as={InputMask} mask="999.999.999-99" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="cpf"
                                        value={vend.cpf}
                                        onChange={handleChangeVendedor}
                                        required />
                                </div>
                                <div class="col-4 mb-3">
                                    <label for="floatingInput">RG</label>
                                    <Form.Control as={InputMask} mask="9999999999" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="rg"
                                        value={vend.rg}
                                        onChange={handleChangeVendedor}
                                        required />
                                </div>
                                <div class="col-4 mb-3">
                                    <label for="floatingInput">Telefone</label>
                                    <Form.Control as={InputMask} mask="(99) 99999-9999" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="telefone"
                                        value={vend.telefone}
                                        onChange={handleChangeVendedor}
                                        required />
                                </div>
                            </div>
                        </form >
                    )}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
                <Button className='btn btn-success' onClick={() => handleSubmit()}>Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEdit