import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Eliminar from '../../assets/eliminar.svg';
import { useCarritoContext } from '../../context/carritoContext';
import { useVentaContext } from '../../context/ventaContext';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import '../../styles/tablaProductos.css';

export const TablaProductos = ({ props, index, bandera, setBandera, verPuntos, verificarAlredimir, setVerificarAlRedimir }) => {

    let { identificador, nombre, cantidad, precio, puntos } = props;

    const { carrito, setCarrito } = useCarritoContext();
    const { venta } = useVentaContext();

    const configMensaje = {
        position: "bottom-center",
        background: "#191c1f !important",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    };

    const quitarDelCarrito = async () => {
        await carrito?.splice(index, 1);
        setCarrito(carrito);
        setVerificarAlRedimir(!verificarAlredimir);
        setBandera(!bandera);
    }

    return (
        <>
            <tr className="border-b-2">
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-white font-semibold whitespace-no-wrap">{index + 1}</p>
                </td>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-white font-semibold whitespace-no-wrap">{identificador}</p>
                </td>
                <td className="px-5 py-3 text-sm">
                    <div>
                        <p className="text-left text-white whitespace-no-wrap">
                            {nombre}
                        </p>
                    </div>
                </td>
                <td className="px-5 py-3 text-sm">
                    <div>
                        <p className="text-left text-white whitespace-no-wrap">
                            {cantidad}
                        </p>
                    </div>
                </td>
                <td className="px-5 py-3 text-sm">
                    <div>
                        <p className="text-left text-white whitespace-no-wrap">
                            {verPuntos === false ? precio : (puntos !== null && puntos !== undefined && puntos !== '' && puntos !== '0') ? puntos + " pts" : '-'}
                        </p>
                    </div>
                </td>
                <td className="px-5 py-3 text-sm">
                    <div>
                        <p className="text-left text-white whitespace-no-wrap">
                            {verPuntos === false ? (precio * cantidad) : puntos > 0 ? (puntos * cantidad) + " pts" : '-'}
                        </p>
                    </div>
                </td>
                <td className="flex px-10 py-3 text-sm justify-left">
                    <img
                        className="tablaItem" src={Eliminar}
                        onClick={quitarDelCarrito}
                        alt="ícono eliminar"
                    ></img>
                </td>
            </tr>
        </>
    );
}
