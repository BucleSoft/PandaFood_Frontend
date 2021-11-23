import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import '../../styles/menu.css';
import { ConsultarProductos } from './ConsultarProductos';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { toast } from 'react-toastify';

export const Menú = () => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const buscarProductos = async () => {

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

            await axiosPetition('productos');

            if (!respuesta.ok) {
                return toast('Error al cargar los productos!', configMensaje);
            }

            setProductos(respuesta.productos);

        }
        buscarProductos();
    });

    return (
        <div className="flex flex-col w-full h-screen items-center justify-start">
            <ConsultarProductos />
            <div className="px-28 flex flex-wrap overflow-y-scroll justify-start">
                {productos?.map((datos, key) => {
                    return <Card nombre={datos.nombre} precio={datos.precio} categoria={datos.categoria} key={key} />;
                })}
            </div>
        </div>
    )
}
