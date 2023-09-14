import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import {
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarMenuItem,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarSubMenu,
    CDBSidebarFooter,
    CDBBadge,
    CDBContainer,
} from 'cdbreact';

const Sidebar = () => {
    return (
        <CDBSidebar className='side' textColor="#f0f0f0" backgroundColor="#333">
            <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
                <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                    <Link style={{ textDecoration: 'none' }} to='/'><img
                        src="../img.jpeg"
                        alt=""
                        style={{ width: '30px' }}
                    /></Link>
                    <Link style={{ textDecoration: 'none' }} to='/'><h6 className="ms-2">Meu crediario</h6></Link>
                </div>
            </CDBSidebarHeader>
            <CDBSidebarContent>
                <CDBSidebarMenu>
                    <Link to='/list'><CDBSidebarMenuItem icon="list">Listar clientes</CDBSidebarMenuItem></Link>
                    <Link to='/create'><CDBSidebarMenuItem icon="plus">Cadastrar cliente</CDBSidebarMenuItem></Link>
                </CDBSidebarMenu>
                <CDBSidebarMenu>
                    <Link to='/listVendedor'><CDBSidebarMenuItem icon="list">Listar vendedores</CDBSidebarMenuItem></Link>
                    <Link to='/createVendedor'><CDBSidebarMenuItem icon="plus">Cadastrar vendedor</CDBSidebarMenuItem></Link>
                </CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{ padding: '20px 5px' }}
                >
                    <img
                        src="../img.jpeg"
                        alt=""
                        style={{ width: '100%' }}
                    />
                </div>
            </CDBSidebarFooter>
        </CDBSidebar>
    )
};

export default Sidebar;