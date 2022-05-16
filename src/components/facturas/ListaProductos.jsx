import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosPetition } from '../../helpers/Axios';

export const ListaProductos = ({ detalle }) => {

    const [producto, setProducto] = useState();

    useEffect(() => {

        const buscarPdto = async () => {

            const pdtoBD = await axiosPetition(`productos/${detalle?.id_producto}`);

            if (!pdtoBD.ok) {
                return toast.error(pdtoBD.msg, configMensaje);
            }

            setProducto(pdtoBD.producto);

        }

        buscarPdto();

    }, [detalle]);

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

    return (
        <tr className="border-b-2 border-gray-300 text-left text-xs">
            <td>
                {detalle.cantidad}
            </td>
            <td>
                {producto?.nombre}
            </td>
            <td>
                {producto?.precio}
            </td>
            <td>
                {detalle.subtotal}
            </td>
        </tr>
    );
}
