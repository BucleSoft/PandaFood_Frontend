import React from 'react';
import '../styles/opcionesPerfil.css';
import hamburgo from '../images/hamburgo.svg';
import carro_compra from '../images/carro-de-la-compra.svg';

export const OpcionesPerfil = () => {
    return (
        <div id="opciones-perfil" className="col-start-2 col-end-8">
            <ul className="flex justify-between">
                <li id="opcion-mi-perfil" className="flex flex-col justify-center items-center text-white w-48 h-24 ml-6 rounded-xl opcion-perfil">
                    <img src={hamburgo} className="w-14" />
                    Mi perfil
                </li>
                <li id="opcion-ventas-hoy" className="flex flex-col justify-center items-center w-48 h-24 ml-2 rounded-xl opcion-perfil text-white">
                    <img src={carro_compra} className="w-14" />
                    Ventas hoy
                </li>
                <li id="opcion-ventas-mes" className="w-48 h-24 ml-2 rounded-xl opcion-perfil text-white">Ventas octubre</li>
                <li id="ventas-rengo" className="bg-red-500 w-48 h-24 ml-2 rounded-xl opcion-perfil text-white">Ventas rango de fecha</li>
                <li id="producto-mas-vendido" className="bg-red-500 w-48 h-24 ml-2 mr-2 rounded-xl opcion-perfil text-white">Producto más vendido</li>
            </ul>
        </div>
    );
}
