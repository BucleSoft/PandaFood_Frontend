import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useCarritoContext } from '../../context/carritoContext';
import "../../styles/ventas.css";
import { FormaPago } from './FormaPago';
import { HeaderTabla } from './HeaderTabla';
import { InfoVenta } from './InfoVenta';
import { ObservacionesFinales } from './ObservacionesFinales';
import { useVentaContext } from '../../context/ventaContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEditarVentaContext } from '../../context/editarVentaContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Ventas = () => {

    const { editarVenta } = useEditarVentaContext();
    const { venta, setVenta } = useVentaContext();
    const { carrito, setCarrito } = useCarritoContext();

    const history = useHistory();

    const [pasoSeleccionado, setPasoSeleccionado] = useState(1);
    const [total, setTotal] = useState(0);
    const [puntosGanados, setPuntosGanados] = useState(0);
    const [descuento, setDescuento] = useState(venta?.descuento);
    const [bandera, setBandera] = useState(false);
    const [reiniciar, setReiniciar] = useState(false);

    useEffect(() => {
        if (editarVenta !== undefined) {
            history.push("/ventas/editar");
        }
    }, [editarVenta]);

    useEffect(() => {
        carrito?.map((datos, index) => {
            if (datos === undefined || datos === '' || datos === null) {
                carrito.splice(index, 1);
            }
        });

        venta.vendedor = parseInt(window.localStorage.getItem("usuario"));
        console.log(venta.vendedor);
    }, []);

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
                if (venta.tipoVenta === "Domicilio" && venta.precioDomicilio !== "") {
                    setTotal((precioTotal - (precioTotal * decimalDescuento)) + venta.precioDomicilio);
                    venta.total = (precioTotal - (precioTotal * decimalDescuento)) + venta.precioDomicilio;
                } else {
                    setTotal(precioTotal - (precioTotal * decimalDescuento));
                    venta.total = precioTotal - (precioTotal * decimalDescuento);
                }
                setPuntosGanados(Math.floor((precioTotal - (precioTotal * decimalDescuento)) / 2000));
            } else if (descuento === 0) {
                if (venta.tipoVenta === "Domicilio" && venta.precioDomicilio !== "") {
                    setTotal(precioTotal + venta.precioDomicilio);
                    venta.total = precioTotal + venta.precioDomicilio;
                } else {
                    setTotal(precioTotal);
                    venta.total = precioTotal;
                }
                setPuntosGanados(Math.floor(precioTotal / 2000));
            }

            venta.puntosGanados = puntosGanados;
        }

        calcularTotal();
    }, [bandera, descuento, carrito]);

    useEffect(() => {

        const calcularPuntos = async () => {
            let totalPuntos = 0;
            await carrito?.forEach((e) => {
                const subtotal = e.puntos * e.cantidad;
                totalPuntos += subtotal;
            });
            setTotal(totalPuntos);
        }

        if (venta.tipoVenta === "Redimir") {
            setDescuento(0);
            calcularPuntos();
            venta.total = total;
        }

    }, [bandera]);

    const aplicarDescuento = (descuento) => {
        setDescuento(descuento);
        venta.descuento = descuento;
        setBandera(!bandera);
    }

    const mostrarContenido = () => {
        switch (pasoSeleccionado) {
            case 1:
                return <InfoVenta setPasoSeleccionado={setPasoSeleccionado} pasoSeleccionado={pasoSeleccionado} total={total} setTotal={setTotal} bandera={bandera} setBandera={setBandera} descuento={descuento} setDescuento={setDescuento} aplicarDescuento={aplicarDescuento} reiniciar={reiniciar} setReiniciar={setReiniciar} />;
            case 2:
                return <HeaderTabla setPasoSeleccionado={setPasoSeleccionado} pasoSeleccionado={pasoSeleccionado} total={total} setTotal={setTotal} puntosGanados={puntosGanados} bandera={bandera} setBandera={setBandera} descuento={descuento} setDescuento={setDescuento} aplicarDescuento={aplicarDescuento} />
            case 3:
                return <FormaPago setPasoSeleccionado={setPasoSeleccionado} pasoSeleccionado={pasoSeleccionado} total={total} setTotal={setTotal} bandera={bandera} setBandera={setBandera} descuento={descuento} setDescuento={setDescuento} aplicarDescuento={aplicarDescuento} />
            case 4:
                return <ObservacionesFinales setPasoSeleccionado={setPasoSeleccionado} pasoSeleccionado={pasoSeleccionado} />
        }
    }

    const reiniciarVenta = () => {
        setVenta({
            identificador: '',
            fecha: null,
            tipoVenta: 'Restaurante',
            formaPago: 'Efectivo',
            precioDomicilio: '',
            direccionDomicilio: '',
            consume: 'restaurante',
            idMesa: '',
            cliente: '',
            vendedor: parseInt(window.localStorage.getItem("usuario")),
            productos: [],
            observaciones: [],
            total: 0,
            puntosGanados: 0,
            descuento: 0
        });

        setCarrito([]);
        setPasoSeleccionado(1);
        setReiniciar(true);
    }

    return (
        <div className="w-full h-screen justify-start overflow-y-scroll">
            <section className='absolute right-8 bottom-8 flex flex-col justify-center overflow-hidden'>

                <button
                    id='botonAgregar'
                    className='rounded-full w-12 h-12 flex items-center justify-center shadow-md'
                    title='Cancelar venta'
                    onClick={reiniciarVenta} >
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
                            onClick={() => setPasoSeleccionado(1)}>
                            1
                        </button>
                        <h2 className={`${pasoSeleccionado === 1 ? "" : "hidden"}`}>Información de la venta</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button
                            className={`w-12 h-12 mb-2 text-white font-bold text-xl rounded-full ${pasoSeleccionado === 2 ? "itemVentaActivado" : "itemVenta"} `}
                            onClick={() => setPasoSeleccionado(2)}>
                            2
                        </button>
                        <h2 className={`${pasoSeleccionado === 2 ? "" : "hidden"}`}>Lista de productos</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button
                            className={`w-12 h-12 mb-2 text-white font-bold text-xl rounded-full ${pasoSeleccionado === 3 ? "itemVentaActivado" : "itemVenta"} `}
                            onClick={() => setPasoSeleccionado(3)}>
                            3
                        </button>
                        <h2 className={`${pasoSeleccionado === 3 ? "" : "hidden"}`}>Forma de pago</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button
                            className={`w-12 h-12 mb-2 text-white font-bold text-xl rounded-full ${pasoSeleccionado === 4 ? "itemVentaActivado" : "itemVenta"} `}
                            onClick={() => setPasoSeleccionado(4)}>
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
