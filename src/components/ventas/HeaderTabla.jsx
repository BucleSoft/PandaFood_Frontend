import React, { useState, useEffect } from 'react';
import { useCarritoContext } from '../../context/carritoContext';
import { TablaProductos } from './TablaProductos';
import '../../styles/cabeceraVenta.css';
import { Link } from 'react-router-dom'
import { useMenuContext } from '../../context/menuContext';
import Eliminar from '../../assets/eliminar.svg';
import { toast } from 'react-toastify';
import { Descuento } from './modales/Descuento';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useVentaContext } from '../../context/ventaContext';

export const HeaderTabla = ({ pasoSeleccionado, setPasoSeleccionado, bandera, setBandera, descuento, setDescuento, aplicarDescuento, total, puntosGanados }) => {

    const { carrito } = useCarritoContext();

    const { setActive } = useMenuContext();
    const { venta } = useVentaContext();

    const [hidden, setHidden] = useState(true);
    const [verPuntos, setVerPuntos] = useState(false);
    const [msgHidden, setMsgHidden] = useState(true);
    const [verificarAlRedimir, setVerificarAlRedimir] = useState(false);

    useEffect(() => {
        if (venta.tipoVenta === "Redimir") {
            setVerPuntos(true);
            venta.descuento = 0;
            setDescuento(0);
        }
        setBandera(!bandera);
    }, []);

    useEffect(() => {
        if (venta.tipoVenta === "Domicilio") {
            if (typeof venta.domicilio !== 'number') {
                venta.domicilio = 0;
            }
        }
    }, []);

    useEffect(() => {
        const verificarRedimir = async () => {
            if (venta.tipoVenta === "Redimir") {
                let sinPuntos = 0;
                await carrito.map((elemento) => {
                    if (elemento.puntos === '' || elemento.puntos === null || elemento.puntos === '0') {
                        sinPuntos += 1;
                    }
                });
                if (sinPuntos > 0) {
                    setMsgHidden(false);
                } else {
                    setMsgHidden(true);
                }
            }
        }
        verificarRedimir();
    }, [verificarAlRedimir]);

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
                <table className={`leading-normal w-full tabla ${carrito.length <= 0 ? "hidden" : ""}`}>
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                #
                            </th>
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
                            carrito?.map((datos, key) => {
                                return <TablaProductos key={key} props={datos} index={key} bandera={bandera} setBandera={setBandera} verPuntos={verPuntos} verificarAlRedimir={verificarAlRedimir} setVerificarAlRedimir={setVerificarAlRedimir} />
                            })
                        }
                        {
                            descuento !== 0 ?
                                <tr className="border-b-2">
                                    {/* NÚMERO */}
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">{carrito.length + 1}</p>
                                    </td>
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
                                                venta.descuento = 0;
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
                            venta.tipoVenta === "Domicilio" ?
                                <tr className="border-b-2">
                                    {/* NÚMERO */}
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">{descuento !== 0 ? carrito.length + 2 : carrito.length + 1}</p>
                                    </td>
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
                                        <p className="text-white whitespace-no-wrap">{venta.domicilio}</p>
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
                    <h2 className={`text-white text-lg ${carrito.length <= 0 ? "hidden" : ""}`}>Total: {verPuntos ? total + " pts" : "$" + total}</h2>
                    <h2 className={`text-white text-lg ${carrito.length <= 0 || verPuntos === true ? "hidden" : ""}`}>Puntos: {puntosGanados} pts</h2>
                </div>
                <div>
                    <h2
                        id="descuento"
                        className={`flex mt-2 underline cursor-pointer ${carrito.length <= 0 || verPuntos === true ? "hidden" : ""}`}
                        onClick={() => {
                            if (descuento !== 0) {
                                return toast.error("Ya se encuentra aplicado un descuento, borre el anterior.", configMensaje);
                            }

                            if (carrito.length <= 0) {
                                return toast.error("Primero ingresa productos a la venta, por favor.", configMensaje);
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
            <Descuento hidden={hidden} setHidden={setHidden} setDescuento={aplicarDescuento} />
        </div>
    )
}
