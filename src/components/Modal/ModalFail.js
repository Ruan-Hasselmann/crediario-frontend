import React from 'react';
import './ModalFail.css'; // Importe seu arquivo CSS de estilo aqui
import { Link } from 'react-router-dom';

function ModalFail({ isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2 className='h2Modal'>Erro ao cadastrar cliente!</h2>
        <Link to="/"><button type='button' class="btn btn-danger" onClick={onClose}>Fechar</button></Link>
      </div>
    </div>
  );
}

export default ModalFail;
