import React, { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import './ModalEdit.css';

const url = "http://localhost:8080/clientes";

function ModalEdit(props) {

    const { httpConfig, loading, error, limpa,
        isModalSuccessOpen, setIsModalSuccessOpen,
        isModalFailOpen, setIsModalFailOpen,
        isModalDuplicateOpen, setIsModalDuplicateOpen
    } = useFetch(url);

    const [endereco, setEndereco] = useState({
        bairro: '',
        cep: '',
        cidade: '',
        complemento: '',
        estado: '',
        logradouro: '',
        numero: ''
    })

    const [pagamento, setPagamento] = useState({
        dataProximo: '',
        entrada: '',
        formaPagamento: '',
        tipoPagamento: '',
        total: ''
    })

    const [cliente, setCliente] = useState({
        cpf: '',
        nome: '',
        rg: '',
        telefone: '',
        vendedor: '',
        endereco: endereco.useState,
        pagamento: pagamento.useState
    });

    const handleChangeCliente = (event) => {
        const { name, value } = event.target;
        setCliente({
            ...cliente,
            [name]: value,
        });
    };

    const handleChangeEndereco = (event) => {
        const { name, value } = event.target;
        setEndereco({
            ...endereco,
            [name]: value,
        });
    };

    const handleChangePagamento = (event) => {
        const { name, value } = event.target;
        setPagamento({
            ...pagamento,
            [name]: value,
        });
    };

    const handleCep = () => {
        let cep = `http://viacep.com.br/ws/${endereco.cep}/json/`;
        const fetchData = async () => {

            const res = await fetch(cep);
            const json = await res.json();
            setEndereco({ ...endereco, logradouro: json.logradouro, bairro: json.bairro, cidade: json.localidade, estado: json.uf });
        }

        fetchData();
    }

    const handleSubmit = async (event) => {
        // event.preventDefault();

        // const client = {
        //     cpf: cliente.cpf,
        //     nome: cliente.nome,
        //     rg: cliente.rg,
        //     telefone: cliente.telefone,
        //     vendedor: cliente.vendedor,
        //     endereco: endereco,
        //     pagamento: pagamento
        // }

        // httpConfig(client, "POST", "criar");

        // if (limpa) {
        //     clear();
        // }

    };

    const clear = () => {
        // Limpar o formulário após o envio
        setCliente({
            cpf: '',
            nome: '',
            rg: '',
            telefone: '',
            vendedor: '',
        });
        setEndereco({
            bairro: '',
            cep: '',
            cidade: '',
            complemento: '',
            estado: '',
            logradouro: '',
            numero: '',
        });
        setPagamento({
            dataProximo: '',
            entrada: '',
            formaPagamento: '',
            tipoPagamento: '',
            total: '',
        });
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" dialogClassName="modal-lg">
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
                                <div class="col-2 form-floating mb-3">
                                    <Form.Control controlId="floatingInput" type="number" class="form-control" id="autoSizingInput floatingInput"
                                        name="id"
                                        value={props.cliente.id}
                                        onSelect={handleChangeCliente}
                                        autoFocus />
                                    <label for="floatingInput">Id Cliente</label>
                                </div>
                                <div class="col-10 form-floating mb-3">
                                    <Form.Control controlId="floatingInput" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="nome"
                                        value={props.cliente.nome}
                                        onChange={handleChangeCliente}
                                        required />
                                    <label for="floatingInput">Nome completo</label>
                                </div>
                                <div class="col-4 form-floating mb-3">
                                    <Form.Control as={InputMask} mask="999.999.999-99" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="cpf"
                                        value={props.cliente.cpf}
                                        onChange={handleChangeCliente}
                                        required />
                                    <label for="floatingInput">Cpf</label>
                                </div>
                                <div class="col-4 form-floating mb-3">
                                    <Form.Control as={InputMask} mask="9999999999" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="rg"
                                        value={props.cliente.rg}
                                        onChange={handleChangeCliente}
                                        required />
                                    <label for="floatingInput">RG</label>
                                </div>
                                <div class="col-4 form-floating mb-3">
                                    <Form.Control as={InputMask} mask="(99) 99999-9999" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="telefone"
                                        value={props.cliente.telefone}
                                        onChange={handleChangeCliente}
                                        required />
                                    <label for="floatingInput">Telefone</label>
                                </div>
                                <div class="col-5 form-floating mb-3">
                                    <Form.Select class="form-select" id="autoSizingSelect floatingInput" name="vendedor" value={props.cliente.vendedor} onChange={handleChangeCliente}>
                                        <option>Carlos</option>
                                        <option>João</option>
                                        <option>Pedro</option>
                                    </Form.Select>
                                    <label for="autoSizingSelect floatingInput">Vendedor</label>
                                </div>
                                <div class="col-5 form-floating mb-3">
                                    <Form.Control as={InputMask} mask="99999-999" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="cep"
                                        value={props.endereco.cep}
                                        onChange={handleChangeEndereco}
                                        required />
                                    <label for="floatingInput">Cep</label>
                                </div>
                                <div class="col-2 form-floating mb-3">
                                    <button type='button' class="btn btn-primary" onClick={() => handleCep(endereco.cep)}>BUSCAR CEP</button>
                                </div>
                                <div class="col-9 form-floating mb-3">
                                    <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="logradouro"
                                        value={props.endereco.logradouro}
                                        onChange={handleChangeEndereco}
                                        required />
                                    <label for="floatingInput">Logradouro</label>
                                </div>
                                <div class="col-3 form-floating mb-3">
                                    <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="numero"
                                        value={props.endereco.numero}
                                        onChange={handleChangeEndereco}
                                        required />
                                    <label for="floatingInput">Nº</label>
                                </div>

                                <div class="col-5 form-floating mb-3">
                                    <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="bairro"
                                        value={props.endereco.bairro}
                                        onChange={handleChangeEndereco}
                                        required />
                                    <label for="floatingInput">Bairro</label>
                                </div>
                                <div class="col-5 form-floating mb-3">
                                    <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="cidade"
                                        value={props.endereco.cidade}
                                        onChange={handleChangeEndereco}
                                        required />
                                    <label for="floatingInput">Cidade</label>
                                </div>
                                <div class="col-2 form-floating mb-3">
                                    <Form.Control as={InputMask} mask="aa" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="estado"
                                        value={props.endereco.estado}
                                        onChange={handleChangeEndereco}
                                        required />
                                    <label for="floatingInput">UF</label>
                                </div>

                                <div class="col-12 form-floating mb-3">
                                    <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="complemento"
                                        value={props.endereco.complemento}
                                        onChange={handleChangeEndereco}
                                        required />
                                    <label for="floatingInput">Complemento</label>
                                </div>
                                <div class="col-4 form-floating mb-3">
                                    <Form.Control type='date' class="form-control" id="autoSizingInput floatingInput"
                                        name="dataProximo"
                                        value={props.pagamento.dataProximo}
                                        onChange={handleChangePagamento}
                                        required />
                                    <label for="floatingInput">Proximo pagamento</label>
                                </div>
                                <div class="col-4 form-floating mb-3">
                                    <Form.Control type='number' class="form-control" id="autoSizingInput floatingInput"
                                        name="entrada"
                                        value={props.pagamento.entrada}
                                        onChange={handleChangePagamento}
                                        required />
                                    <label for="floatingInput">Entrada</label>
                                </div>
                                <div class="col-4 form-floating mb-3">
                                    <Form.Select class="form-select" id="autoSizingSelect floatingInput" name="formaPagamento" value={props.pagamento.formaPagamento} onChange={handleChangePagamento}>
                                        <option>Semanal</option>
                                        <option>Quinzenal</option>
                                        <option>Mensal</option>
                                    </Form.Select>
                                    <label for="autoSizingSelect floatingInput">Forma de pagamento</label>
                                </div>
                                <div class="col-6 form-floating mb-3">
                                    <Form.Select class="form-select" id="autoSizingSelect floatingInput" name="tipoPagamento" value={props.pagamento.tipoPagamento} onChange={handleChangePagamento}>
                                        <option>Dinheiro</option>
                                        <option>Cartão</option>
                                        <option>Pix</option>
                                    </Form.Select>
                                    <label for="autoSizingSelect floatingInput">Tipo de pagamento</label>
                                </div>
                                <div class="col-6 form-floating mb-3">
                                    <Form.Control type='number' class="form-control" id="autoSizingInput floatingInput"
                                        name="total"
                                        value={props.pagamento.total}
                                        onChange={handleChangePagamento}
                                        required />
                                    <label for="floatingInput">Total</label>
                                </div>
                            </div>
                            {/* <div class="row-10">
                                <button type="submit" class="btn btn-primary">Cadastrar</button>
                            </div> */}
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