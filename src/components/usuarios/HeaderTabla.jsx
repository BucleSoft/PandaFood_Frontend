import React, { useState, useEffect } from 'react';
import { TablaUsuarios } from './TablaUsuarios';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { toast } from 'react-toastify';
import { useBanderaContext } from '../../context/banderaContext';

export const HeaderTabla = ({ mostrar, busqueda }) => {

    const [data, setData] = useState([]);

    const { bandera } = useBanderaContext();

    useEffect(() => {
        const buscarUsuario = async () => {

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

            await axiosPetition("usuarios");
            setData(respuesta.usuarios.reverse());
            if (!respuesta.ok) {
                toast.error(
                    "Ha ocurrido un error al intentar obtener la lista de usuarios.",
                    configMensaje
                );
            }
        }
        buscarUsuario();
    }, [bandera]);

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
                        Rol
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Estado
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.map((datos, key) => {

                    if (mostrar === 'Todos' && (datos.nombre.toLowerCase().includes(busqueda.toLowerCase()) || datos.cedula.toString().includes(busqueda))) {
                        return <TablaUsuarios key={datos.uid} props={datos} />
                    } else if (datos.estado === mostrar && (datos.nombre.toLowerCase().includes(busqueda.toLowerCase()) || datos.cedula.toString().includes(busqueda))) {
                        return <TablaUsuarios key={datos.uid} props={datos} />
                    }

                    return '';
                })}
            </tbody>
        </table>
    )
}
