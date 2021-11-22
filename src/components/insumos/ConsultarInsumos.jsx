import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBreadSlice, faCheckCircle, faTimesCircle, faClock, faCalculator, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { HeaderTabla } from './HeaderTabla';
import '../../styles/consultarInsumos.css';

export const ConsultarInsumos = () => {

    const [filtro, setFiltro] = useState('Todos');

    const [busqueda, setBusqueda] = useState('');

    const cambiarFiltro = (filtro) => {
        setFiltro(filtro);
    }

    return (
        <div className="w-full h-screen overflow-y-scroll">
            <div className="flex flex-col h-full w-full ml-10 mt-12">
                <h2 className="text-left text-4xl mb-4 titulo">Consultar insumos</h2>
                <div className="flex flex-col items-start">
                    <p className="text-white font-semibold mb-2">Filtros:</p>
                    <div className="mb-2">
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
                <div className="flex mb-4">
                    <input
                        type="text"
                        name="busqueda"
                        className="px-32 mr-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                        placeholder="Busca un insumo"
                        autoComplete="off"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <Link to="/insumos/registrar" className="text-lg content-center w-80 rounded-lg focus:outline-none botonPrincipalInput">
                        <button
                            className="text-white p-2 rounded-lg content-center focus:outline-none botonPrincipalInput"
                        >
                            Nuevo insumo
                        </button>
                    </Link>
                </div>
                <div className="w-full contenedorTabla">
                    <HeaderTabla filtro={filtro} busqueda={busqueda} />
                </div>
            </div>
            <ToastContainer theme="dark" />
        </div >
    )
}
