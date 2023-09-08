import React, { useState } from 'react';
import './Sidebar.css';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap';

function Sidebar() {
    const [dropdownOpenCliete, setDropdownOpenCliente] = useState(false);
    const [dropdownOpenVendedor, setDropdownOpenVendedor] = useState(false);

    const toggleDropdownCliente = () => {
        setDropdownOpenCliente(!dropdownOpenCliete);
    };

    const toggleDropdownVendedor = () => {
        setDropdownOpenVendedor(!dropdownOpenVendedor);
    };

    return (
        <nav id="sidebar" className={`shadow ${dropdownOpenCliete ? 'expanded' : ''}`}>
            <div className="sidebar-header">
                <a href='/'><img src='./logo.jpeg' alt="Meu Crediário" /></a>
            </div>
            <ButtonGroup id='buttonGroup'>
                <Dropdown show={dropdownOpenCliete} onToggle={toggleDropdownCliente}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Clientes
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/create" className='link'>Cadatrar</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/list" className='link'>Consultar</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown show={dropdownOpenVendedor} onToggle={toggleDropdownVendedor}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Vendedor
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Cadatrar</Dropdown.Item>
                        <Dropdown.Item>Consultar</Dropdown.Item>
                        <Dropdown.Item>Listar todos</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonGroup>
        </nav>
    );
}

export default Sidebar;
