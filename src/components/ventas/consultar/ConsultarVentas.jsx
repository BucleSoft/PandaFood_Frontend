import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBreadSlice, faCheckCircle, faTimesCircle, faClock, faCalculator, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { HeaderTabla } from './HeaderTabla';

export const ConsultarVentas = () => {

    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState();

    return (
        <div className="w-full h-screen overflow-y-scroll mx-12">
            <div className="flex flex-col h-full w-full ml-10 mt-12">
                <h2 className="text-left text-4xl mb-4 titulo">Consultar ventas</h2>
                <div className="flex flex-col items-start">
                    <p className="text-white font-semibold">Filtros:</p>
                    <div className="mb-2">
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Todos' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                        >
                            Todas
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Todos' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                        >
                            Hoy
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Todos' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-36 outline-none`}
                        >
                            Rango de fechas
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Todos' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                        >
                            Restaurante
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Todos' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                        >
                            Domicilio
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Todos' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                        >
                            Puntos
                        </button>
                    </div>
                </div>
                <div className="flex mb-4">
                    <input
                        type="text"
                        nombre="busqueda"
                        className="px-32 mr-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                        placeholder="Busca una venta"
                        autoComplete="off"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <Link to="/ventas" className="text-lg content-center w-80 rounded-lg focus:outline-none botonPrincipalInput">
                        <button
                            className="text-white p-2 rounded-lg content-center focus:outline-none botonPrincipalInput"
                        >
                            Nueva venta
                        </button>
                    </Link>
                </div>
                <div className="w-full contenedorTabla">
                    <HeaderTabla busqueda={busqueda} />
                </div>
            </div>
            <ToastContainer theme="dark" />
        </div >
    )
}
