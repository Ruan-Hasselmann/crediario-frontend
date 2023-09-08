import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import { useFetch } from '../hooks/useFetch';
import ModalFailSearch from '../components/Modal/ModalFailSearch';
import ModalEndereco from '../components/Modal/ModalEndereco';
import ModalPagamento from '../components/Modal/ModalPagamento';
import Button from 'react-bootstrap/Button';
import CreateClient from './CreateClient';
import { Link } from 'react-router-dom';

const url = "http://localhost:8080/clientes";

const ListAll = () => {

  const { dados: clients, httpConfig, loading, error } = useFetch(url);
  const [isModalFailSearchOpen, setIsModalFailSearchOpen] = useState(false);
  const [modalEnderecoShow, setModalEnderecoShow] = useState(false);
  const [modalPagamentoShow, setModalPagamentoShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

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

  const handlePag = async (event) => {

    httpConfig(pagamento.dataProximo, "GET");

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

  const editClient = (cliente) => {
  };

  return (
    <div class="container">
      <h2>Listar clientes</h2>
      <div class="row gy-2 gx-3 align-items-center">
        <div class="col-2 form-floating-sm mb-3">
          <label for="floatingInput">Data pagamento:</label>
        </div>
        <div class="col-2 form-floating-sm mb-3">
          <Form.Control type='date' class="form-control" id="autoSizingInput floatingInput"
            name="dataProximo"
            value={pagamento.dataProximo}
            onChange={handleChangePagamento}
            required />
        </div>
        <div class="col-2 form-floating mb-3">
          <button type='button' class="btn btn-primary" onClick={() => handlePag(pagamento)}>Buscar cliente</button>
          <ModalFailSearch isOpen={isModalFailSearchOpen} onClose={() => setIsModalFailSearchOpen(false)} />
        </div>
        <div class="col-2 form-floating mb-3">
          <button type='button' class="btn btn-primary" onClick={() => refresh()}>Listar todos</button>
        </div>
      </div>
      {loading && <h2>Carregando dados ...</h2>}
      {error && <h2>{error}</h2>}
      {!error && (
        <Table striped bordered hover variant="dark">
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
                    <button className='btn btn-success' id='actions'>Pagar</button>
                    <Link to='/create'><button className='btn btn-primary' id='actions' onClick={() => editClient(cliente)}>Editar</button></Link>
                    <button className='btn btn-danger' id='actions'>Deletar</button>
                  </div>
                </td>
              </tr>
            ))}
            <ModalEndereco endereco={selectedClient} show={modalEnderecoShow} onHide={() => setModalEnderecoShow(false)} />
            <ModalPagamento pagamento={selectedClient} show={modalPagamentoShow} onHide={() => setModalPagamentoShow(false)} />
          </tbody>
        </Table>)}
    </div>
  )
}

export default ListAll