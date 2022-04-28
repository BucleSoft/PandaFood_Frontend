import React, { useState, useEffect } from 'react';
// import { TablaProductos } from './TablaProductos';
import '../../../styles/cabeceraVenta.css';
import { Link } from 'react-router-dom'
import { useMenuContext } from '../../../context/menuContext';
import Eliminar from '../../../assets/eliminar.svg';
import { toast } from 'react-toastify';
import { Descuento } from './modales/Descuento';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useEditarVentaContext } from "../../../context/editarVentaContext";
import { axiosPetition } from "../../../helpers/Axios";
import { TablaProductos } from './TablaProductos';
import { useCarritoContext } from '../../../context/carritoContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const HeaderTabla = ({ pasoSeleccionado, setPasoSeleccionado, bandera, setBandera, descuento = 0, setDescuento, total, puntosGanados, detalles, setDetalles }) => {

    const history = useHistory();
    const { editarVenta } = useEditarVentaContext();

    const { setActive } = useMenuContext();

    const { carrito } = useCarritoContext();

    const [hidden, setHidden] = useState(true);
    const [verPuntos, setVerPuntos] = useState(false);
    const [msgHidden, setMsgHidden] = useState(true);
    const [verificarAlRedimir, setVerificarAlRedimir] = useState(false);


    useEffect(() => {
        if (editarVenta === undefined) {
            history.push("/ventas/consultar");
        }
    }, [editarVenta]);

    useEffect(() => {
        if (editarVenta.tipoVenta === "Redimir") {
            setVerPuntos(true);
            editarVenta.descuento = 0;
            setDescuento(0);
        }
        setBandera(!bandera);
    }, []);

    useEffect(() => {
        if (editarVenta?.tipoVenta === "Domicilio") {
            if (typeof editarVenta?.precioDomicilio !== 'number') {
                editarVenta.precioDomicilio = 0;
            }
        }
    }, []);

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

    return (
        <div className="w-full">
            <div className="p-12">
                <table className={`leading-normal w-full tabla `}>
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Identificador
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Nombre del producto
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Cantidad
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                {
                                    verPuntos === false ?
                                        "Precio"
                                        :
                                        "Puntos"
                                }
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Subtotal
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            detalles?.map((detalle, index) => {
                                detalle.identificador = detalle.id_producto;
                                return <TablaProductos props={detalle} index={index} verPuntos={verPuntos} key={index} fuente="BD" bandera={bandera} setBandera={setBandera} />
                            })
                        }
                    </tbody>
                    <tbody>
                        {
                            carrito?.map((producto, index) => {
                                return <TablaProductos props={producto} index={index} verPuntos={verPuntos} key={index} fuente="Carrito" bandera={bandera} setBandera={setBandera} />
                            })
                        }
                    </tbody>
                    <tbody>
                        {
                            descuento !== 0 ?
                                <tr className="border-b-2">
                                    {/* IDENTIFICADOR */}
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">-</p>
                                    </td>
                                    {/* NOMBRE PRODUCTO */}
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white whitespace-no-wrap">Descuento</p>
                                    </td>
                                    {/* CANTIDAD */}
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">-</p>
                                    </td>
                                    {/* PUNTOS/PRECIO */}
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">-</p>
                                    </td>
                                    {/* SUBTOTAL */}
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white whitespace-no-wrap">{descuento}%</p>
                                    </td>
                                    {/* ACCIONES */}
                                    <td className="flex px-10 py-3 text-sm justify-left">
                                        <img
                                            className="tablaItem" src={Eliminar}
                                            onClick={() => {
                                                editarVenta.descuento = 0;
                                                setDescuento(0);
                                                setBandera(!bandera);
                                            }}
                                            alt="ícono eliminar"
                                        ></img>
                                    </td>
                                </tr>
                                :
                                ''
                        }
                        {
                            editarVenta?.tipoVenta === "Domicilio" ?
                                <tr className="border-b-2">
                                    {/* IDENTIFICADOR */}
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">-</p>
                                    </td>
                                    {/* NOMBRE PRODUCTO */}
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white whitespace-no-wrap">Domicilio</p>
                                    </td>
                                    {/* CANTIDAD */}
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">-</p>
                                    </td>
                                    {/* PUNTOS/PRECIO */}
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">-</p>
                                    </td>
                                    {/* SUBTOTAL */}
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white whitespace-no-wrap">{editarVenta.precioDomicilio}</p>
                                    </td>
                                    {/* ACCIONES */}
                                    <td className="flex px-10 py-3 text-sm justify-left">

                                    </td>
                                </tr>
                                :
                                ''
                        }
                    </tbody>
                </table>
                <div className="flex mt-4 justify-between">
                    <h2 className={`text-white text-lg`}>Total: {verPuntos ? total + " pts" : "$" + total}</h2>
                    <h2 className={`text-white text-lg `}>Puntos: {puntosGanados} pts</h2>
                </div>
                <div>
                    <h2
                        id="descuento"
                        className={`flex mt-2 underline cursor-pointer`}
                        onClick={() => {
                            if (descuento !== 0) {
                                return toast.error("Ya se encuentra aplicado un descuento, borre el anterior.", configMensaje);
                            }

                            setHidden(false);
                        }}>Aplicar descuento</h2>
                </div>
                <h2 className={`text-red-500 font-semibold ${msgHidden ? 'hidden' : ''}`}><FontAwesomeIcon icon={faExclamationCircle} /> No se podrán redimir los puntos debido a que hay productos que no tienen asignado un precio en puntos.</h2>
                <div className="flex flex-wrap justify-center mt-12">
                    <button
                        type="button"
                        className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                        onClick={() => setPasoSeleccionado(pasoSeleccionado - 1)}
                    >
                        Anterior
                    </button>
                    <Link to="/menu">
                        <button
                            type="button"
                            className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                            onClick={() => setActive("menu")}
                        >
                            Agregar productos
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput"
                        onClick={() => setPasoSeleccionado(pasoSeleccionado + 1)}>
                        Siguiente
                    </button>
                </div>
            </div>

        </div>
    )
}
