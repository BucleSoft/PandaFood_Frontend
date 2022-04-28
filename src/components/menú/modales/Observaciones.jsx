import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosPetition } from '../../../helpers/Axios';
import { useCarritoContext } from '../../../context/carritoContext';
import { useVentaContext } from '../../../context/ventaContext';
import { useEditarVentaContext } from '../../../context/editarVentaContext';
import { CantidadInput } from './CantidadInput';

export const Observaciones = ({ hidden = true, productoSeleccionado = 0, setHidden }) => {

    const { venta } = useVentaContext();
    const { editarVenta } = useEditarVentaContext();
    const { carrito } = useCarritoContext();
    const [insumos, setInsumos] = useState([]);
    const [listaObservaciones, setListaObservaciones] = useState([]);
    const [listaExcepciones, setListaExcepciones] = useState([]);
    const [numObs, setNumObs] = useState(0);
    const [bandera, setBandera] = useState(false);

    const [max, setMax] = useState(1);
    const observacion = useRef();

    useEffect(() => {

        const buscarInsumos = async () => {
            if (productoSeleccionado !== 0) {
                const producto = await axiosPetition(`detalle_producto/${productoSeleccionado}`);
                if (!producto.ok) {
                    return toast.error(producto.msg, configMensaje);
                }
                setInsumos(producto.insumos);
            }
        }

        const calcularMax = () => {
            carrito.map((dato) => {
                if (dato.identificador === productoSeleccionado) {
                    setMax(dato.cantidad);
                }
            });
        }

        buscarInsumos();
        calcularMax();

    }, [productoSeleccionado, hidden]);

    useEffect(() => {
        setNumObs(listaObservaciones.length);
    }, [bandera]);

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

    const agregarObservacion = () => {
        if (observacion.current.value.trim() === '') {
            return toast.error("Ingresa una observación, por favor", configMensaje);
        }
        listaObservaciones.push(observacion.current.value);
        setBandera(!bandera);
        observacion.current.value = '';
    }

    const quitarObservacion = (index) => {
        listaObservaciones.splice(index, 1);
        setBandera(!bandera);
    }

    const reiniciarModal = () => {
        setListaObservaciones([]);
        observacion.current.value = '';
        setListaExcepciones([]);
        setMax(1);
        setBandera(!bandera);
    }

    return (
        <div
            id="fondoModal"
            className={`absolute top-0 h-full w-full flex justify-center items-center text-white cursor-pointer ${hidden ? "hidden" : ''}`}
        >
            <div
                id="modal"
                className="rounded-2xl border-2 border-gray-500 mr-96 px-4 w-1/3 h-5/6 cursor-default flex flex-col items-center overflow-scroll"
            >
                <h2 className="text-2xl mb-10 text-white mt-14">Agregar Observaciones</h2>
                <table className="leading-normal w-full">
                    <thead className="pb-2">
                        <tr>
                            <th className='font-normal mb-2 text-left pl-4'>Observación</th>
                            <th className="font-normal mb-2">N° Productos (Máx {max})</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            insumos?.map((dato, index) => {
                                let insumoEnLista = false;
                                const i = listaExcepciones.find(elemento => elemento.identificador === dato.identificador);
                                if (i !== -1 && i !== undefined) {
                                    insumoEnLista = true;
                                }
                                return <CantidadInput key={index} identificador={dato.identificador} nombre={dato.nombre.toLowerCase()} insumoEnLista={insumoEnLista} max={max} bandera={bandera} setBandera={setBandera} productoSeleccionado={productoSeleccionado} listaExcepciones={listaExcepciones} />
                            })
                        }
                    </tbody>
                </table>
                <h2 className='text-white w-full text-left mt-8'>N° de observaciones: {numObs}</h2>
                <input
                    className='formInput  w-full h-16 outline-none border-2 border-gray-500 pl-4 rounded-md'
                    placeholder='Descripción detallada para cocina'
                    ref={observacion}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            agregarObservacion();

                        }
                    }} />
                <div className='flex flex-wrap'>
                    {
                        listaObservaciones?.map((dato, index) => {
                            return <p
                                className='filtro py-1 px-3 rounded-full mr-2 mt-4 cursor-pointer'
                                key={index}
                                onClick={() => quitarObservacion(index)}>{dato}</p>
                        })
                    }
                </div>
                <button
                    onClick={() => {
                        setHidden(true);
                        if (listaObservaciones.length !== 0) {
                            carrito.map((dato) => {
                                if (dato.identificador === productoSeleccionado) {
                                    dato.observaciones = listaObservaciones;
                                }
                            });

                            if (editarVenta === undefined) {
                                venta.observaciones.push(...listaObservaciones);
                            } else {
                                const obs = editarVenta.observaciones;

                                if (obs === undefined) {

                                    editarVenta.observaciones = [];

                                }

                                editarVenta.observaciones.push(...listaObservaciones);
                            }
                        }
                        reiniciarModal();
                    }}
                    className='botonPrincipalInput rounded-full shadow-lg px-20 py-1 mt-10 mb-10'
                    autoFocus>Confirmar</button>
            </div>
        </div >
    );
}
