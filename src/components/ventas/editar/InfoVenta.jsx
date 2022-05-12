import React, { useState, useRef, useEffect } from 'react';
import scooter from "../../../images/scooter.svg";
import shop from "../../../images/shop.svg";
import eshop from "../../../images/eshop.svg";
import redimir from "../../../images/puntos.svg";
import { axiosPetition } from '../../../helpers/Axios';
import { useForm } from '../../../hooks/useForm';
import { toast } from 'react-toastify';
import { useEditarVentaContext } from '../../../context/editarVentaContext';
import { useHistory } from 'react-router-dom';

export const InfoVenta = ({ setPasoSeleccionado, pasoSeleccionado }) => {

    const { editarVenta } = useEditarVentaContext();
    const precioDomicilio = useRef();
    const direccion = useRef(editarVenta?.direccionDomicilio);

    const [tipoVenta] = useState(editarVenta?.tipoVenta);
    const [desactivados, setDesactivados] = useState(false);

    const history = useHistory();

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


    useEffect(() => {

        if (editarVenta === undefined) {
            history.push("/ventas/consultar");
        } else if (tipoVenta === "Domicilio") {
            precioDomicilio.current.value = editarVenta.precioDomicilio;
        }
    }, []);

    useEffect(() => {
        if (editarVenta !== undefined) {
            if (editarVenta?.cliente !== '') {
                buscarCliente(editarVenta?.cliente);
            }
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

        if (editarVenta.direccionDomicilio.trim() === '') {
            direccion.current.value = busqueda.cliente.direccion;
            editarVenta.direccionDomicilio = direccion.current.value;
        } else {
            direccion.current.value = editarVenta.direccionDomicilio;
        }


        editarVenta.cliente = busqueda.cliente.cedula;
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-center mt-10 gap-20">
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl ${tipoVenta === "Domicilio" ? "itemTipoSeleccionado" : "itemTipo"}`}
                >
                    <img className="w-20 mt-4 mb-2" src={scooter} />
                    <h2 className="text-white">Domicilio</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl ${tipoVenta === "Restaurante" ? "itemTipoSeleccionado" : "itemTipo"}`}
                >
                    <img className="w-16 mt-3 mb-1" src={shop} />
                    <h2 className="text-white">Restaurante</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl ${tipoVenta === "Redimir" ? "itemTipoSeleccionado" : "itemTipo"}`}
                >
                    <img className="w-20" src={redimir} />
                    <h2 className="text-white ">Redimir Puntos</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl ${tipoVenta === "Plataformas" ? "itemTipoSeleccionado" : "itemTipo"}`}
                >
                    <img className="w-16 mt-4 mb-2" src={eshop} />
                    <h2 className="text-white">Pataformas</h2>
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
                    onChange={() => editarVenta.direccionDomicilio = direccion.current.value}
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
                        editarVenta.precioDomicilio = domicilio;
                    }}
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${tipoVenta === "Domicilio" ? "" : "hidden"}`}
                    placeholder="Precio del domicilio *"
                    autoComplete="off" />
            </form>
            <div className="flex flex-wrap justify-center mt-6">
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
