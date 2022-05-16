import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { axiosPetition } from '../../helpers/Axios';
import logo from '../../images/logo-PandaFood.svg';
import '../../styles/factura.css';
import { ListaProductos } from './ListaProductos';
import { useHistory } from 'react-router-dom';

export const Factura = () => {

    let { search } = useLocation();
    let query = new URLSearchParams(search);
    let numPdtos = 0;
    let subtotal = 0;

    const idVenta = query.get("idVenta");

    const [venta, setVenta] = useState();
    const [detalles, setDetalles] = useState([]);
    const [fecha, setFecha] = useState("");
    const [nombreCliente, setNombreCliente] = useState("");
    const [nombreVendedor, setNombreVendedor] = useState("");
    const [observaciones, setObservaciones] = useState([]);

    const history = useHistory();

    useEffect(() => {

        const buscarVenta = async () => {

            const ventaBD = await axiosPetition(`ventas/factura?idVenta=${idVenta}`);

            if (!ventaBD.ok) {
                return toast.error(ventaBD.msg, configMensaje);
            }

            setVenta(ventaBD.venta);

            const fecha = new Date(ventaBD.venta.fecha);

            setFecha(fecha.toLocaleDateString() + " " + fecha.getHours() + ":" + fecha.getMinutes());
        }

        buscarVenta();

    }, [search]);

    useEffect(() => {

        const buscarDetalles = async () => {

            const detalleBD = await axiosPetition(`detalle_venta/${idVenta}`);

            if (!detalleBD.ok) {
                return toast(detalleBD.msg, configMensaje);
            }

            setDetalles(detalleBD.detalle);

        }

        buscarDetalles();

    }, [venta, search]);

    useEffect(() => {

        const buscarCliente = async () => {

            const clienteBD = await axiosPetition(`clientes/${venta?.cliente}`);

            if (!clienteBD.ok) {
                return toast.error(clienteBD.msg, configMensaje);
            }

            setNombreCliente(clienteBD.cliente.nombre);
        }

        buscarCliente();

    }, [venta, search]);

    useEffect(() => {

        const buscarObs = async () => {

            const obsBD = await axiosPetition(`observaciones/${idVenta}`);

            if (!obsBD.ok) {
                return toast.error(obsBD.msg, configMensaje);
            }

            setObservaciones(obsBD.observaciones);

        }

        buscarObs();

    }, [venta, search]);

    useEffect(() => {

        const buscarVendedor = async () => {

            const idVendedor = localStorage.getItem("usuario");

            if (idVendedor === undefined) {
                history.push("/");
            } else {

                const vendedorBD = await axiosPetition(`usuarios/${idVendedor}`);

                if (!vendedorBD.ok) {
                    return toast.error(vendedorBD.msg, configMensaje);
                }

                setNombreVendedor(vendedorBD.usuario.nombre);
            }
        }

        buscarVendedor();

    }, [venta]);

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

    const imprimir = () => {
        window.print();
    }

    return (
        <div id="divFactura" className='flex justify-center h-screen'>
            <div className="flex flex-col">
                <h2 className="text-4xl mt-12 mb-8 titulo">Factura de venta</h2>
                <button
                    id="btnImprimir"
                    className="botonPrincipalInput text-white rounded-md mb-4 py-2"
                    onClick={imprimir}
                >Imprimir</button>
                <div className="bg-white flex flex-col items-center w-96 pl-4 pr-4" id="areaImprimir">
                    <img src={logo} className="w-80" />
                    <p className="font-bold text-sm">Nit. 90000029900</p>
                    <p className="font-bold">Panda Food</p>
                    <p className="text-sm">Calle 43a #2-22 - Brr El Recreo</p>
                    <p className="text-sm">Colombia</p>
                    <p className="text-sm">Fecha: {fecha}</p>
                    <p className="text-sm w-full text-left mt-4"> <span className="font-semibold">Vendedor:</span> {nombreVendedor}</p>
                    <p className="text-sm w-full text-left mt-2"> <span className="font-semibold">Cliente:</span> {nombreCliente}</p>
                    <table className="text-sm mt-4 mb-4 table-fixed w-full">
                        <thead className="border-b-2 border-gray-300">
                            <th className="font-semibold text-left w-10">
                                C
                            </th>
                            <th className="font-semibold w-40 text-left">
                                Descripción
                            </th>
                            <th className="font-semibold text-left w-30">
                                Precio/u
                            </th>
                            <th className="font-semibold text-left w-30">
                                Precio
                            </th>
                        </thead>
                        <tbody className=" border-b-2 border-gray-400">
                            {
                                detalles?.map((detalle) => {
                                    numPdtos += detalle.cantidad;
                                    subtotal += detalle.subtotal;
                                    return <ListaProductos detalle={detalle} />
                                })
                            }
                        </tbody>
                    </table>
                    <p className="text-xs w-full text-left">{numPdtos} Producto(s)</p>
                    <div className="w-full mr-9 text-sm text-right mb-4">
                        <p>Subtotal: <span className="font-semibold">${subtotal}</span></p>
                        <p>Descuento: <span className="font-semibold">${subtotal * (venta?.descuento / 100)}</span></p>
                        <p>Total: <span className="font-semibold">${venta?.total}</span></p>
                    </div>
                    <p className={`font-semibold text-sm w-full text-left mb-3 ${observaciones.length === 0 ? 'hidden' : ''}`}>Observaciones:</p>
                    <ul className="w-full text-left text-sm mb-8">
                        {
                            observaciones?.map((observacion) => {
                                return <li>{observacion.observacion}</li>
                            })
                        }
                    </ul>
                    <p className="font-semibold mb-8">¡Gracias por tu compra!</p>
                </div>
                <br />
            </div>
            <ToastContainer theme="dark" />
        </div>
    );
}
