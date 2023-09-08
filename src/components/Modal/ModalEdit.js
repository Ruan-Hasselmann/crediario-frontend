import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import './ModalEdit.css';

function ModalEdit(props) {

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
                        <>
                            {/* <Row>
                                <Col xs={6} md={4}>
                                    <label>Total pago</label>
                                    <h5>R$ {props.pagamento.totalPago}</h5>
                                </Col>
                                <Col xs={6} md={4}>
                                    <label>Restante</label>
                                    <h5>R$ {props.pagamento.restante}</h5>
                                </Col>
                                <Col xs={6} md={4}>
                                    <label>Total</label>
                                    <h5>R$ {props.pagamento.total}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={8}>
                                    <label>Forma de pagamento</label>
                                    <h5>{props.pagamento.formaPagamento}</h5>
                                </Col>
                                <Col xs={6} md={4}>
                                    <label>Tipo pagamento</label>
                                    <h5>{props.pagamento.tipoPagamento}</h5>
                                </Col>
                            </Row> */}
                        </>
                    )}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEdit