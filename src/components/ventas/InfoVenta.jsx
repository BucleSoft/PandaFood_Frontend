import React, { useState, useRef, useEffect } from 'react';
import scooter from "../../images/scooter.svg";
import shop from "../../images/shop.svg";
import eshop from "../../images/eshop.svg";
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';
import { useVentaContext } from '../../context/ventaContext';

export const InfoVenta = ({ setPasoSeleccionado, pasoSeleccionado }) => {


    const { venta, setVenta } = useVentaContext();

    const domicilio = useRef();

    const [tipoVenta, setTipoVenta] = useState(venta.tipoVenta);

    const [desactivados, setDesactivados] = useState(false);

    const [initValues, setInitValues] = useState({
        cedula: '',
        nombre: '',
        direccion: '',
        celular: '',
        puntos: '',
        estado: 'Activo'
    });

    const [clientesValues, handleClientesChange, resetClientes, formatearTexto, setValues] = useForm(initValues);

    const { cedula, nombre, direccion, celular, puntos } = clientesValues;

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

        if (venta?.cliente !== undefined && venta?.cliente !== '') {
            buscarCliente(venta.cliente);
        }

        domicilio.current.value = venta.domicilio;
    }, []);


    const buscarCliente = async (cedula) => {

        if (cedula === '') {
            return toast.error("Digita una cédula válida", configMensaje);
        }

        await axiosPetition(`clientes/${cedula}`);

        if (!respuesta.ok) {
            return toast.error("Error al obtener al cliente, contacte a los desarrolladores.", configMensaje);
        }

        if (respuesta.cliente === null) {
            return toast.error("No se encontró el cliente, procede a registrarlo.", configMensaje);
        }

        setDesactivados(true);

        setValues({
            cedula: respuesta.cliente.cedula,
            nombre: respuesta.cliente.nombre,
            direccion: respuesta.cliente.direccion,
            celular: respuesta.cliente.celular,
            puntos: respuesta.cliente.puntos,
            estado: 'Activo'
        });

        venta.cliente = respuesta.cliente.cedula;
    }

    const registrarCliente = async () => {

        if (puntos === '') {
            clientesValues.puntos = 0;
        }

        await axiosPetition("clientes", clientesValues, "POST");

        if (!respuesta.ok) {
            return toast.error(respuesta.msg, configMensaje);
        }

        toast.success("Cliente registrado correctamente.", configMensaje);
        setDesactivados(true);

    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-center mt-10 gap-28">
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl cursor-pointer ${tipoVenta === "Domicilio" ? "itemTipoSeleccionado" : "itemTipo"}`}
                    onClick={() => {
                        setTipoVenta("Domicilio");
                        venta.tipoVenta = "Domicilio";
                    }}>
                    <img className="w-20 mb-0" src={scooter} />
                    <h2 className="text-white">Domicilio</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl cursor-pointer ${tipoVenta === "Restaurante" ? "itemTipoSeleccionado" : "itemTipo"}`}
                    onClick={() => {
                        setTipoVenta("Restaurante");
                        venta.tipoVenta = "Restaurante";
                    }}>
                    <img className="w-16" src={shop} />
                    <h2 className="text-white">Restaurante</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl cursor-pointer ${tipoVenta === "Venta en linea" ? "itemTipoSeleccionado" : "itemTipo"}`}
                    onClick={() => {
                        setTipoVenta("Venta en linea");
                        venta.tipoVenta = "Venta en linea";
                    }}>
                    <img className="w-16" src={eshop} />
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
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${desactivados ? "formInputInactive" : ""}`}
                    placeholder="Celular del cliente *"
                    autoComplete="off"
                    disabled={desactivados} />
                <input
                    type="text"
                    name="direccion"
                    value={direccion}
                    onChange={handleClientesChange}
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${desactivados ? "formInputInactive" : ""}`}
                    placeholder="Dirección del cliente"
                    autoComplete="off"
                    disabled={desactivados} />
                <input
                    type="number"
                    name="puntos"
                    value={puntos}
                    onChange={handleClientesChange}
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${desactivados ? "formInputInactive" : ""}`}
                    placeholder="Puntos del cliente"
                    autoComplete="off"
                    disabled={desactivados} />
                <input
                    type="number"
                    name="domicilio"
                    ref={domicilio}
                    onChange={() => venta.domicilio = domicilio.current.value}
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
                        venta.domicilio = '';
                        domicilio.current.value = '';
                        resetClientes();
                        setDesactivados(false);
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
