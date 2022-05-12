import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBreadSlice, faCheckCircle, faTimesCircle, faClock, faCalculator, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { HeaderTabla } from './HeaderTabla';

export const ConsultarVentas = () => {

    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState("Consume restaurante");
    const [desde, setDesde] = useState(new Date().toISOString().slice(0, 10));
    const [hasta, setHasta] = useState(new Date().toISOString().slice(0, 10));

    return (
        <div className="w-full h-screen overflow-y-scroll mx-12">
            <div className="flex flex-col h-full w-full ml-10 mt-12">
                <h2 className="text-left text-4xl mb-4 titulo">Consultar ventas</h2>
                <div className="flex flex-col items-start">
                    <p className="text-white font-semibold">Filtros:</p>
                    <div className="mb-4">
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Todas' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                            onClick={() => setFiltro("Todas")}
                        >
                            Todas
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Consume restaurante' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-38 outline-none`}
                            onClick={() => setFiltro("Consume restaurante")}
                        >
                            Consume en restaurante
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Para llevar' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-32 outline-none`}
                            onClick={() => setFiltro("Para llevar")}
                        >
                            Para llevar
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Rango' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-36 outline-none`}
                            onClick={() => setFiltro("Rango")}
                        >
                            Rango de fechas
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Restaurante' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                            onClick={() => setFiltro("Restaurante")}
                        >
                            Restaurante
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Domicilio' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                            onClick={() => setFiltro("Domicilio")}
                        >
                            Domicilio
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Redimir' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                            onClick={() => setFiltro("Redimir")}
                        >
                            Puntos
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Plataformas' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                            onClick={() => setFiltro("Plataformas")}
                        >
                            Plataformas
                        </button>
                    </div>
                </div>
                <div className="flex flex-col mb-4">
                    <div className="flex">
                        <input
                            type="date"
                            nombre="desde"
                            className={`w-64 px-2 py-2 mb-4 mr-6 rounded-sm border-b-2 text-center focus:outline-none formInput ${filtro !== "Rango" ? "hidden" : ""}`}
                            placeholder="Desde"
                            autoComplete="off"
                            value={desde}
                            onChange={(e) => {
                                setDesde(e.target.value);
                            }}
                        />
                        <input
                            type="date"
                            nombre="hasta"
                            className={`w-64 px-2 py-2 mb-4 rounded-sm border-b-2 text-center focus:outline-none formInput ${filtro !== "Rango" ? "hidden" : ""}`}
                            placeholder="Hasta"
                            autoComplete="off"
                            value={hasta}
                            onChange={(e) => setHasta(e.target.value)}
                        />
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            nombre="busqueda"
                            className=" py-2 w-5/12 mr-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Buscar por cédula del cliente"
                            autoComplete="off"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <Link to="/ventas" className="text-lg content-center w-80 h-11 rounded-lg focus:outline-none botonPrincipalInput">
                            <button
                                className="text-white p-2 rounded-lg content-center focus:outline-none botonPrincipalInput"
                            >
                                Nueva venta
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-full contenedorTabla">
                    <HeaderTabla busqueda={busqueda} filtro={filtro} desde={desde} setDesde={setDesde} hasta={hasta} setHasta={setHasta} />
                </div>
            </div>
            <ToastContainer theme="dark" />
        </div >
    )
}
