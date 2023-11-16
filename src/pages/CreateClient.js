import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useFetchVendedor } from '../hooks/useFetchVendedor';
import './CreateClient.css';
import InputMask from 'react-input-mask';
import Form from 'react-bootstrap/Form';
import ModalSuccess from '../components/Modal/Cliente/ModalSuccess';
import ModalFail from '../components/Modal/Cliente/ModalFail';
import ModalDuplicate from '../components/Modal/Cliente/ModalDuplicate';

const url = "https://octopus-app-8fgh4.ondigitalocean.app/clientes";
const urlVendedor = "https://octopus-app-8fgh4.ondigitalocean.app/vendedores";

function CreateClient() {

    const { httpConfig, loading, error, limpa,
        isModalSuccessOpen, setIsModalSuccessOpen,
        isModalFailOpen, setIsModalFailOpen,
        isModalDuplicateOpen, setIsModalDuplicateOpen
    } = useFetch(url);

    const { dados: vend } = useFetchVendedor(urlVendedor);

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
        event.preventDefault();

        const client = {
            cpf: cliente.cpf,
            nome: cliente.nome,
            rg: cliente.rg,
            telefone: cliente.telefone,
            vendedor: cliente.vendedor,
            endereco: endereco,
            pagamento: pagamento
        }

        httpConfig(client, "POST", "criar");

        if (limpa) {
            clear();
        }

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
        <div className={`container ${isModalSuccessOpen ? 'modal-open' : ''} ${isModalFailOpen ? 'modal-open' : ''}`}>
            <h2>Cadastro de Cliente</h2>
            {loading && <h2>Carregando dados ...</h2>}
            {!loading && (
                <form onSubmit={handleSubmit} class="row gy-2 gx-3 align-items-center">
                    <div class="row gy-2 gx-3 align-items-center">
                        <div class="col-12 form-floating mb-3">
                            <Form.Control controlId="floatingInput" type="text" class="form-control" id="autoSizingInput floatingInput"
                                name="nome"
                                value={cliente.nome}
                                onChange={handleChangeCliente}
                                required />
                            <label for="floatingInput">Nome completo</label>
                        </div>
                        <div class="col-4 form-floating mb-3">
                            <Form.Control as={InputMask} mask="999.999.999-99" type="text" class="form-control" id="autoSizingInput floatingInput"
                                name="cpf"
                                value={cliente.cpf}
                                onChange={handleChangeCliente}
                                required />
                            <label for="floatingInput">Cpf</label>
                        </div>
                        <div class="col-4 form-floating mb-3">
                            <Form.Control as={InputMask} mask="9999999999" type="text" class="form-control" id="autoSizingInput floatingInput"
                                name="rg"
                                value={cliente.rg}
                                onChange={handleChangeCliente}
                                required />
                            <label for="floatingInput">RG</label>
                        </div>
                        <div class="col-4 form-floating mb-3">
                            <Form.Control as={InputMask} mask="(99) 99999-9999" type="text" class="form-control" id="autoSizingInput floatingInput"
                                name="telefone"
                                value={cliente.telefone}
                                onChange={handleChangeCliente}
                                required />
                            <label for="floatingInput">Telefone</label>
                        </div>
                        <div class="col-5 form-floating mb-3">
                            <Form.Select class="form-select" id="autoSizingSelect floatingInput" name="vendedor" value={cliente.vendedor} onChange={handleChangeCliente}>
                                <option selected>Selecione...</option>
                                {/* <option>Carlos</option>
                                <option>João</option>
                                <option>Pedro</option> */}
                                {vend && vend.map((vende) => (
                                    <option>{vende.nome}</option>
                                ))}
                            </Form.Select>
                            <label for="autoSizingSelect floatingInput">Vendedor</label>
                        </div>
                        <div class="col-5 form-floating mb-3">
                            <Form.Control as={InputMask} mask="99999-999" type="text" class="form-control" id="autoSizingInput floatingInput"
                                name="cep"
                                value={endereco.cep}
                                onChange={handleChangeEndereco}
                                required />
                            <label for="floatingInput">Cep</label>
                        </div>
                        <div class="col-2 form-floating mb-3">
                            <button type='button' class="btn btn-primary" onClick={() => handleCep()}>BUSCAR CEP</button>
                        </div>
                        <div class="col-9 form-floating mb-3">
                            <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                name="logradouro"
                                value={endereco.logradouro}
                                onChange={handleChangeEndereco}
                                required />
                            <label for="floatingInput">Logradouro</label>
                        </div>
                        <div class="col-3 form-floating mb-3">
                            <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                name="numero"
                                value={endereco.numero}
                                onChange={handleChangeEndereco}
                                required />
                            <label for="floatingInput">Nº</label>
                        </div>

                        <div class="col-5 form-floating mb-3">
                            <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                name="bairro"
                                value={endereco.bairro}
                                onChange={handleChangeEndereco}
                                required />
                            <label for="floatingInput">Bairro</label>
                        </div>
                        <div class="col-5 form-floating mb-3">
                            <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                name="cidade"
                                value={endereco.cidade}
                                onChange={handleChangeEndereco}
                                required />
                            <label for="floatingInput">Cidade</label>
                        </div>
                        <div class="col-2 form-floating mb-3">
                            <Form.Control as={InputMask} mask="aa" type="text" class="form-control" id="autoSizingInput floatingInput"
                                name="estado"
                                value={endereco.estado}
                                onChange={handleChangeEndereco}
                                required />
                            <label for="floatingInput">UF</label>
                        </div>

                        <div class="col-12 form-floating mb-3">
                            <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                name="complemento"
                                value={endereco.complemento}
                                onChange={handleChangeEndereco}
                                required />
                            <label for="floatingInput">Complemento</label>
                        </div>
                        <div class="col-4 form-floating mb-3">
                            <Form.Control type='date' class="form-control" id="autoSizingInput floatingInput"
                                name="dataProximo"
                                value={pagamento.dataProximo}
                                onChange={handleChangePagamento}
                                required />
                            <label for="floatingInput">Proximo pagamento</label>
                        </div>
                        <div class="col-4 form-floating mb-3">
                            <Form.Control type='number' class="form-control" id="autoSizingInput floatingInput"
                                name="entrada"
                                value={pagamento.entrada}
                                onChange={handleChangePagamento}
                                required />
                            <label for="floatingInput">Entrada</label>
                        </div>
                        <div class="col-4 form-floating mb-3">
                            <Form.Select class="form-select" id="autoSizingSelect floatingInput" name="formaPagamento" value={pagamento.formaPagamento} onChange={handleChangePagamento}>
                                <option selected>Selecione...</option>
                                <option>Semanal</option>
                                <option>Quinzenal</option>
                                <option>Mensal</option>
                            </Form.Select>
                            <label for="autoSizingSelect floatingInput">Forma de pagamento</label>
                        </div>
                        <div class="col-6 form-floating mb-3">
                            <Form.Select class="form-select" id="autoSizingSelect floatingInput" name="tipoPagamento" value={pagamento.tipoPagamento} onChange={handleChangePagamento}>
                                <option selected>Selecione...</option>
                                <option>Dinheiro</option>
                                <option>Cartão</option>
                                <option>Pix</option>
                            </Form.Select>
                            <label for="autoSizingSelect floatingInput">Tipo de pagamento</label>
                        </div>
                        <div class="col-6 form-floating mb-3">
                            <Form.Control type='number' class="form-control" id="autoSizingInput floatingInput"
                                name="total"
                                value={pagamento.total}
                                onChange={handleChangePagamento}
                                required />
                            <label for="floatingInput">Total</label>
                        </div>
                    </div>
                    <div class="row-10">
                        <button type="submit" class="btn btn-primary">Cadastrar</button>
                    </div>
                    <ModalSuccess isOpen={isModalSuccessOpen} onClose={() => setIsModalSuccessOpen(false)} />
                    <ModalFail isOpen={isModalFailOpen} onClose={() => setIsModalFailOpen(false)} />
                    <ModalDuplicate isOpen={isModalDuplicateOpen} onClose={() => setIsModalDuplicateOpen(false)} />
                </form >
            )}
        </div >
    );
}

export default CreateClient;