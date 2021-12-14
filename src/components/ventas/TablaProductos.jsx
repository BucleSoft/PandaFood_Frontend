import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Eliminar from '../../assets/eliminar.svg';
import { useCarritoContext } from '../../context/carritoContext';
import { useVentaContext } from '../../context/ventaContext';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import '../../styles/tablaProductos.css';

export const TablaProductos = ({ props, index, bandera, setBandera, verPuntos }) => {

    let { identificador, nombre, cantidad, precio, puntos, pagaPuntos = false } = props;

    const { carrito, setCarrito } = useCarritoContext();
    const { venta } = useVentaContext();

    const [checked, setChecked] = useState(pagaPuntos);

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

    useEffect(() => {
        if (venta?.cliente === '' || venta?.cliente === 0) {
            setChecked(false);
            carrito[index].pagaPuntos = false;
        } else {
            setChecked(pagaPuntos);
        }
    }, []);

    const quitarDelCarrito = async () => {
        await carrito?.splice(index, 1);
        setCarrito(carrito);
        setBandera(!bandera);
    }

    const pagarConPuntos = async () => {
        if (venta?.cliente === '' || venta?.cliente === 0) {
            return toast.error("Busque un cliente en el primer paso para pagar con puntos.", configMensaje);
        }

        await axiosPetition(`clientes/${venta.cliente}`);

        if (!respuesta.ok) {
            return toast.error("Ha ocurrido un error al consultar el cliente.");
        }

        if (puntos > parseInt(respuesta.cliente.puntos)) {
            setChecked(false);
            carrito[index].pagaPuntos = false;
            return toast.error("El cliente no posee suficientes puntos para comprar el producto.", configMensaje);
        }
        setChecked(!checked);
        carrito[index].pagaPuntos = !checked;
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
                            {precio * cantidad}
                        </p>
                    </div>
                </td>
                <td className="px-9 py-3 text-sm">
                    <div>
                        <p className="text-left text-white whitespace-no-wrap">
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={pagarConPuntos} />
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
