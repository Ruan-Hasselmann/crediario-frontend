import React from 'react';
import './ModalSuccess.css'; // Importe seu arquivo CSS de estilo aqui
import { Link } from 'react-router-dom';

function ModalSuccess({ isOpen, onClose }) {

  const reload = () => {
    setTimeout(function () {
      window.location.reload();
  }, 1);
  }

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content-success">
        <h2 className='h2Modal'>Vendedor cadastrado com sucesso!</h2>
        <div class="d-flex justify-content-around">
            <Link to="/listVendedor"><button type='button' class="btn btn-primary" onClick={onClose}>Listar</button></Link>
            <Link to="/createVendedor"><button type='button' class="btn btn-success" onClick={reload}>Fechar</button></Link>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccess;
