import React, { useState, useEffect } from 'react';
import { axiosPetition } from '../../../helpers/Axios';
import { toast } from 'react-toastify';
import { TablaVentas } from './TablaVentas';

export const HeaderTabla = ({ filtro, busqueda = '', desde, hasta }) => {

    const [data, setData] = useState([]);
    const [dataFecha, setDataFecha] = useState([]);
    const [bandera, setBandera] = useState(false);
    let numDatos = 0;

    // const { bandera } = useBanderaContext();
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

    const buscarVentas = async () => {

        let isMount = true;

        const busqueda = await axiosPetition("ventas");
        if (isMount) {
            setData(busqueda.ventas?.reverse());
        }

        if (!busqueda.ok) {
            return toast.error(
                "Ha ocurrido un error al intentar obtener la lista de ventas.",
                configMensaje
            );
        }

        return () => {
            isMount = false;
        }
    }

    const buscarVentasFecha = async () => {

        let isMount = true;

        const fechaDesde = desde + " 00:00:00";
        const fechaHasta = hasta + " 23:59:59";

        const busqueda = await axiosPetition("ventas/rango", { desde: fechaDesde, hasta: fechaHasta }, "POST");
        if (isMount) {
            setDataFecha(busqueda.ventas?.reverse());
        }

        if (!busqueda.ok) {
            return toast.error(
                busqueda.msg,
                configMensaje
            );
        }

        return () => {
            isMount = false;
        }
    }

    useEffect(() => {

        if (filtro !== "Rango") {
            buscarVentas();
        } else {
            buscarVentasFecha();
        }

    }, [filtro, desde, hasta, bandera]);

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
                        className=" py-3 px-5 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Plataforma
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Fecha
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Hora
                    </th>
                    <th
                        className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Cliente
                    </th>
                    <th
                        className={`px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider ${filtro === "Domicilio" || filtro === "Redimir" ? "hidden" : ""}`}>
                        Mesa
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
            <tbody className={`${filtro !== "Rango" ? '' : 'hidden'}`}>
                {

                    data?.map((datos, key) => {

                        const condicion = datos.cliente?.toString().includes(busqueda);

                        if (numDatos <= 9 && filtro === "Todas" && condicion) {

                            numDatos += 1;
                            return <TablaVentas key={key} props={datos} filtro={filtro} bandera={bandera} setBandera={setBandera} />;

                        } else if (filtro === "Consume restaurante") {

                            if (datos.consume === "restaurante" && datos.tipoVenta === "Restaurante") {
                                numDatos += 1;
                                return <TablaVentas key={key} props={datos} filtro={filtro} bandera={bandera} setBandera={setBandera} />;
                            }

                        } else if (numDatos <= 9 && filtro === "Para llevar") {

                            if (datos.consume === "llevar" && datos.tipoVenta === "Restaurante") {
                                numDatos += 1;
                                return <TablaVentas key={key} props={datos} filtro={filtro} bandera={bandera} setBandera={setBandera} />;
                            }

                        } else if (numDatos <= 9 && datos.tipoVenta === filtro) {
                            if (condicion) {
                                numDatos += 1;
                                return <TablaVentas key={key} props={datos} filtro={filtro} bandera={bandera} setBandera={setBandera} />;
                            }
                        }
                    })
                }
            </tbody>
            <tbody className={`${filtro === "Rango" ? '' : 'hidden'}`}>
                {
                    dataFecha?.map((dato, key) => {
                        const condicion = dato.cliente?.toString().includes(busqueda);
                        if (numDatos <= 9 && filtro === "Rango" && condicion) {
                            numDatos += 1;
                            return <TablaVentas key={key} props={dato} filtro={filtro} bandera={bandera} setBandera={setBandera} />;
                        }
                    })
                }
            </tbody>
        </table >
    )
}
