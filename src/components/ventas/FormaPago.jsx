import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useVentaContext } from '../../context/ventaContext';
import '../../styles/formaPago.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';
import puntos from '../../images/puntos.svg';
import { faPaperPlane, faDollarSign } from '@fortawesome/free-solid-svg-icons';


export const FormaPago = ({ pasoSeleccionado, setPasoSeleccionado, bandera, setBandera, total }) => {

    const { venta } = useVentaContext();
    const [formaPago, setFormaPago] = useState(venta?.formaPago);
    const [tipoVenta] = useState(venta?.tipoVenta);

    const [pagoValues, handlePagoChange] = useForm({
        fecha: new Date(venta?.fecha).toLocaleDateString(),
        identificador: venta?.identificador,
    });

    const { fecha, identificador } = pagoValues;

    useEffect(() => {
        setBandera(!bandera);
    }, []);

    return (
        <div className="w-full p-12">
            <div className="ml-16 flex flex-wrap mt-4">
                <div className="flex flex-col">
                    <label className='text-white text-left' htmlFor='numVenta'>Número de venta:</label>
                    <input
                        type="text"
                        name="identificador"
                        value={identificador}
                        title="Número de venta"
                        onChange={handlePagoChange}
                        className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                        placeholder="Número de venta"
                        autoComplete="off"
                        disabled />
                </div>
                <div className='flex flex-col'>
                    <label className='text-white text-left' htmlFor='fecha'>Fecha de venta:</label>
                    <input
                        type="text"
                        name="fecha"
                        title="Fecha de venta"
                        value={fecha}
                        onChange={handlePagoChange}
                        className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                        placeholder="Fecha de venta"
                        autoComplete="off"
                        disabled />
                </div>
                <div className="flex flex-col">
                    <label className='text-white text-left' htmlFor='numVenta'>Total de venta:</label>
                    <input
                        type="text"
                        name="total"
                        title="Total de venta"
                        value={venta.tipoVenta === "Redimir" ? total + " pts" : total}
                        onChange={handlePagoChange}
                        className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                        placeholder="Total de venta"
                        autoComplete="off"
                        disabled />
                </div>
                <div className={`flex flex-col ${formaPago === 'Transferencia' ? '' : 'hidden'}`}>
                    <label className={`text-white text-left`} htmlFor='numVenta'>Banco:</label>
                    <input
                        type="text"
                        name="banco"
                        title="Banco de transferencia"
                        className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                        placeholder="Banco del que se transfiere"
                        autoComplete="off"
                    />
                </div>
            </div>
            <div className="flex justify-center mt-10 mb-20 mr-10 gap-28">
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-between border-4 rounded-xl cursor-pointer ${formaPago === 'Efectivo' ? 'itemPagoSeleccionado' : 'itemPago'} ${tipoVenta === "Redimir" ? "hidden" : ""} `}
                    onClick={() => {
                        setFormaPago("Efectivo");
                        venta.formaPago = "Efectivo";
                    }}>
                    <FontAwesomeIcon className="text-white mt-2 text-7xl" icon={faDollarSign} />
                    <h2 className="text-white">Efectivo</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-between border-4 rounded-xl cursor-pointer ${formaPago === 'Tarjeta' ? 'itemPagoSeleccionado' : 'itemPago'} ${tipoVenta === "Redimir" ? "hidden" : ""}`}
                    onClick={() => {
                        setFormaPago("Tarjeta");
                        venta.formaPago = "Tarjeta";
                    }}>
                    <FontAwesomeIcon className="text-white mt-2 text-7xl" icon={faCcVisa} />
                    <h2 className="text-white">Tarjeta</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-between border-4 rounded-xl cursor-pointer ${formaPago === 'Transferencia' ? 'itemPagoSeleccionado' : 'itemPago'} ${tipoVenta === "Redimir" ? "hidden" : ""}`}
                    onClick={() => {
                        setFormaPago("Transferencia");
                        venta.formaPago = "Transferencia";
                    }}>
                    <FontAwesomeIcon className="text-white mt-2 text-7xl" icon={faPaperPlane} />
                    <h2 className="text-white">Transfencia</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-between border-4 rounded-xl cursor-pointer ${formaPago === 'Puntos' ? 'itemPagoSeleccionado' : 'itemPago'} ${tipoVenta !== "Redimir" ? "hidden" : ""}`}
                    onClick={() => {
                        setFormaPago("Puntos");
                        venta.formaPago = "Puntos";
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
