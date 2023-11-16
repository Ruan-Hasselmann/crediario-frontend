import React, { useState } from 'react';
import { useFetchEndereco } from '../../../hooks/useFetchEndereco';
import { Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import './ModalEdit.css';

const url = "https://octopus-app-8fgh4.ondigitalocean.app/enderecos";

function ModalEditEndereco(props) {

    const { httpConfig } = useFetchEndereco(url);

    const [end, setEndereco] = useState({
        id: '',
        bairro: '',
        cep: '',
        cidade: '',
        complemento: '',
        estado: '',
        logradouro: '',
        numero: ''
    });

    const handleChangeEndereco = (event) => {
        const { name, value } = event.target;
        setEndereco({
            ...end,
            [name]: value,
        });
    };

    const loadInfo = (info) => {

        setEndereco({
            id: info.endereco.id,
            bairro: info.endereco.bairro,
            cep: info.endereco.cep,
            cidade: info.endereco.cidade,
            complemento: info.endereco.complemento,
            estado: info.endereco.estado,
            logradouro: info.endereco.logradouro,
            numero: info.endereco.numero
        });

    };

    const handleCep = () => {
        let cep = `http://viacep.com.br/ws/${end.cep}/json/`;
        const fetchData = async () => {

            const res = await fetch(cep);
            const json = await res.json();
            setEndereco({ ...end, logradouro: json.logradouro, bairro: json.bairro, cidade: json.localidade, estado: json.uf });
        }

        fetchData();
    }

    const handleSubmit = async (event) => {
        httpConfig(end, "PUT", "editar");
    };

    return (
        <Modal {...props} onShow={() => loadInfo(props)} aria-labelledby="contained-modal-title-vcenter" dialogClassName="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar endereço
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    {props.endereco && (
                        <form onSubmit={handleSubmit} class="row gy-2 gx-3 align-items-center">
                            <div class="row gy-2 gx-3 align-items-center">
                                <label for="floatingInput">Cep</label>
                                <div class="col-9 mb-3">
                                    <Form.Control as={InputMask} mask="99999-999" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="cep"
                                        value={end.cep}
                                        onChange={handleChangeEndereco}
                                        required />
                                </div>
                                <div class="col-3 mb-4">
                                    <button type='button' class="btn btn-primary" onClick={() => handleCep()}>BUSCAR CEP</button>
                                </div>
                                <div class="col-9 mb-3">
                                    <label for="floatingInput">Logradouro</label>
                                    <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="logradouro"
                                        value={end.logradouro}
                                        onChange={handleChangeEndereco}
                                        required />
                                </div>
                                <div class="col-3 mb-3">
                                    <label for="floatingInput">Nº</label>
                                    <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="numero"
                                        value={end.numero}
                                        onChange={handleChangeEndereco}
                                        required />
                                </div>
                                <div class="col-5 mb-3">
                                    <label for="floatingInput">Bairro</label>
                                    <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="bairro"
                                        value={end.bairro}
                                        onChange={handleChangeEndereco}
                                        required />
                                </div>
                                <div class="col-5 mb-3">
                                    <label for="floatingInput">Cidade</label>
                                    <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="cidade"
                                        value={end.cidade}
                                        onChange={handleChangeEndereco}
                                        required />
                                </div>
                                <div class="col-2 mb-3">
                                    <label for="floatingInput">UF</label>
                                    <Form.Control as={InputMask} mask="aa" type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="estado"
                                        value={end.estado}
                                        onChange={handleChangeEndereco}
                                        required />
                                </div>
                                <div class="col-12 mb-3">
                                    <label for="floatingInput">Complemento</label>
                                    <Form.Control type="text" class="form-control" id="autoSizingInput floatingInput"
                                        name="complemento"
                                        value={end.complemento}
                                        onChange={handleChangeEndereco}
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

export default ModalEditEndereco