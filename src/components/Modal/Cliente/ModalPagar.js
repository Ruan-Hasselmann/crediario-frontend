import React, { useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import './ModalEndereco.css';

const url = "http://localhost:8080/pagamentos/pagamento";

function ModalPagar(props) {

    const { httpConfig } = useFetch(url);

    const [pagar, setPagar] = useState({
        id: '',
        valor: '',
        dataProx: ''
    })

    const handleChangePagar = (event) => {
        const { name, value } = event.target;
        setPagar({
            ...pagar,
            [name]: value,
        });
    }

    const resgistrarPagamento = () => {
        httpConfig(pagar, "POST", "pagar");
    }

    return (
        <Modal {...props} onShow={() => setPagar({id: props.pagamento.id})} aria-labelledby="contained-modal-title-vcenter" dialogClassName="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Registar pagamento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    {props.pagamento && (
                        <>
                            <Row>
                                {/* <Col xs={6} md={4}>
                                    <label>Id pagamento</label>
                                    <Form.Control type='number' class="form-control" id="autoSizingInput floatingInput"
                                        name="id"
                                        value={props.pagamento.id}
                                        onSelect={handleChangePagar}
                                        autoFocus />
                                </Col> */}
                                <Col xs={6} md={4}>
                                    <label>Valor Pago</label>
                                    <Form.Control type='number' class="form-control" id="autoSizingInput floatingInput"
                                        name="valor"
                                        value={pagar.valor}
                                        onChange={handleChangePagar}
                                        required />
                                </Col>
                                <Col xs={6} md={4}>
                                    <label>Data proximo pagamento</label>
                                    <Form.Control type='date' class="form-control" id="autoSizingInput floatingInput"
                                        name="dataProx"
                                        value={pagar.dataProx}
                                        onChange={handleChangePagar} />
                                </Col>
                            </Row>
                        </>
                    )}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancelar</Button>
                <Button className='btn btn-success' onClick={() => resgistrarPagamento()}>Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPagar