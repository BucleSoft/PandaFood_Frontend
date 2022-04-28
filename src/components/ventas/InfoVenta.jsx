import React, { useState, useRef, useEffect } from 'react';
import scooter from "../../images/scooter.svg";
import shop from "../../images/shop.svg";
import eshop from "../../images/eshop.svg";
import redimir from "../../images/puntos.svg";
import { axiosPetition } from '../../helpers/Axios';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';
import { useVentaContext } from '../../context/ventaContext';

export const InfoVenta = ({ setPasoSeleccionado, pasoSeleccionado, bandera, setBandera, reiniciar, setReiniciar }) => {


    const { venta } = useVentaContext();

    const precioDomicilio = useRef();
    const direccion = useRef(venta.direccion);

    const [tipoVenta, setTipoVenta] = useState(venta.tipoVenta);
    const [desactivados, setDesactivados] = useState(false);
    const [auxiliar, setAuxiliar] = useState(false);

    const [initValues, setInitValues] = useState({
        cedula: '',
        nombre: '',
        celular: '',
        puntos: '',
        estado: 'Activo'
    });

    const [clientesValues, handleClientesChange, resetClientes, formatearTexto, setValues] = useForm(initValues);

    const { cedula, nombre, celular, puntos } = clientesValues;

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

    const obtenerInfo = async () => {
        const consulta = await axiosPetition("server/fecha");
        venta.fecha = consulta.fecha;
    }

    const obtenerMax = async () => {
        if (venta.identificador === '') {
            const max = await axiosPetition("ventas/max");
            venta.identificador = max.maxCodigo;
        }
    }

    useEffect(() => {
        if (reiniciar) {
            limpiarCliente();
            setTipoVenta('Restaurante');
            setReiniciar(false);
        }
        obtenerMax();
    }, [venta]);

    useEffect(() => {
        obtenerInfo();
        obtenerMax();
    }, []);

    useEffect(() => {

        if (venta?.cliente !== undefined && venta?.cliente !== '') {
            buscarCliente(venta.cliente);
        }

        precioDomicilio.current.value = venta.precioDomicilio;
    }, [auxiliar]);

    useEffect(() => {
        if (venta.cliente !== '') {
            if (tipoVenta !== 'Domicilio') {
                limpiarCliente();
            }
            buscarCliente(venta.cliente);
        }
    }, [tipoVenta]);


    const buscarCliente = async (cedula) => {

        if (cedula === '') {
            return toast.error("Digita una cédula válida", configMensaje);
        }

        const busqueda = await axiosPetition(`clientes/${cedula}`);

        if (!busqueda.ok) {
            return toast.error("No se ha encontrado el cliente, procede a registrarlo.", configMensaje);
        }

        if (busqueda.cliente === null) {
            return toast.error("No se encontró el cliente, procede a registrarlo.", configMensaje);
        }

        setDesactivados(true);

        setValues({
            cedula: busqueda.cliente.cedula,
            nombre: busqueda.cliente.nombre,
            celular: busqueda.cliente.celular,
            puntos: busqueda.cliente.puntos,
            estado: 'Activo'
        });

        if (venta.direccionDomicilio.trim() === '') {
            direccion.current.value = busqueda.cliente.direccion;
            venta.direccionDomicilio = direccion.current.value;
        } else {
            direccion.current.value = venta.direccionDomicilio;
        }


        venta.cliente = busqueda.cliente.cedula;
    }

    const registrarCliente = async () => {

        if (puntos === '') {
            clientesValues.puntos = 0;
        }

        clientesValues.direccion = direccion.current.value;

        const clientes = await axiosPetition("clientes", clientesValues, "POST");

        if (!clientes.ok) {
            return toast.error(clientes.msg, configMensaje);
        }

        toast.success("Cliente registrado correctamente.", configMensaje);
        setDesactivados(true);

    }

    const limpiarCliente = () => {
        venta.precioDomicilio = '';
        venta.direccionDomicilio = '';
        precioDomicilio.current.value = '';
        direccion.current.value = '';
        resetClientes();
        setDesactivados(false);
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-center mt-10 gap-20">
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl cursor-pointer ${tipoVenta === "Domicilio" ? "itemTipoSeleccionado" : "itemTipo"}`}
                    onClick={() => {
                        setTipoVenta("Domicilio");
                        venta.tipoVenta = "Domicilio";
                        venta.formaPago = "Efectivo";
                        venta.precioDomicilio = '';
                        setAuxiliar(!auxiliar);
                    }}>
                    <img className="w-20 mt-4 mb-2" src={scooter} />
                    <h2 className="text-white">Domicilio</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl cursor-pointer ${tipoVenta === "Restaurante" ? "itemTipoSeleccionado" : "itemTipo"}`}
                    onClick={() => {
                        setTipoVenta("Restaurante");
                        venta.tipoVenta = "Restaurante";
                        setBandera(!bandera);
                        venta.formaPago = "Efectivo";
                        venta.precioDomicilio = '';
                        setAuxiliar(!auxiliar);
                    }}>
                    <img className="w-16 mt-3 mb-1" src={shop} />
                    <h2 className="text-white">Restaurante</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl cursor-pointer ${tipoVenta === "Redimir" ? "itemTipoSeleccionado" : "itemTipo"}`}
                    onClick={() => {
                        setTipoVenta("Redimir");
                        venta.tipoVenta = "Redimir";
                        venta.formaPago = "Puntos";
                        setBandera(!bandera);
                        venta.precioDomicilio = '';
                        setAuxiliar(!auxiliar);
                    }}>
                    <img className="w-20" src={redimir} />
                    <h2 className="text-white ">Redimir Puntos</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl cursor-pointer ${tipoVenta === "Venta en linea" ? "itemTipoSeleccionado" : "itemTipo"}`}
                    onClick={() => {
                        setTipoVenta("Venta en linea");
                        venta.tipoVenta = "Venta en linea";
                        venta.formaPago = "Efectivo";
                        venta.precioDomicilio = '';
                        setAuxiliar(!auxiliar);
                    }}>
                    <img className="w-16 mt-4 mb-2" src={eshop} />
                    <h2 className="text-white">Ventas en línea</h2>
                </section>
            </div>
            <form className="mt-16 mx-28 flex flex-wrap justify-start w-full">
                <input
                    type="number"
                    name="cedula"
                    value={cedula}
                    onChange={handleClientesChange}
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${desactivados ? "formInputInactive" : ""}`}
                    placeholder="Cédula del cliente *"
                    autoComplete="off"
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            buscarCliente(cedula);
                        }
                    }}
                    disabled={desactivados}
                    autoFocus
                />
                <input
                    type="text"
                    name="nombre"
                    value={nombre}
                    onChange={handleClientesChange}
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${desactivados ? "formInputInactive" : ""}`}
                    placeholder="Nombre del cliente *"
                    autoComplete="off"
                    disabled={desactivados} />
                <input
                    type="number"
                    name="celular"
                    value={celular}
                    onChange={handleClientesChange}
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${desactivados ? "formInputInactive" : ""} ${cedula === 0 ? 'hidden' : ''}`}
                    placeholder="Celular del cliente *"
                    autoComplete="off"
                    disabled={desactivados} />
                <input
                    type="text"
                    name="direccion"
                    ref={direccion}
                    onChange={() => venta.direccionDomicilio = direccion.current.value}
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${desactivados && tipoVenta !== "Domicilio" ? "formInputInactive" : ""} ${(cedula === 0 && tipoVenta !== 'Domicilio') ? 'hidden' : ''}`}
                    placeholder={tipoVenta === 'Domicilio' ? "Dirección del cliente*" : "Dirección del cliente"}
                    autoComplete="off"
                    disabled={tipoVenta === "Domicilio" || !desactivados ? false : true} />
                <input
                    type="number"
                    name="puntos"
                    value={puntos}
                    onChange={handleClientesChange}
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${desactivados ? "formInputInactive" : ""} ${cedula === 0 ? 'hidden' : ''}`}
                    placeholder="Puntos del cliente"
                    autoComplete="off"
                    disabled={desactivados} />
                <input
                    type="number"
                    name="precioDomicilio"
                    ref={precioDomicilio}
                    onChange={() => {
                        let domicilio = parseInt(precioDomicilio.current.value);
                        if (isNaN(domicilio)) {
                            domicilio = 0;
                        }
                        venta.precioDomicilio = domicilio;
                    }}
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${tipoVenta === "Domicilio" ? "" : "hidden"}`}
                    placeholder="Precio del domicilio *"
                    autoComplete="off" />
            </form>
            <div className="flex flex-wrap justify-center mt-6">
                <button
                    type="button"
                    className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                    onClick={registrarCliente}
                    disabled={desactivados}>
                    Registrar cliente
                </button>
                <button
                    type="button"
                    className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                    onClick={() => {
                        venta.cliente = '';
                        limpiarCliente();
                    }}>
                    Limpiar
                </button>
                <button
                    type="submit"
                    className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput"
                    onClick={() => {
                        setPasoSeleccionado(pasoSeleccionado + 1);
                    }}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}
