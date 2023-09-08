import React from 'react';
import './ModalSuccess.css'; // Importe seu arquivo CSS de estilo aqui
import { Link } from 'react-router-dom';

function ModalSuccess({ isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2 className='h2Modal'>Cliente cadastrado com sucesso!</h2>
        <div class="d-flex justify-content-around">
            <Link to="/list"><button type='button' class="btn btn-primary" onClick={onClose}>Listar</button></Link>
            <Link to="/create"><button type='button' class="btn btn-success" onClick={onClose}>Fechar</button></Link>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccess;
