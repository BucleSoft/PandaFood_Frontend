import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { axiosPetition } from '../../helpers/Axios';
import { EliminarObs } from './modales/EliminarObs';
import { Observacion } from './Observacion';
import { useVentaContext } from '../../context/ventaContext';
import { useCarritoContext } from '../../context/carritoContext';
import '../../styles/observaciones.css';
import { NuevaMesa } from './modales/NuevaMesa';

export const ObservacionesFinales = ({ pasoSeleccionado, setPasoSeleccionado }) => {

    const { venta, setVenta } = useVentaContext();
    const { carrito, setCarrito } = useCarritoContext();

    const observacion = useRef('');
    const mesa = useRef(-1);

    const [consume, setConsume] = useState(venta?.consume);
    const [observaciones, setObservaciones] = useState(venta?.observaciones);
    const [hidden, setHidden] = useState(true);
    const [hiddenMesa, setHiddenMesa] = useState(true);
    const [indexObs, setIndexObs] = useState();
    const [mesas, setMesas] = useState([]);
    const [bandera, setBandera] = useState(false);

    useEffect(() => {
        const buscarMesas = async () => {
            const busqueda = await axiosPetition("mesas");

            if (!busqueda.ok) {
                return toast.error(busqueda.msg, configMensaje);
            }

            setMesas(busqueda.mesas);
        }
        buscarMesas();
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

    const registrarVenta = async () => {

        venta.productos = carrito;

        let peticion;

        if (venta.tipoVenta === "Domicilio") {
            peticion = await axiosPetition("ventas/domicilio", venta, "POST");
        } else {
            peticion = await axiosPetition("ventas", venta, "POST");
        }

        if (!peticion.ok) {
            return toast.error(peticion.msg, configMensaje);
        }

        toast.success("Venta registrada!", configMensaje);
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
            vendedor: '',
            productos: [],
            observaciones: [],
            total: 0,
            puntosGanados: 0,
            descuento: 0,
            plataforma: "",
            banco: ""
        });
        setCarrito([]);
        setPasoSeleccionado(1);
    }

    return (
        <div className="w-full p-12">

            <form className="mt-4 ml-16 flex flex-wrap justify-start w-full">
                <select
                    name="consume"
                    className={`w-80 p-2 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${venta.tipoVenta === "Redimir" || venta.tipoVenta === "Domicilio" ? "hidden" : ""}`}
                    autoComplete="off"
                    value={consume}
                    onChange={(e) => {
                        if (e.target.value === "llevar") {
                            venta.idMesa = "";
                            mesa.current.value = -1;
                        }
                        setConsume(e.target.value);
                        venta.consume = e.target.value;
                    }}
                >
                    <option value="restaurante" defaultValue>Comer en restaurante</option>
                    <option value="llevar">Para llevar</option>
                </select>
                <select
                    name="mesa"
                    ref={mesa}
                    className={`w-80 p-2 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${venta.tipoVenta === "Redimir" ? "hidden" : ""} ${consume !== "restaurante" || venta.tipoVenta === "Domicilio" ? "hidden" : ""}`}
                    autoComplete="off"
                    onChange={() => {
                        venta.idMesa = mesa.current.value;
                    }}
                    defaultChecked={mesa}
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
                    className={`p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${venta.tipoVenta === "Redimir" || venta.tipoVenta === "Domicilio" ? "w-96" : "w-80"}`}
                    placeholder="Agregar observación"
                    autoComplete="off"
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            const obs = observacion.current.value.trim();

                            if (obs.length === 0) {
                                toast.error("No se puede agregar una observación vacía.", configMensaje);
                            } else {
                                setObservaciones([...observaciones, obs]);
                                venta.observaciones.push(obs);
                                observacion.current.value = "";
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
                        return <Observacion key={key} index={key} obs={data} hidden={hidden} setHidden={setHidden} setIndexObs={setIndexObs} />
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
                    onClick={registrarVenta}
                >
                    Finalizar
                </button>
            </div>
            <EliminarObs hidden={hidden} setHidden={setHidden} observaciones={observaciones} index={indexObs} />
            <NuevaMesa hidden={hiddenMesa} setHidden={setHiddenMesa} bandera={bandera} setBandera={setBandera} />
        </div>
    );
}
