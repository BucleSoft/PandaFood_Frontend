import React, { useState } from 'react';
import { HeaderTabla } from '../../components/clientes/HeaderTabla';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { BanderaContext } from '../../context/banderaContext';

export const ConsultarClientes = () => {

    const [busqueda, setBusqueda] = useState('');
    const [bandera, setBandera] = useState(true);

    return (
        <BanderaContext.Provider value={{ bandera, setBandera }} >
            <div className="w-full h-screen overflow-y-scroll">
                <div className="flex flex-col h-ufll w-full ml-10 mt-12">
                    <h2 className="text-left text-4xl mb-4 titulo">Consultar clientes</h2>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            name="cedula"
                            className="w-80 p-2 pl-8 pr-8 mr-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Busque un cliente"
                            autoComplete="off"
                            vaue={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)} />
                        <Link to="/clientes/registrar" className="text-lg content-center w-80 rounded-lg focus:outline-none botonPrincipalInput">
                            <button
                                className="text-white p-2 rounded-lg content-center focus:outline-none botonPrincipalInput"
                            >
                                Nuevo cliente
                            </button>
                        </Link>
                    </div>
                    <div className="w-full contenedorTabla">
                        <HeaderTabla />
                    </div>
                </div>
                <ToastContainer theme="dark" />
            </div >
        </BanderaContext.Provider>
    );
}