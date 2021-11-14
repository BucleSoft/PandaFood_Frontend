import React, { useState, useEffect } from 'react';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { toast } from 'react-toastify';
import { TablaInsumos } from './TablaInsumos';
import { useBanderaContext } from '../../context/banderaContext';

export const HeaderTabla = ({ mostrar, busqueda }) => {

    const [data, setData] = useState([]);

    // const { bandera } = useBanderaContext();

    useEffect(() => {
        const buscarInsumos = async () => {

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

            await axiosPetition("insumos");
            setData(respuesta.insumos?.reverse());

            if (!respuesta.ok) {
                toast.error(
                    "Ha ocurrido un error al intentar obtener la lista de insumos.",
                    configMensaje
                );
            }
        }
        buscarInsumos();
    }, []);

    return (
        <table className="leading-normal w-full tabla">
            <thead>
                <tr>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Identificador
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Nombre del insumo
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Stock
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Categoría
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Disponibilidad
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.map((datos, key) => {
                    return <TablaInsumos key={datos.uid} props={datos} />
                })}
            </tbody>
        </table>
    )
}
