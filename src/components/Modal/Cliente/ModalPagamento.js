import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import './ModalEndereco.css';
import ModalPagar from './ModalPagar';

function ModalEndereco(props) {

    const [modalPagarShow, setModalPagarShow] = useState(false);

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" dialogClassName="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Pagamento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    {props.pagamento && (
                        <>
                            <Row>
                                <Col xs={4} md={4}>
                                    <label>Restante</label>
                                    <h5>R$ {props.pagamento.restante}</h5>
                                </Col>
                                <Col xs={4} md={4}>
                                    <label>Total</label>
                                    <h5>R$ {props.pagamento.total}</h5>
                                </Col>
                                <Col xs={4} md={4}>
                                    <label>Total pago</label>
                                    <h5>R$ {props.pagamento.totalPago}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} md={4}>
                                    <label>Forma de pagamento</label>
                                    <h5>{props.pagamento.formaPagamento}</h5>
                                </Col>
                                <Col xs={4} md={4}>
                                    <label>Data pagamento</label>
                                    <h5>{props.pagamento.dataProximo}</h5>
                                </Col>
                                <Col xs={4} md={4}>
                                    <label>Tipo pagamento</label>
                                    <h5>{props.pagamento.tipoPagamento}</h5>
                                </Col>
                            </Row>
                        </>
                    )}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
                <Button className='btn btn-success' onClick={() => setModalPagarShow(true)}>Pagar</Button>
                <ModalPagar pagamento={props.pagamento} show={modalPagarShow} onHide={() => setModalPagarShow(false)} />
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEndereco