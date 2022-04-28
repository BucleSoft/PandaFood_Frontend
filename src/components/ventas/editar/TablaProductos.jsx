import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Eliminar from '../../../assets/eliminar.svg';
import { axiosPetition } from '../../../helpers/Axios';
import { useCarritoContext } from '../../../context/carritoContext';
import { useEditarVentaContext } from '../../../context/editarVentaContext';
import '../../../styles/tablaProductos.css';

export const TablaProductos = ({ props, index, verPuntos, bandera, setBandera, fuente }) => {

    const { identificador, cantidad } = props;
    const { carrito, setCarrito } = useCarritoContext();
    const { editarVenta } = useEditarVentaContext();

    const [producto, setProducto] = useState({});
    const [hidden, setHidden] = useState(false);

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

        const buscarProducto = async () => {

            const busqueda = await axiosPetition(`productos/${identificador}`);

            if (!busqueda.ok) {
                return toast.error(busqueda.msg, configMensaje);
            }

            const { producto } = busqueda;

            setProducto(producto);

        }

        buscarProducto();
    }, []);

    const { precio, puntos, nombre } = producto;

    const quitarDelCarrito = async () => {
        await carrito?.splice(index, 1);
        setCarrito(carrito);
        // setVerificarAlRedimir(!verificarAlredimir);
        setBandera(!bandera);
    }

    return (
        <>
            <tr className={`border-b-2 ${hidden === true ? "hidden" : ""}`}>
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
                        className={`tablaItem ${fuente !== "Carrito" ? "hidden" : ''}`} src={Eliminar}
                        onClick={() => {

                            quitarDelCarrito();

                        }}
                        alt="ícono eliminar"
                    ></img>
                </td>
            </tr>
        </>
    );
}
