import React, { useState, useEffect } from 'react';
import { axiosPetition, respuesta } from '../../../helpers/Axios';
import { toast } from 'react-toastify';
import { TablaVentas } from './TablaVentas';

export const HeaderTabla = ({ filtro, busqueda = '' }) => {

    const [data, setData] = useState([]);
    let numDatos = 0;

    // const { bandera } = useBanderaContext();

    useEffect(() => {
        const buscarVentas = async () => {

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

            await axiosPetition("ventas");
            setData(respuesta.ventas?.reverse());

            if (!respuesta.ok) {
                toast.error(
                    "Ha ocurrido un error al intentar obtener la lista de ventas.",
                    configMensaje
                );
            }
        }
        buscarVentas();
    }, []);

    return (
        <table className="leading-normal w-full tabla mb-14">
            <thead>
                <tr>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Identificador
                    </th>
                    <th
                        className=" py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Concepto
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Fecha
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Cliente
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Total
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((dato, key) => {

                        if (numDatos <= 9) {
                            numDatos += 1;
                            return <TablaVentas key={key} props={dato} />
                        }
                    })
                }
            </tbody>
        </table>
    )
}
