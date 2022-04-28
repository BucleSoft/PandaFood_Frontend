import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "../../../styles/ventas.css";
import { FormaPago } from './FormaPago';
import { HeaderTabla } from './HeaderTabla';
import { InfoVenta } from './InfoVenta';
import { ObservacionesFinales } from './ObservacionesFinales';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { axiosPetition } from '../../../helpers/Axios';
import { useEditarVentaContext } from '../../../context/editarVentaContext';
import { useHistory } from 'react-router-dom';
import { useCarritoContext } from '../../../context/carritoContext';

export const EditarVenta = () => {

    const history = useHistory();

    const { editarVenta } = useEditarVentaContext();
    const { carrito } = useCarritoContext();

    const [pasoSeleccionado, setPasoSeleccionado] = useState(1);
    const [total, setTotal] = useState(0);
    const [puntosGanados, setPuntosGanados] = useState(editarVenta?.puntosGanados);
    const [descuento, setDescuento] = useState(editarVenta?.descuento);
    const [bandera, setBandera] = useState(false);
    const [reiniciar, setReiniciar] = useState(false);
    const [detalles, setDetalles] = useState([]);

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
        if (editarVenta === undefined) {
            history.push("/ventas/consultar");
        }
    }, [editarVenta]);

    useEffect(() => {
        carrito?.map((datos, index) => {
            if (datos === undefined || datos === '' || datos === null) {
                carrito.splice(index, 1);
            }
        });
    }, []);

    useEffect(() => {

        const buscarDetalle = async () => {
            const busqueda = await axiosPetition(`detalle_venta/${editarVenta.identificador}`);

            if (!busqueda.ok) {
                return toast.error(busqueda.msg, configMensaje);
            }

            const { detalle } = busqueda;

            setDetalles([...detalle]);
        }

        buscarDetalle();

    }, []);

    useEffect(() => {
        if (editarVenta?.descuento === 0) {
            setDescuento(0);
            editarVenta.descuento = 0;
        }
    }, [bandera]);

    useEffect(() => {

        const calcularTotal = () => {
            let suma = 0;

            detalles?.map((detalle) => {
                suma += detalle.subtotal;
            });

            if (carrito.length > 0) {
                carrito.map((producto) => {
                    suma += producto.precio * producto.cantidad;
                });
            }

            if (editarVenta?.tipoVenta === "Domicilio") {
                suma += editarVenta?.precioDomicilio;
            }

            if (editarVenta?.descuento !== 0 || editarVenta?.descuento !== null) {
                const descuento = editarVenta?.descuento / 100;
                suma -= (suma * descuento);
            }

            setTotal(suma);
            editarVenta.total = suma;

            const puntos = Math.floor(suma / 2000);

            if (puntos < 200) {
                setPuntosGanados(puntos);
                editarVenta.puntosGanados = puntos;
            } else {
                setPuntosGanados(200);
                editarVenta.puntosGanados = 200;
            }
        }

        calcularTotal();
    }, [bandera]);

    const mostrarContenido = () => {
        switch (pasoSeleccionado) {
            case 1:
                return <InfoVenta setPasoSeleccionado={setPasoSeleccionado} pasoSeleccionado={pasoSeleccionado} total={total} setTotal={setTotal} bandera={bandera} setBandera={setBandera} descuento={descuento} setDescuento={setDescuento} reiniciar={reiniciar} setReiniciar={setReiniciar} />;
            case 2:
                return <HeaderTabla setPasoSeleccionado={setPasoSeleccionado} pasoSeleccionado={pasoSeleccionado} total={total} setTotal={setTotal} puntosGanados={puntosGanados} bandera={bandera} setBandera={setBandera} descuento={descuento} setDescuento={setDescuento} detalles={detalles} setDetalles={setDetalles} />
            case 3:
                return <FormaPago setPasoSeleccionado={setPasoSeleccionado} pasoSeleccionado={pasoSeleccionado} total={total} setTotal={setTotal} bandera={bandera} setBandera={setBandera} descuento={descuento} setDescuento={setDescuento} />
            case 4:
                return <ObservacionesFinales setPasoSeleccionado={setPasoSeleccionado} pasoSeleccionado={pasoSeleccionado} />
        }
    }

    return (
        <div className="w-full h-screen justify-start overflow-y-scroll">
            <section className='absolute right-8 bottom-8 flex flex-col justify-center overflow-hidden'>

                <button
                    id='botonAgregar'
                    className='rounded-full w-12 h-12 flex items-center justify-center shadow-md'
                    title='Cancelar venta'
                >
                    <FontAwesomeIcon className='text-white text-2xl font-normal' icon={faTimes}>
                    </FontAwesomeIcon>
                </button>

                <Link to="/ventas/consultar">
                    <button
                        id='botonCarrito'
                        className='rounded-full w-12 h-12 mt-4 flex items-center justify-center shadow-md'
                        title='Consultar ventas'>
                        <FontAwesomeIcon className='text-white text-2xl font-normal' icon={faSearch}>
                        </FontAwesomeIcon>
                    </button>
                </Link>
            </section>
            <section className="flex flex-col items-center">
                <div className="flex pt-12 gap-14">
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button
                            className={`w-12 h-12 mb-2 text-white font-bold text-xl rounded-full ${pasoSeleccionado === 1 ? "itemVentaActivado" : "itemVenta"} `}
                            onClick={() => {
                                if (editarVenta !== undefined) {
                                    setPasoSeleccionado(1);
                                } else {
                                    history.push("/ventas/consultar");
                                }
                            }}>
                            1
                        </button>
                        <h2 className={`${pasoSeleccionado === 1 ? "" : "hidden"}`}>Información de la venta</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button
                            className={`w-12 h-12 mb-2 text-white font-bold text-xl rounded-full ${pasoSeleccionado === 2 ? "itemVentaActivado" : "itemVenta"} `}
                            onClick={() => {
                                if (editarVenta !== undefined) {
                                    setPasoSeleccionado(2);
                                } else {
                                    history.push("/ventas/consultar");
                                }
                            }}>
                            2
                        </button>
                        <h2 className={`${pasoSeleccionado === 2 ? "" : "hidden"}`}>Lista de productos</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button
                            className={`w-12 h-12 mb-2 text-white font-bold text-xl rounded-full ${pasoSeleccionado === 3 ? "itemVentaActivado" : "itemVenta"} `}
                            onClick={() => {
                                if (editarVenta !== undefined) {
                                    setPasoSeleccionado(3);
                                } else {
                                    history.push("/ventas/consultar");
                                }
                            }}>
                            3
                        </button>
                        <h2 className={`${pasoSeleccionado === 3 ? "" : "hidden"}`}>Forma de pago</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button
                            className={`w-12 h-12 mb-2 text-white font-bold text-xl rounded-full ${pasoSeleccionado === 4 ? "itemVentaActivado" : "itemVenta"} `}
                            onClick={() => {
                                if (editarVenta !== undefined) {
                                    setPasoSeleccionado(4);
                                } else {
                                    history.push("/ventas/consultar");
                                }
                            }}>
                            4
                        </button>
                        <h2 className={`${pasoSeleccionado === 4 ? "" : "hidden"}`}>Observaciones finales</h2>
                    </div>
                </div>
                {
                    mostrarContenido()
                }
            </section>
            <ToastContainer theme="dark" />
        </div>
    );
}
