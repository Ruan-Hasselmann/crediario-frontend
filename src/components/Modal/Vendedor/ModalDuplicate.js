import React from 'react';
import './ModalFail.css'; // Importe seu arquivo CSS de estilo aqui

function ModalDuplicate({ isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content-fail">
        <h2 className='h2Modal'>Vendedor já cadastrado!</h2>
        <button type='button' class="btn btn-danger" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default ModalDuplicate;
