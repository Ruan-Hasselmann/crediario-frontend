import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import './ModalEndereco.css';

function ModalEndereco(props) {

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" dialogClassName="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Endereço
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    {props.endereco && (
                        <>
                            <Row>
                                <Col xs={6} md={8}>
                                    <label>Rua</label>
                                    <h5>{props.endereco.logradouro}</h5>
                                </Col>
                                <Col xs={6} md={4}>
                                    <label>Numero</label>
                                    <h5>{props.endereco.numero}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={8}>
                                    <label>Bairro</label>
                                    <h5>{props.endereco.bairro}</h5>
                                </Col>
                                <Col xs={6} md={4}>
                                    <label>Complemento</label>
                                    <h5>{props.endereco.complemento}</h5>
                                </Col>
                            </Row>
                        </>
                    )}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEndereco