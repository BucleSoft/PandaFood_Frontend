import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { MenuLateral } from '../components/MenuLateral';
import { useEditarVentaContext } from '../context/editarVentaContext';
import { useCarritoContext } from '../context/carritoContext';

export const PrivateLayout = ({ children }) => {

    const { editarVenta, setEditarVenta } = useEditarVentaContext();
    const { setCarrito } = useCarritoContext();

    const [contadorWarning, setContadorWarning] = useState(0);

    const history = useHistory();

    const configMensaje = {
        position: "bottom-center",
        background: "#191c1f !important",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };

    useEffect(() => {
        if (window.localStorage.getItem('token') === null) {
            history.push("/login");
        } else {
            history.push("/menu");
        }
    }, []);

    useEffect(() => {
        if (editarVenta !== undefined && contadorWarning < 1) {
            toast.warning(`Estás editando la venta ${editarVenta.identificador}, haz click aquí para salir de la edición`, configMensaje);
            setContadorWarning(contadorWarning + 1);
        }

        if (editarVenta === undefined) {
            setContadorWarning(0);
            setCarrito([]);
        }
    }, [editarVenta]);

    return (
        <div className='flex'>
            <MenuLateral />
            <main className="w-full">
                {children}
                <ToastContainer theme="dark" onClick={() => {
                    setEditarVenta(undefined);
                }} />
            </main>
        </div>
    );
}
