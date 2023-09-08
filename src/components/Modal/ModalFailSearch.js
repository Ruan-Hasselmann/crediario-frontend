import React from 'react';
import './ModalFailSearch.css'; // Importe seu arquivo CSS de estilo aqui
import { Link } from 'react-router-dom';

function ModalFailSearch({ isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2 className='h2Modal'>Erro ao localizar cliente!</h2>
        <button type='button' class="btn btn-danger" onClick={onClose}>Fechar</button>  
      </div>
    </div>
  );
}

export default ModalFailSearch;
