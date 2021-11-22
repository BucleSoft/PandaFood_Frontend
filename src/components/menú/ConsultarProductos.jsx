import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCoffee, faBreadSlice, faCheckCircle, faTimesCircle, faClock, faCalculator, faBalanceScale, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../../styles/consultarProductos.css';
import { Link } from 'react-router-dom';

export const ConsultarProductos = () => {

    const [filtro, setFiltro] = useState('Todos');
    const cambiarFiltro = (filtro) => {
        setFiltro(filtro);
    }

    return (
        <div>
            <div className='flex flex-col w-full h-full items-start'>
                <div id='buscador' className='w-full flex items-end mt-8 mr-4 h-12 rounded-lg pl-4'>
                    <div className='flex items-center justify-center h-12'>
                        <FontAwesomeIcon className='text-white text-lg mr-2' icon={faSearch}></FontAwesomeIcon>
                    </div>
                    <input
                        className='w-full text-md h-12 outline-none rounded-lg text-white'
                        placeholder='Busca un producto por su nombre o identificador'
                    />
                    <Link to="/menu/registrar">
                        <FontAwesomeIcon
                            className='text-white h-12 mr-4 text-2xl font-normal cursor-pointer'
                            icon={faPlus}
                            title='Agregar producto'>
                        </FontAwesomeIcon>
                    </Link>
                    <section className='flex mr-2'>
                        <FontAwesomeIcon
                            className='h-12 text-white text-2xl font-normal cursor-pointer'
                            icon={faShoppingCart}
                            title='Ir a la venta'>
                        </FontAwesomeIcon>
                        <p className='text-center mt-1 text-white font-semibold rounded-full numeroCarrito'>0</p>
                    </section>
                </div>
                <h2 className='text-white mt-4'>Filtros:</h2>
                <div>
                    <button
                        className={`text-white px-2 py-1 rounded-xl ${filtro === 'Todos' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                        onClick={() => cambiarFiltro('Todos')}>
                        Todos
                    </button>
                    <button
                        className={`text-white px-2 py-1 rounded-xl ${filtro === 'Unidades' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                        onClick={() => cambiarFiltro('Unidades')}>
                        <FontAwesomeIcon
                            className='mr-1 text-white'
                            icon={faCalculator}
                        />
                        Unidades
                    </button>
                    <button
                        className={`text-white px-2 py-1 rounded-xl ${filtro === 'Gramos' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                        onClick={() => cambiarFiltro('Gramos')}>
                        <FontAwesomeIcon
                            className='mr-1 text-white'
                            icon={faBalanceScale}
                        />
                        Gramos
                    </button>
                    <button
                        className={`text-white px-2 py-1 rounded-xl ${filtro === 'Bebida' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                        onClick={() => cambiarFiltro('Bebida')}>
                        <FontAwesomeIcon
                            className='mr-1 text-white'
                            icon={faCoffee}
                        />
                        Bebidas
                    </button>
                    <button
                        className={`text-white px-2 py-1 rounded-xl ${filtro === 'Comida' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                        onClick={() => cambiarFiltro('Comida')}>
                        <FontAwesomeIcon
                            className='mr-1 text-white'
                            icon={faBreadSlice}
                        />
                        Comidas
                    </button>
                    <button
                        className={`text-white px-2 py-1 rounded-xl ${filtro === 'Disponibles' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-36 outline-none`}
                        onClick={() => cambiarFiltro('Disponibles')}>
                        <FontAwesomeIcon
                            className='mr-1 text-white'
                            icon={faCheckCircle}
                        />
                        Disponibles
                    </button>
                    <button
                        className={`text-white px-2 py-1 rounded-xl ${filtro === 'Agotados' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                        onClick={() => cambiarFiltro('Agotados')}>
                        <FontAwesomeIcon
                            className='mr-1 text-white'
                            icon={faTimesCircle}
                        />
                        Agotados
                    </button>
                    <button
                        className={`text-white px-2 py-1 rounded-xl ${filtro === 'Por agotarse' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-36 outline-none`}
                        onClick={() => cambiarFiltro('Por agotarse')}>
                        <FontAwesomeIcon
                            className='mr-1 text-white'
                            icon={faClock}
                        />
                        Por agotarse
                    </button>
                </div>
            </div>
            <section className='absolute right-12 bottom-8 flex flex-col justify-center overflow-hidden'>
                <Link to="/menu/registrar">
                    <button id='botonAgregar' className='rounded-full w-12 h-12 flex items-center justify-center shadow-md' title='Agregar producto' >
                        <FontAwesomeIcon className='text-white text-2xl font-normal' icon={faPlus}>
                        </FontAwesomeIcon>
                    </button>
                </Link>
                <button id='botonCarrito' className='rounded-full w-12 h-12 mt-4 flex items-center justify-center shadow-md' title='Ir a la venta' >
                    <FontAwesomeIcon className='text-white text-2xl font-normal' icon={faShoppingCart}>
                    </FontAwesomeIcon>
                </button>
            </section>
        </div>
    )
}
