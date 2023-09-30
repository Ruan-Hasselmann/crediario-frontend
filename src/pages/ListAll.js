import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useFetch } from '../hooks/useFetch';
import ModalFailSearch from '../components/Modal/Cliente/ModalFailSearch';
import ModalEndereco from '../components/Modal/Cliente/ModalEndereco';
import ModalPagamento from '../components/Modal/Cliente/ModalPagamento';
import ModalEditClient from '../components/Modal/Cliente/ModalEditClient';
import ModalCompra from '../components/Modal/Cliente/ModalCompra';
import Button from 'react-bootstrap/Button';
import InputMask from 'react-input-mask';
import './ListAll.css';

const url = "http://localhost:8080/clientes";

const ListAll = () => {

  const { dados: clients, httpConfig, loading, error, limpa } = useFetch(url);

  const [isModalFailSearchOpen, setIsModalFailSearchOpen] = useState(false);
  const [modalEnderecoShow, setModalEnderecoShow] = useState(false);
  const [modalPagamentoShow, setModalPagamentoShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalCompra, setModalCompra] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectEndereco, setSelectedEndereco] = useState(null);
  const [selectPagamento, setSelectedPagamento] = useState(null);

  const [pagamento, setPagamento] = useState({
    dataProximo: ''
  });

  const [clientes, setClientes] = useState([{
    cpf: "",
    nome: "",
    rg: "",
    status: "",
    telefone: "",
    vendedor: "",
    endereco: {
      bairro: "",
      cep: "",
      cidade: "",
      complemento: "",
      estado: "",
      logradouro: "",
      numero: ""
    },
    pagamento: {
      dataProximo: "",
      entrada: "",
      formaPagamento: "",
      restante: "",
      tipoPagamento: "",
      total: "",
      totalPago: ""
    }
  }])

  const handleChangePagamento = (event) => {
    const { name, value } = event.target;
    setPagamento({
      [name]: value,
    });
  };

  const handleChangeCpf = (event) => {
    const { name, value } = event.target;
    setClientes({
      [name]: value,
    });
  };

  const handlePag = async () => {

    httpConfig(pagamento.dataProximo, "GET", "data");

  }

  const handleCpf = async () => {

    httpConfig(clientes.cpf, "GET", "cpf");

  }

  function refresh() {
    setTimeout(function () {
      window.location.reload();
    }, 1);
  }

  const detailEndereco = (cliente) => {
    setSelectedClient(cliente);
    setModalEnderecoShow(true);
  };

  const detailPagamento = (cliente) => {
    setSelectedClient(cliente);
    setModalPagamentoShow(true);
  };

  const novaCompra = (cliente) => {
    setSelectedPagamento(cliente.pagamento);
    setModalCompra(true);
  }

  const editClient = (cliente) => {
    setSelectedClient(cliente);
    setSelectedEndereco(cliente.endereco);
    setSelectedPagamento(cliente.pagamento);
    setModalEditShow(true);
  };

  const deleteClient = (id) => {
    httpConfig(id, "DELETE");
  }

  const ativarClient = (id) => {
    httpConfig(id, "PUT", "ativar");
  }

  return (
    <div class="container">
      <h2>Listar clientes</h2>
      <div class="row gy-2 gx-3 align-items-center">
        <div class="col-2 form-floating-sm mb-3">
          <label for="floatingInput" className='labelbusca'>Data pagamento:</label>
        </div>
        <div class="col-2 form-floating-sm mb-3">
          <Form.Control type='date' class="form-control" id="autoSizingInput floatingInput"
            name="dataProximo"
            value={pagamento.dataProximo}
            onChange={handleChangePagamento} />
        </div>
        <div class="col-2 form-floating mb-3">
          <button type='button' class="btn btn-success" onClick={() => handlePag()}>Buscar cliente</button>
          <ModalFailSearch isOpen={isModalFailSearchOpen} onClose={() => setIsModalFailSearchOpen(false)} />
        </div>
        <div class="col-2 form-floating-sm mb-3">
          <label for="floatingInput" className='labelbusca'>Buscar cpf:</label>
        </div>
        <div class="col-2 form-floating-sm mb-3">
          <Form.Control as={InputMask} mask="999.999.999-99" type="text" class="form-control" id="autoSizingInput floatingInput"
            name="cpf"
            value={clientes.cpf}
            onChange={handleChangeCpf}
            placeholder='CPF'
          />
        </div>
        <div class="col-2 form-floating mb-3">
          <button type='button' class="btn btn-success" onClick={() => handleCpf()}>Buscar cliente</button>
          <ModalFailSearch isOpen={isModalFailSearchOpen} onClose={() => setIsModalFailSearchOpen(false)} />
        </div>
        <div class="col-2 form-floating mb-3">
          <button type='button' class="btn btn-info" onClick={() => refresh()}>Listar todos</button>
        </div>
      </div>
      {loading && <h2>Carregando dados ...</h2>}
      {error && <h2>{error}</h2>}
      {!error && (
        <Table striped bordered hover variant="dark" className='scroll'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cpf</th>
              <th>Data Pagamento</th>
              <th>Endereço</th>
              <th>Pagamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients && clients.map((cliente) => (
              <tr>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.pagamento.dataProximo}</td>
                <td>
                  <Button className='btn btn-primary' onClick={() => detailEndereco(cliente.endereco)} >
                    Detalhar
                  </Button>
                </td>
                <td>
                  <Button className='btn btn-primary' onClick={() => detailPagamento(cliente.pagamento)} >
                    Detalhar
                  </Button>
                </td>
                <td>
                  <div class="d-flex justify-content-around">
                    <button className='btn btn-success' id='actions' onClick={() => novaCompra(cliente)}>Nova compra</button>
                    <button className='btn btn-secondary' id='actions' onClick={() => editClient(cliente)}>Editar</button>
                    {cliente.status && (
                      <button className='btn btn-danger' id='actions' onClick={() => deleteClient(cliente.id)}>Deletar</button>
                    )}
                    {!cliente.status && (
                      <button className='btn btn-success' id='actions' onClick={() => ativarClient(cliente.id)}>Ativar</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            <ModalEndereco endereco={selectedClient} show={modalEnderecoShow} onHide={() => setModalEnderecoShow(false)} />
            <ModalPagamento pagamento={selectedClient} show={modalPagamentoShow} onHide={() => setModalPagamentoShow(false)} />
            <ModalCompra pagamento={selectPagamento} show={modalCompra} onHide={() => setModalCompra(false)} />
            <ModalEditClient cliente={selectedClient} endereco={selectEndereco} pagamento={selectPagamento} show={modalEditShow} onHide={() => setModalEditShow(false)} />
          </tbody>
        </Table>)}
    </div>
  )
}

export default ListAll