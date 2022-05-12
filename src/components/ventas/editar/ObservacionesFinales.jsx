import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { axiosPetition } from '../../../helpers/Axios';
import { EliminarObs } from "./modales/EliminarObs";
import { Observacion } from './Observacion';
import '../../../styles/observaciones.css';
import { useEditarVentaContext } from '../../../context/editarVentaContext';
import { useHistory } from 'react-router-dom';
import { useCarritoContext } from '../../../context/carritoContext';
import { NuevaMesa } from '../modales/NuevaMesa';

export const ObservacionesFinales = ({ pasoSeleccionado, setPasoSeleccionado, calcularTotal }) => {

    const history = useHistory();

    const { editarVenta } = useEditarVentaContext();
    const { carrito } = useCarritoContext();

    const observacion = useRef('');

    const [consume, setConsume] = useState(editarVenta?.consume);
    const [mesa, setMesa] = useState(editarVenta?.idMesa);
    const [observaciones, setObservaciones] = useState([]);
    const [hidden, setHidden] = useState(true);
    const [hiddenMesa, setHiddenMesa] = useState(true);
    const [indexObs, setIndexObs] = useState();
    const [mesas, setMesas] = useState([]);
    const [bandera, setBandera] = useState(false);
    const [banderaMesa, setBanderaMesa] = useState(false);

    useEffect(() => {
        const buscarMesas = async () => {
            const busqueda = await axiosPetition("mesas");

            if (!busqueda.ok) {
                return toast.error(busqueda.msg, configMensaje);
            }

            setMesas(busqueda.mesas);
        }
        buscarMesas();
    }, [banderaMesa]);

    useEffect(() => {
        if (editarVenta === undefined) {
            history.push("/ventas/consultar");
        }
    }, [editarVenta]);

    useEffect(() => {

        const bucarObservaciones = async () => {

            if (editarVenta.observaciones !== undefined && editarVenta.observaciones.length !== 0) {

                const obs = editarVenta.observaciones;

                console.log("OBSERVACIONES", obs)

                const registrarPendientes = await axiosPetition(`observaciones/registrar/${editarVenta.identificador}`, { observaciones: obs }, "POST");

                if (!registrarPendientes.ok) {
                    return toast.error(registrarPendientes.msg, configMensaje);
                }

                editarVenta.observaciones = [];
            }

            const busqueda = await axiosPetition(`observaciones/${editarVenta?.identificador}`);

            if (!busqueda.ok) {
                return toast.error(busqueda.msg, configMensaje);
            }

            setObservaciones(busqueda.observaciones);
        }

        bucarObservaciones();

    }, [bandera, editarVenta]);

    useEffect(() => {
        calcularTotal();
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

    const agregarObservacion = async () => {

        const agregarObs = await axiosPetition("observaciones", { id_venta: editarVenta?.identificador, observacion: observacion.current.value }, "POST");

        if (!agregarObs.ok) {
            return toast.error(agregarObs.msg, configMensaje);
        }

        setBandera(!bandera);
        observacion.current.value = "";
    }

    const actualizarVenta = () => {

        const actualizar = async () => {

            console.log("CARRITO", carrito);

            const peticion = await axiosPetition(`ventas/editar/${editarVenta.identificador}`, { infoVenta: editarVenta, carrito }, "PUT");

            console.log(peticion);

            if (!peticion.ok) {
                return toast.error(peticion.msg, configMensaje);
            }
            history.push("/ventas/consultar");
            return toast.success(peticion.msg, configMensaje);

        }

        actualizar();
    }

    return (
        <div className="w-full p-12">

            <form className="mt-4 ml-16 flex flex-wrap justify-start w-full">
                <select
                    name="consume"
                    className={`w-80 p-2 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${editarVenta !== undefined ? (editarVenta.tipoVenta === "Redimir" || editarVenta.tipoVenta) === "Domicilio" ? "hidden" : "" : ""}`}
                    autoComplete="off"
                    value={consume}
                    onChange={(e) => {
                        if (e.target.value === "llevar") {
                            editarVenta.idMesa = "";
                            mesa.current.value = -1;
                        }
                        setConsume(e.target.value);
                        editarVenta.consume = e.target.value;
                    }}
                >
                    <option value="restaurante" defaultValue>Comer en restaurante</option>
                    <option value="llevar">Para llevar</option>
                </select>
                <select

                    name="mesa"
                    value={mesa}
                    className={`w-80 p-2 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${editarVenta !== undefined ? editarVenta.tipoVenta === "Redimir" ? "hidden" : "" : ""} ${editarVenta !== undefined ? consume !== "restaurante" || editarVenta.tipoVenta === "Domicilio" ? "hidden" : "" : ""}`}
                    autoComplete="off"
                    onChange={(e) => {

                        const value = e.target.value;
                        setMesa(value);
                        if (value.trim() !== "-1") {
                            editarVenta.idMesa = e.target.value;
                        } else {
                            editarVenta.idMesa = null;
                        }

                    }}
                >
                    <option value={-1}>Selecciona una mesa</option>
                    {
                        mesas?.map((mesa) => {
                            return <option key={mesa.identificador} value={mesa.identificador}>{mesa.nombre}</option>
                        })
                    }
                </select>
                <input
                    type="text"
                    name="observacion"
                    ref={observacion}
                    className={`p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${editarVenta !== undefined ? editarVenta.tipoVenta === "Redimir" || editarVenta.tipoVenta === "Domicilio" ? "w-96" : "w-80" : ""}`}
                    placeholder="Agregar observación"
                    autoComplete="off"
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            const obs = observacion.current.value.trim();

                            if (obs.length === 0) {
                                toast.error("No se puede agregar una observación vacía.", configMensaje);
                            } else {
                                agregarObservacion();
                            }

                        }
                    }}
                />
            </form>

            <section className={`w-full flex flex-col items-start ml-16 pr-40`}>
                <h2 className="text-white">Observaciones:</h2>
                <div id="contenedorObservaciones"
                    className="w-full border-4 border-dashed rounded-md mt-4 flex flex-wrap pb-4 pt-2 px-4">
                    {observaciones?.map((data, key) => {
                        return <Observacion key={key} index={data.id} obs={data.observacion} hidden={hidden} setHidden={setHidden} setIndexObs={setIndexObs} />
                    })}
                </div>
            </section>

            <div className="flex flex-wrap justify-center mt-12">
                <button
                    type="button"
                    className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                    onClick={() => setPasoSeleccionado(pasoSeleccionado - 1)}
                >
                    Anterior
                </button>
                <button
                    type="button"
                    className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                    onClick={() => setHiddenMesa(false)}
                >
                    Registrar mesas
                </button>
                <button
                    type="submit"
                    className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput"
                    onClick={actualizarVenta}
                >
                    Finalizar
                </button>
            </div>
            <EliminarObs hidden={hidden} setHidden={setHidden} index={indexObs} setBandera={setBandera} bandera={bandera} />
            <NuevaMesa hidden={hiddenMesa} setHidden={setHiddenMesa} bandera={banderaMesa} setBandera={setBanderaMesa} />
        </div >
    );
}
