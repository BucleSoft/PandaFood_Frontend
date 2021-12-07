import React, { useState, useRef } from 'react';
import scooter from "../../images/scooter.svg";
import shop from "../../images/shop.svg";
import eshop from "../../images/eshop.svg";
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';

export const InfoVenta = ({ setPasoSeleccionado, pasoSeleccionado }) => {

    const [tipoVenta, setTipoVenta] = useState("Restaurante");

    const [desactivados, setDesactivados] = useState(false);

    const [clientesValues, handleClientesChange, resetClientes, formatearTexto, setValues] = useForm({
        cedula: '',
        nombre: '',
        direccion: '',
        celular: '',
        puntos: '',
        estado: 'Activo'
    });

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


    const buscarCliente = async () => {

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
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-center mt-10 gap-28">
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl cursor-pointer ${tipoVenta === "Domicilio" ? "itemTipoSeleccionado" : "itemTipo"}`}
                    onClick={() => setTipoVenta("Domicilio")}>
                    <img className="w-20 mb-0" src={scooter} />
                    <h2 className="text-white">Domicilio</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl cursor-pointer ${tipoVenta === "Restaurante" ? "itemTipoSeleccionado" : "itemTipo"}`}
                    onClick={() => setTipoVenta("Restaurante")}>
                    <img className="w-16" src={shop} />
                    <h2 className="text-white">Restaurante</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl cursor-pointer ${tipoVenta === "Venta en linea" ? "itemTipoSeleccionado" : "itemTipo"}`}
                    onClick={() => setTipoVenta("Venta en linea")}>
                    <img className="w-16" src={eshop} />
                    <h2 className="text-white">Ventas Online</h2>
                </section>
            </div>
            <form className="mt-16 mx-28 flex flex-wrap justify-start w-full">
                <input
                    type="number"
                    name="cedula"
                    value={cedula}
                    onChange={handleClientesChange}
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${desactivados ? "formInputInactive" : ""}`}
                    placeholder="Cédula del cliente"
                    autoComplete="off"
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            buscarCliente();
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
                    placeholder="Nombre del cliente"
                    autoComplete="off"
                    disabled={desactivados} />
                <input
                    type="number"
                    name="celular"
                    value={celular}
                    onChange={handleClientesChange}
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${desactivados ? "formInputInactive" : ""}`}
                    placeholder="Celular del cliente"
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
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${tipoVenta === "Domicilio" ? "" : "hidden"}`}
                    placeholder="Precio del domicilio"
                    autoComplete="off" />
            </form>
            <div className="flex flex-wrap justify-center mt-6">
                <button
                    type="button"
                    className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput">
                    Registrar cliente
                </button>
                <button
                    type="button"
                    className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                    onClick={() => {
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
