import React, { useEffect } from 'react';
import logo_sidebar from '../images/logo-PandaFood.svg';
import '../styles/menuLateral.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faUserTie, faDollarSign, faHamburger, faBreadSlice, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useMenuContext } from '../context/menuContext';
import { useHistory } from 'react-router-dom';
import { useEditarVentaContext } from '../context/editarVentaContext';

export const MenuLateral = () => {

    const { editarVenta } = useEditarVentaContext();
    const { active, setActive } = useMenuContext("menu");
    const history = useHistory();

    useEffect(() => {
        const url = window.location.href;
        if (url.includes('perfil')) {
            setActive('perfil');
        } else if (url.includes('menu')) {
            setActive('menu');
        } else if (url.includes('ventas')) {
            setActive('ventas');
        } else if (url.includes('clientes')) {
            setActive('clientes');
        } else if (url.includes('insumos')) {
            setActive('insumos');
        } else if (url.includes('usuarios')) {
            setActive('usuarios');
        }
    }, [active, history]);

    useEffect(() => {
        if (window.localStorage.getItem('token') === null) {
            history.push("/login");
        }
    }, [active]);

    return (
        <div id="sidebar" className="hidden md:flex md:flex-col md:h-screen">
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
                <Link to={editarVenta !== undefined ? "/ventas/editar" : "/ventas"}>
                    <li
                        className={`flex text-md mr-2 ml-2 mb-3 h-10 items-center menu-item rounded-lg ${active === "ventas" ? "activated" : ''}`}
                        onClick={() => {
                            setActive('ventas');
                        }}>
                        <FontAwesomeIcon
                            className="mr-2 ml-4"
                            icon={faDollarSign} />
                        Realizar Venta
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
                <Link to="/login">
                    <li
                        className={`flex text-md mr-2 ml-2 mb-3 h-10 items-center menu-item-logout rounded-lg`}
                        onClick={() => window.localStorage.removeItem('token')}
                    >
                        <FontAwesomeIcon
                            className="mr-2 ml-4"
                            icon={faPowerOff} />
                        Cerrar sesión
                    </li>
                </Link>
            </ul>
        </div>
    );
}
