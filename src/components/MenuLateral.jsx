import React, { useState, useEffect } from 'react';
import logo_sidebar from '../images/logo-PandaFood.svg';
import '../styles/menuLateral.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faUserTie, faDollarSign, faCopy, faHamburger, faBreadSlice } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const MenuLateral = () => {

    const [active, setActive] = useState('perfil');

    useEffect(() => {
        const url = window.location.href;
        if (url.includes('perfil')) {
            setActive('perfil');
        } else if (url.includes('menu')) {
            setActive('menu');
        } else if (url.includes('ventas')) {
            setActive('ventas');
        } else if (url.includes('facturas')) {
            setActive('facturas');
        } else if (url.includes('clientes')) {
            setActive('clientes');
        } else if (url.includes('insumos')) {
            setActive('insumos');
        } else if (url.includes('usuarios')) {
            setActive('usuarios');
        }
    }, []);

    return (
        <div id="sidebar" className="flex flex-col h-screen">
            <ul className="text-white h-full">
                <li><img id="logo-sidebar" className="ml-1" src={logo_sidebar} alt="logo-pandafood" /></li>
                <Link to="/perfil">
                    <li
                        onClick={() => setActive('perfil')}
                        className={`flex text-md mr-2 ml-2 mb-3 mt-4 h-10 items-center menu-item rounded-lg ${active === "perfil" ? "activated" : ''}`}
                    >
                        <FontAwesomeIcon
                            className="mr-2 ml-4"
                            icon={faUser} />
                        Mi Perfil
                    </li>
                </Link>
                <Link to="/menu">
                    <li
                        className={`flex text-md mr-2 ml-2 mb-3 h-10 items-center  menu-item rounded-lg ${active === "menu" ? "activated" : ''}`}
                        onClick={() => setActive('menu')}>
                        <FontAwesomeIcon
                            className="mr-2 ml-4"
                            icon={faHamburger} />
                        Menú
                    </li>
                </Link>
                <Link to="/ventas">
                    <li
                        className={`flex text-md mr-2 ml-2 mb-3 h-10 items-center menu-item rounded-lg ${active === "ventas" ? "activated" : ''}`}
                        onClick={() => setActive('ventas')}>
                        <FontAwesomeIcon
                            className="mr-2 ml-4"
                            icon={faDollarSign} />
                        Realizar Venta
                    </li>
                </Link>
                <Link to="/facturas">
                    <li
                        className={`flex text-md mr-2 ml-2 mb-3 h-10 items-center menu-item rounded-lg ${active === "facturas" ? "activated" : ''}`}
                        onClick={() => setActive('facturas')}>
                        <FontAwesomeIcon
                            className="mr-2 ml-4"
                            icon={faCopy} />
                        Generar Facturas
                    </li>
                </Link>
                <Link to="/insumos">
                    <li
                        className={`flex text-md mr-2 ml-2 mb-3 h-10 items-center menu-item rounded-lg ${active === "insumos" ? "activated" : ''}`}
                        onClick={() => setActive('insumos')}>
                        <FontAwesomeIcon
                            className="mr-2 ml-4"
                            icon={faBreadSlice} />
                        Insumos
                    </li>
                </Link>
                <Link to="/clientes">
                    <li
                        className={`flex text-md mr-2 ml-2 mb-3 h-10 items-center menu-item rounded-lg ${active === "clientes" ? "activated" : ''}`}
                        onClick={() => setActive('clientes')}>
                        <FontAwesomeIcon
                            className="mr-2 ml-4"
                            icon={faUsers} />
                        Gestionar Clientes
                    </li>
                </Link>
                <Link to="/usuarios">
                    <li
                        className={`flex text-md mr-2 ml-2 mb-3 h-10 items-center  menu-item rounded-lg ${active === "usuarios" ? 'activated' : ''}`}
                        onClick={() => setActive('usuarios')}
                    >
                        <FontAwesomeIcon
                            className="mr-2 ml-4"
                            icon={faUserTie} />
                        Gestionar Usuarios
                    </li>
                </Link>
            </ul>
        </div>
    );
}
