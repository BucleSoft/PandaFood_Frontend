import React, { useState, useEffect } from 'react';
import { axiosPetition } from '../../helpers/Axios';
import { toast } from 'react-toastify';
import { TablaInsumos } from './TablaInsumos';

export const HeaderTabla = ({ filtro, busqueda = '' }) => {

    const [data, setData] = useState([]);

    let numDatos = 0;

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

            const insumos = await axiosPetition("insumos");
            setData(insumos.insumos?.reverse());

            if (!insumos.ok) {
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

                    const condicion = datos.nombre?.toLowerCase().includes(busqueda.toLowerCase()) || datos.identificador?.toString().toLowerCase().includes(busqueda.toLowerCase());

                    if (numDatos <= 9) {
                        switch (filtro) {
                            case 'Todos':
                                if (condicion) {
                                    numDatos += 1;
                                    return <TablaInsumos key={key} props={datos} />;
                                }
                                break;
                            case 'Disponibles':
                                const minimo = datos.unidades === "stock" ? datos.categoria === 'Comida' ? 12 : 5 : 500;
                                const disponible = datos.unidades === "stock" ? (datos.cantidad > minimo) : (datos.cantidad > minimo);

                                if (disponible) {
                                    numDatos += 1;
                                    return <TablaInsumos key={key} props={datos} />;
                                }
                                break;
                            case 'Por agotarse':
                                const minimo_pa = datos.unidades === "stock" ? datos.categoria === 'Comida' ? 12 : 5 : 500;
                                const por_agotarse = datos.unidades === "stock" ? (datos.cantidad <= minimo_pa && datos.cantidad > 0) : (datos.cantidad <= minimo_pa && datos.cantidad > 0);

                                if (por_agotarse) {
                                    numDatos += 1;
                                    return <TablaInsumos key={key} props={datos} />;
                                }
                                break;
                            case 'Agotados':
                                const minimo_a = datos.unidades === "stock" ? datos.categoria === 'Comida' ? 12 : 5 : 500;
                                const agotado = datos.unidades === "stock" ? (datos.cantidad <= minimo_a && datos.cantidad <= 0) : (datos.gramos <= minimo_a && datos.cantidad <= 0);

                                if (agotado) {
                                    numDatos += 1;
                                    return <TablaInsumos key={key} props={datos} />;
                                }
                                break;
                            case 'Bebida':
                            case 'Comida':
                                if (datos.categoria === filtro && condicion) {
                                    numDatos += 1;
                                    return <TablaInsumos key={key} props={datos} />;
                                }
                                break;
                            case 'Unidades':
                                if (datos.unidades === "stock" && condicion) {
                                    numDatos += 1;
                                    return <TablaInsumos key={key} props={datos} />;
                                }
                                break;
                            case 'Gramos':
                                if (datos.unidades == "gramos" && condicion) {
                                    numDatos += 1;
                                    return <TablaInsumos key={key} props={datos} />;
                                }
                                break;
                        }

                    }
                }
                )}
            </tbody>
        </table>
    )
}
