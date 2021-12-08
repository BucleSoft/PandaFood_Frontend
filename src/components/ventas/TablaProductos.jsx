import React, { useEffect, useState } from 'react';
import Eliminar from '../../assets/eliminar.svg';
import { useCarritoContext } from '../../context/carritoContext';
import '../../styles/tablaProductos.css';

export const TablaProductos = ({ props, index, bandera, setBandera }) => {

    let { identificador, nombre, cantidad, precio } = props;
    const { carrito, setCarrito } = useCarritoContext();

    const quitarDelCarrito = async () => {
        delete carrito[index];
        setCarrito(carrito);
        setBandera(!bandera);
    }

    return (
        <>
            <tr className="border-b-2">
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
                            {precio}
                        </p>
                    </div>
                </td>
                <td className="px-5 py-3 text-sm">
                    <div>
                        <p className="text-left text-white whitespace-no-wrap">
                            {precio * cantidad}
                        </p>
                    </div>
                </td>
                <td className="flex px-10 py-3 text-sm justify-left">
                    <img
                        className="tablaItem" src={Eliminar}
                        onClick={quitarDelCarrito}
                        alt="ícono lápiz"
                    ></img>
                </td>
            </tr>
        </>
    );
}
