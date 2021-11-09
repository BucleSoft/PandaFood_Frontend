import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBreadSlice, faCheckCircle, faTimesCircle, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { HeaderTabla } from './HeaderTabla';

export const ConsultarProductos = () => {
    return (
        <div className="w-full h-screen overflow-y-scroll">
            <div className="flex flex-col h-full w-full ml-10 mt-12">
                <h2 className="text-left text-4xl mb-4 titulo">Consultar inventario</h2>
                <div className="flex flex-col items-start">
                    <p className="text-white font-semibold mb-2">Filtros:</p>
                    <div className="mb-2">
                        <button className="text-white px-2 py-1 rounded-xl botonInput my-2 mr-4 w-28">
                            Todos
                        </button>
                        <button className="text-white px-2 py-1 rounded-xl botonInput my-2 mr-4 w-28">
                            <FontAwesomeIcon
                                className='mr-1 text-white'
                                icon={faCoffee}
                            />
                            Bebidas
                        </button>
                        <button className="text-white px-2 py-1 rounded-xl botonInput my-2 w-28 mr-4">
                            <FontAwesomeIcon
                                className='mr-1 text-white'
                                icon={faBreadSlice}
                            />
                            Comidas
                        </button>
                        <button className="text-white px-2 py-1 rounded-xl botonInput my-2 w-30 mr-4">
                            <FontAwesomeIcon
                                className='mr-1 text-white'
                                icon={faCheckCircle}
                            />
                            Disponibles
                        </button>
                        <button className="text-white px-2 py-1 rounded-xl botonInput my-2 w-28 mr-4">
                            <FontAwesomeIcon
                                className='mr-1 text-white'
                                icon={faTimesCircle}
                            />
                            Agotados
                        </button>
                        <button className="text-white px-2 py-1 rounded-xl botonInput my-2 w-36">
                            <FontAwesomeIcon
                                className='mr-1 text-white'
                                icon={faHourglassHalf}
                            />
                            Por agotarse
                        </button>
                    </div>
                </div>
                <div className="flex mb-4">
                    <input
                        type="text"
                        name="cedula"
                        className="px-32 mr-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                        placeholder="Busca un producto"
                        autoComplete="off"
                    // value={busqueda}
                    // onChange={(e) => setBusqueda(e.target.value)} 
                    />
                    <Link to="/inventario/registrar" className="text-lg content-center w-80 rounded-lg focus:outline-none botonPrincipalInput">
                        <button
                            className="text-white p-2 rounded-lg content-center focus:outline-none botonPrincipalInput"
                        >
                            Nuevo producto
                        </button>
                    </Link>
                </div>
                <div className="w-full contenedorTabla">
                    <HeaderTabla />
                </div>
            </div>
            <ToastContainer theme="dark" />
        </div >
    )
}
