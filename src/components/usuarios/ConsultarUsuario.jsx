import React, { useState } from 'react';
import { HeaderTabla } from '../../components/usuarios/HeaderTabla';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { BanderaContext } from '../../context/banderaContext';

export const ConsultarUsuario = () => {

    const [filtro, setFiltro] = useState('Autorizado');
    const [busqueda, setBusqueda] = useState('');
    const [bandera, setBandera] = useState(true);

    return (
        <BanderaContext.Provider value={{ bandera, setBandera }} >
            <div className="w-full h-screen overflow-y-scroll">
                <div className="flex flex-col h-ufll w-full ml-10 mt-12">
                    <h2 className="text-left text-4xl mb-4 titulo">Consultar usuarios</h2>
                    <div className="flex mb-4">
                        <select
                            name="tipo_usuario"
                            className="w-80 p-2 pl-8 pr-8 mr-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}>
                            <option value="Todos">Todos los estados</option>
                            <option value="Autorizado">Autorizado</option>
                            <option value="No autorizado">No autorizado</option>
                        </select>
                        <input
                            type="text"
                            name="cedula"
                            className="w-80 p-2 pl-8 pr-8 mr-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Busque un usuario"
                            autoComplete="off"
                            vaue={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)} />
                        <Link to="/usuarios/registrar" className="text-lg content-center w-80 rounded-lg focus:outline-none botonPrincipalInput">
                            <button
                                className="text-white p-2 rounded-lg content-center focus:outline-none botonPrincipalInput"
                            >
                                Nuevo usuario
                            </button>
                        </Link>
                    </div>
                    <div className="w-full contenedorTabla">
                        <HeaderTabla mostrar={filtro} busqueda={busqueda} />
                    </div>
                </div>
                <ToastContainer theme="dark" />
            </div >
        </BanderaContext.Provider>
    );
}
