import React from 'react';
import logo_sidebar from '../images/logo-sidebar.png';
import '../styles/menuLateral.css';

export const MenuLateral = () => {
    return (
        <div id="sidebar" className="flex flex-col h-screen w-56">
            <ul className="text-white h-full">
                <li><img id="logo-sidebar" className="w-full" src={logo_sidebar} /></li>
                <li className="flex mb-4 mt-8 h-12 justify-center items-center border-2 menu-item">Mi Perfil</li>
                <li className="flex mb-4 h-12 justify-center items-center border-2 menu-item">Realizar Venta</li>
                <li className="flex mb-4 h-12 justify-center items-center border-2 menu-item">Generar Facturas</li>
                <li className="flex mb-4 h-12 justify-center items-center border-2 menu-item">Menú</li>
                <li className="flex mb-4 h-12 justify-center items-center border-2 menu-item">Gestionar Clientes</li>
                <li className="flex mb-4 h-12 justify-center items-center border-2 menu-item">Gestionar Usuarios</li>
            </ul>
        </div>
    );
}
