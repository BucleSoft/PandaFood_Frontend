import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import efectivo from '../../../images/efectivo.svg';
import { useForm } from '../../../hooks/useForm';
import '../../../styles/formaPago.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';
import puntos from '../../../images/puntos.svg';
import { useEditarVentaContext } from '../../../context/editarVentaContext';
import { useHistory } from 'react-router-dom';
import { faDollarSign, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


export const FormaPago = ({ pasoSeleccionado, setPasoSeleccionado, bandera, setBandera, total }) => {

    const history = useHistory();
    const { editarVenta } = useEditarVentaContext();

    useEffect(() => {
        if (editarVenta === undefined) {
            history.push("/ventas/consultar");
        }
    }, [editarVenta]);

    const [formaPago, setFormaPago] = useState(editarVenta?.formaPago);
    const [tipoVenta] = useState(editarVenta?.tipoVenta);


    const [pagoValues, handlePagoChange] = useForm({
        fecha: new Date(editarVenta?.fecha).toLocaleDateString(),
        identificador: editarVenta?.identificador,
    });

    const { fecha, identificador } = pagoValues;

    useEffect(() => {
        setBandera(!bandera);
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

    return (
        <div className="w-full p-12">
            <div className="flex flex-wrap justify-center mt-4">
                <div className="flex flex-col">
                    <label className='text-white text-left' htmlFor='numVenta'>Número de Venta:</label>
                    <input
                        type="text"
                        name="identificador"
                        value={identificador}
                        title="Número de Venta"
                        onChange={handlePagoChange}
                        className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                        placeholder="Número de Venta"
                        autoComplete="off"
                        disabled />
                </div>
                <div className='flex flex-col'>
                    <label className='text-white text-left' htmlFor='fecha'>Fecha de Venta:</label>
                    <input
                        type="text"
                        name="fecha"
                        title="Fecha de Venta"
                        value={fecha}
                        onChange={handlePagoChange}
                        className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                        placeholder="Fecha de Venta"
                        autoComplete="off"
                        disabled />
                </div>
                <div className="flex flex-col">
                    <label className='text-white text-left' htmlFor='numVenta'>Total de Venta:</label>
                    <input
                        type="text"
                        name="total"
                        title="Total de Venta"
                        value={editarVenta !== undefined ? editarVenta.tipoVenta === "Redimir" ? total + " pts" : total : ""}
                        onChange={handlePagoChange}
                        className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                        placeholder="Total de Venta"
                        autoComplete="off"
                        disabled />
                </div>
            </div>
            <div className="flex justify-center mt-10 mb-20 mr-10 gap-28">
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-between border-4 rounded-xl cursor-pointer ${formaPago === 'Efectivo' ? 'itemPagoSeleccionado' : 'itemPago'} ${tipoVenta === "Redimir" ? "hidden" : ""} `}
                    onClick={() => {
                        if (formaPago !== "Efectivo") {
                            editarVenta.formaPago = 'Efectivo';
                            setFormaPago(editarVenta.formaPago);
                        }
                    }}>
                    <FontAwesomeIcon className="text-white mt-2 text-7xl" icon={faDollarSign} />
                    <h2 className="text-white">Efectivo</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-between border-4 rounded-xl cursor-pointer ${formaPago === 'Tarjeta' ? 'itemPagoSeleccionado' : 'itemPago'} ${tipoVenta === "Redimir" ? "hidden" : ""}`}
                    onClick={() => {
                        if (formaPago !== "Tarjeta") {
                            editarVenta.formaPago = 'Tarjeta';
                            setFormaPago(editarVenta.formaPago);
                        }
                    }}>
                    <FontAwesomeIcon className="text-white mt-2 text-7xl" icon={faCcVisa} />
                    <h2 className="text-white">Tarjeta</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-between border-4 rounded-xl cursor-pointer ${formaPago === 'Transferencia' ? 'itemPagoSeleccionado' : 'itemPago'} ${tipoVenta === "Redimir" ? "hidden" : ""}`}
                    onClick={() => {
                        if (formaPago !== "Transferencia") {
                            editarVenta.formaPago = 'Transferencia';
                            setFormaPago(editarVenta.formaPago);
                        }
                    }}>
                    <FontAwesomeIcon className="text-white mt-2 text-7xl" icon={faPaperPlane} />
                    <h2 className="text-white">Transfencia</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-between border-4 rounded-xl cursor-pointer ${formaPago === 'Puntos' ? 'itemPagoSeleccionado' : 'itemPago'} ${tipoVenta !== "Redimir" ? "hidden" : ""}`}
                    onClick={() => {
                        if (formaPago !== "Puntos") {
                            editarVenta.formaPago = 'Puntos';
                            setFormaPago(editarVenta.formaPago);
                        }
                    }}>
                    <img src={puntos} />
                    <h2 className="text-white">Puntos</h2>
                </section>
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
                    >
                        Limpiar
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
    );
}
