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
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { useVentaContext } from '../../context/ventaContext';

export const HeaderTabla = ({ pasoSeleccionado, setPasoSeleccionado }) => {

    const { carrito } = useCarritoContext();

    const { setActive } = useMenuContext();
    const { venta } = useVentaContext();

    const [total, setTotal] = useState(0);
    const [puntosVenta, setPuntosVenta] = useState(0);
    const [bandera, setBandera] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [descuento, setDescuento] = useState(venta?.descuento);
    const [verPuntos, setVerPuntos] = useState(false);

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

    useEffect(() => {
        if (carrito.length <= 0) {
            setDescuento(0);
            venta.descuento = 0;
        }
    }, [bandera]);

    useEffect(() => {
        const calcularTotal = () => {
            let precioTotal = 0;
            carrito?.forEach((e) => {
                const subtotal = e.precio * e.cantidad;
                precioTotal += subtotal;
            });

            if (descuento > 0) {
                const decimalDescuento = descuento / 100;
                setTotal(precioTotal - (precioTotal * decimalDescuento));
            } else if (descuento === 0) {
                setTotal(precioTotal);
            }
            setPuntosVenta(Math.floor(precioTotal / 2000));
        }

        calcularTotal();
    }, [bandera, descuento]);

    const aplicarDescuento = (descuento) => {
        setDescuento(descuento);
        venta.descuento = descuento;
        setBandera(!bandera);
    }

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
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer"
                                onClick={() => setVerPuntos(!verPuntos)}>
                                {
                                    verPuntos === false ?
                                        "Precio"
                                        :
                                        "Puntos"
                                }
                                <FontAwesomeIcon className="text-gray-400" icon={faRandom} />
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Subtotal
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Puntos
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
                                return <TablaProductos key={key} props={datos} index={key} bandera={bandera} setBandera={setBandera} verPuntos={verPuntos} />
                            })
                        }
                        {
                            descuento !== 0 ?
                                <tr className="border-b-2">
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">{carrito.length + 1}</p>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">-</p>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white whitespace-no-wrap">Descuento</p>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">-</p>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white whitespace-no-wrap">{descuento}%</p>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">-</p>
                                    </td>
                                    <td className="px-9 py-3 text-sm text-left">
                                        <p className="text-white font-semibold whitespace-no-wrap">-</p>
                                    </td>
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
                    </tbody>
                </table>
                <div className="flex mt-4 justify-between">
                    <h2 className={`text-white text-lg ${carrito.length <= 0 ? "hidden" : ""}`}>Total: ${total}</h2>
                    <h2 className={`text-white text-lg ${carrito.length <= 0 ? "hidden" : ""}`}>Puntos: {puntosVenta} pts</h2>
                </div>
                <div>
                    <h2
                        id="descuento"
                        className={`flex mt-2 underline cursor-pointer ${carrito.length <= 0 ? "hidden" : ""}`}
                        onClick={() => {
                            if (descuento !== 0) {
                                return toast.error("Ya se encuentra aplicado un descuento, borre el anterior.", configMensaje);
                            }

                            if (carrito.length <= 0) {
                                return toast.error("Primero ingresa productos a la venta, por favor.", configMensaje);
                            }
                            setHidden(false);
                            console.log(carrito)
                        }}>Aplicar descuento</h2>
                </div>
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
