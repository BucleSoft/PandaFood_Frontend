import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import efectivo from '../../images/efectivo.svg';
import tarjeta from '../../images/tarjeta.svg';
import puntos from '../../images/puntos.svg';
import { useForm } from '../../hooks/useForm';
import { useVentaContext } from '../../context/ventaContext';
import '../../styles/formaPago.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';

export const FormaPago = ({ pasoSeleccionado, setPasoSeleccionado }) => {

    const { venta, setVenta } = useVentaContext();
    const [formaPago, setFormaPago] = useState(venta?.formaPago);

    const [pagoValues, handlePagoChange, resetPago, formatearTexto, setValues] = useForm({
        fecha: venta?.fecha,
        numVenta: venta?.numVenta,
        total: venta?.total
    });

    const { fecha, numVenta, total } = pagoValues;

    return (
        <div className="w-full p-12">
            <div className="flex flex-wrap justify-center mt-4">
                <input
                    type="date"
                    name="fecha"
                    value={fecha}
                    onChange={handlePagoChange}
                    className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                    placeholder="Fecha de venta"
                    autoComplete="off" />
                <input
                    type="number"
                    name="numVenta"
                    value={numVenta}
                    onChange={handlePagoChange}
                    className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                    placeholder="Número de venta"
                    autoComplete="off" />
                <input
                    type="number"
                    name="total"
                    value={total}
                    onChange={handlePagoChange}
                    className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                    placeholder="Total de venta"
                    autoComplete="off" />
            </div>
            <div className="flex justify-center mt-10 mb-20 mr-10 gap-28">
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-between border-4 rounded-xl cursor-pointer ${formaPago === 'Efectivo' ? 'itemPagoSeleccionado' : 'itemPago'}`}
                    onClick={() => {
                        setFormaPago("Efectivo");
                        venta.formaPago = "Efectivo";
                    }}>
                    <img className="w-16 mt-2" src={efectivo} />
                    <h2 className="text-white">Efectivo</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-between border-4 rounded-xl cursor-pointer ${formaPago === 'Tarjeta' ? 'itemPagoSeleccionado' : 'itemPago'}`}
                    onClick={() => {
                        setFormaPago("Tarjeta");
                        venta.formaPago = "Tarjeta";
                    }}>
                    <FontAwesomeIcon className="text-white mt-2 text-7xl" icon={faCcVisa} />
                    <h2 className="text-white">Tarjeta</h2>
                </section>
                <section
                    className={`flex flex-col w-48 h-28 items-center justify-center border-4 rounded-xl cursor-pointer ${formaPago === 'Puntos' ? 'itemPagoSeleccionado' : 'itemPago'}`}
                    onClick={() => {
                        setFormaPago("Puntos");
                        venta.formaPago = "Puntos";
                    }}>
                    <img className="w-20 mb-0" src={puntos} />
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
