import React, { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import './ModalEdit.css';

const url = "https://octopus-app-8fgh4.ondigitalocean.app/clientes";

function ModalEditClient(props) {

    const { httpConfig } = useFetch(url);

    const [end, setEndereco] = useState({
        bairro: '',
        cep: '',
        cidade: '',
        complemento: '',
        estado: '',
        logradouro: '',
        numero: ''
    })

    const [pag, setPagamento] = useState({
        dataProximo: '',
        entrada: '',
        formaPagamento: '',
        tipoPagamento: '',
        total: ''
    })

    const [client, setCliente] = useState({
        id: '',
        cpf: '',
        nome: '',
        rg: '',
        telefone: '',
        vendedor: '',
        endereco: end.useState,
        pagamento: pag.useState
    });

    const handleChangeCliente = (event) => {
        const { name, value } = event.target;
        setCliente({
            ...client,
            [name]: value,
        });
    };

    const loadInfo = (info) => {

        setEndereco({
            bairro: info.endereco.bairro,
            cep: info.endereco.cep,
            cidade: info.endereco.cidade,
            complemento: info.endereco.complemento,
            estado: info.endereco.estado,
            logradouro: info.endereco.logradouro,
            numero: info.endereco.numero
        });

        setPagamento({
            dataProximo: info.pagamento.dataProximo,
            entrada: info.pagamento.entrada,
            formaPagamento: info.pagamento.formaPagamento,
            tipoPagamento: info.pagamento.tipoPagamento,
            total: info.pagamento.total
        });

        setCliente({
            id: info.cliente.id,
            cpf: info.cliente.cpf,
            nome: info.cliente.nome,
            rg: info.cliente.rg,
            telefone: info.cliente.telefone,
            vendedor: info.cliente.vendedor
        })
    }

    const handleSubmit = async (event) => {
        httpConfig(client, "PATCH", "editar");
    };

    return (
        <Modal {...props} onShow={() => loadInfo(props)} aria-labelledby="contained-modal-title-vcenter" dialogClassName="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar cliente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    {props.cliente && (
                        <form onSubmit={handleSubmit} class="row gy-2 gx-3 align-items-center">
                            <div class="row gy-2 gx-3 align-items-center">
                                <div class="col-12 mb-3">
                                    <label for="floatingInput">Nome completo</label>
                                    <Form.Control controlId="floatingInput" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="nome"
                                        value={client.nome}
                                        onChange={handleChangeCliente}
                                        required />
                                </div>
                                <div class="col-4 mb-3">
                                    <label for="floatingInput">Cpf</label>
                                    <Form.Control as={InputMask} mask="999.999.999-99" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="cpf"
                                        value={client.cpf}
                                        onChange={handleChangeCliente}
                                        required />
                                </div>
                                <div class="col-4 mb-3">
                                    <label for="floatingInput">RG</label>
                                    <Form.Control as={InputMask} mask="9999999999" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="rg"
                                        value={client.rg}
                                        onChange={handleChangeCliente}
                                        required />
                                </div>
                                <div class="col-4 mb-3">
                                    <label for="floatingInput">Telefone</label>
                                    <Form.Control as={InputMask} mask="(99) 99999-9999" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="telefone"
                                        value={client.telefone}
                                        onChange={handleChangeCliente}
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

export default ModalEditClient