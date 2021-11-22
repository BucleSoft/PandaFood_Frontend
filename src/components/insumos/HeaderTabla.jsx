import React, { useState, useEffect } from 'react';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { toast } from 'react-toastify';
import { TablaInsumos } from './TablaInsumos';
import { useBanderaContext } from '../../context/banderaContext';

export const HeaderTabla = ({ filtro, busqueda }) => {

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
                        Stock/Peso
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Categoría
                    </th>
                    <th
                        className="pl-14 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
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

                    const condicion = datos.nombre.toLowerCase().includes(busqueda.toLowerCase()) || datos.identificador.toString().toLowerCase().includes(busqueda.toLowerCase());

                    switch (filtro) {
                        case 'Todos':
                            if (condicion) {
                                return <TablaInsumos key={datos.uid} props={datos} />;
                            }
                            break;
                        case 'Disponibles':
                            const minimo = datos.stock !== null ? datos.categoria === 'Comida' ? 12 : 5 : 500;
                            const disponible = datos.stock !== null ? (datos.stock > minimo) : (datos.gramaje > minimo);

                            if (disponible) {
                                return <TablaInsumos key={datos.uid} props={datos} />;
                            }
                            break;
                        case 'Por agotarse':
                            const minimo_pa = datos.stock !== null ? datos.categoria === 'Comida' ? 12 : 5 : 500;
                            const por_agotarse = datos.stock !== null ? (datos.stock <= minimo_pa && datos.stock > 0) : (datos.gramaje <= minimo_pa && datos.gramaje > 0);

                            if (por_agotarse) {
                                return <TablaInsumos key={datos.uid} props={datos} />;
                            }
                            break;
                        case 'Agotados':
                            const minimo_a = datos.stock !== null ? datos.categoria === 'Comida' ? 12 : 5 : 500;
                            const agotado = datos.stock !== null ? (datos.stock <= minimo_a && datos.stock <= 0) : (datos.gramaje <= minimo_a && datos.gramaje <= 0);

                            if (agotado) {
                                return <TablaInsumos key={datos.uid} props={datos} />;
                            }
                            break;
                        case 'Bebida':
                        case 'Comida':
                            if (datos.categoria === filtro && condicion) {
                                return <TablaInsumos key={datos.uid} props={datos} />;
                            }
                            break;
                        case 'Unidades':
                            if (datos.stock !== null && condicion) {
                                return <TablaInsumos key={datos.uid} props={datos} />;
                            }
                            break;
                        case 'Gramos':
                            if (datos.stock == null && condicion) {
                                return <TablaInsumos key={datos.uid} props={datos} />;
                            }
                            break;
                    }

                }
                )}
            </tbody>
        </table>
    )
}
