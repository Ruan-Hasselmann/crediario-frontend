import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import './ModalEdit.css';
import { useFetchPagamento } from '../../../hooks/useFetchPagamento';

const url = "https://octopus-app-8fgh4.ondigitalocean.app/pagamentos";

function ModalCompra(props) {

    const [modalCompra, setModalCompra] = useState(false);

    const { httpConfig } = useFetchPagamento(url);

    const [pag, setPagamento] = useState({
        id: '',
        dataProximo: '',
        entrada: '',
        formaPagamento: '',
        tipoPagamento: '',
        total: '',
        totalPago: ''
    });

    const loadInfo = (info) => {

        setPagamento({
            id: info.pagamento.id,
            totalPago: info.pagamento.entrada
        });

    };

    const handleChangePagamento = (event) => {
        const { name, value } = event.target;
        setPagamento({
            ...pag,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        httpConfig(pag, "PUT", "editar");
    };

    return (
        <Modal {...props} onShow={() => loadInfo(props)} aria-labelledby="contained-modal-title-vcenter" dialogClassName="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nova Compra
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    <form onSubmit={handleSubmit} class="row gy-2 gx-3 align-items-center">
                        <div class="row gy-2 gx-3 align-items-center">
                            <div class="col-6 mb-3">
                                <label for="floatingInput">Proximo pagamento</label>
                                <Form.Control type='date' class="form-control" id="autoSizingInput floatingInput"
                                    name="dataProximo"
                                    value={pag.dataProximo}
                                    onChange={handleChangePagamento}
                                    required />
                            </div>
                            <div class="col-6 mb-3">
                                <label for="floatingInput">Entrada</label>
                                <Form.Control type='number' class="form-control" id="autoSizingInput floatingInput"
                                    name="entrada"
                                    value={pag.entrada}
                                    onChange={handleChangePagamento}
                                    required />
                            </div>
                            <div class="col-5 mb-3">
                                <label for="autoSizingSelect floatingInput">Forma de pagamento</label>
                                <Form.Select class="form-select" id="autoSizingSelect floatingInput" name="formaPagamento" value={pag.formaPagamento} onChange={handleChangePagamento}>
                                    <option selected>Selecione...</option>
                                    <option>Semanal</option>
                                    <option>Quinzenal</option>
                                    <option>Mensal</option>
                                </Form.Select>
                            </div>
                            <div class="col-5 mb-3">
                                <label for="autoSizingSelect floatingInput">Tipo de pagamento</label>
                                <Form.Select class="form-select" id="autoSizingSelect floatingInput" name="tipoPagamento" value={pag.tipoPagamento} onChange={handleChangePagamento}>
                                    <option selected>Selecione...</option>
                                    <option>Dinheiro</option>
                                    <option>Cartão</option>
                                    <option>Pix</option>
                                </Form.Select>
                            </div>
                            <div class="col-2 mb-3">
                                <label for="floatingInput">Total</label>
                                <Form.Control type='number' class="form-control" id="autoSizingInput floatingInput"
                                    name="total"
                                    value={pag.total}
                                    onChange={handleChangePagamento}
                                    required />
                            </div>
                        </div>
                    </form >
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
                <Button className="btn btn-success" onClick={handleSubmit}>Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCompra