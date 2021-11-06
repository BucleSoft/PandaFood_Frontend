import React, { useState, useEffect } from 'react';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { toast } from 'react-toastify';
import { TablaClientes } from './TablaClientes';

export const HeaderTabla = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const buscarClientes = async () => {

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

            await axiosPetition("clientes");
            setData(respuesta.clientes.reverse());
            if (!respuesta.ok) {
                toast.error(
                    "Ha ocurrido un error al intentar obtener la lista de clientes.",
                    configMensaje
                );
            }
        }
        buscarClientes();
    }, []);

    return (
        <table className="leading-normal w-full tabla">
            <thead>
                <tr>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Cédula
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Nombre
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Puntos
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Estado
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.map((datos, key) => {

                    // if (mostrar === 'Todos' && (datos.nombre.toLowerCase().includes(busqueda.toLowerCase()) || datos.cedula.toString().includes(busqueda))) {
                    //     return <TablaClientes key={datos.uid} props={datos} />
                    // } else if (datos.estado === mostrar && (datos.nombre.toLowerCase().includes(busqueda.toLowerCase()) || datos.cedula.toString().includes(busqueda))) {
                    //     return <TablaClientes key={datos.uid} props={datos} />
                    // }

                    return <TablaClientes key={datos.uid} props={datos} />
                })}
            </tbody>
        </table>
    )
}