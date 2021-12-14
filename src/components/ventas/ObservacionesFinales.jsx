import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useVentaContext } from '../../context/ventaContext';
import '../../styles/observaciones.css';
import { Observacion } from './Observacion';

export const ObservacionesFinales = ({ pasoSeleccionado, setPasoSeleccionado }) => {

    const { venta, setVenta } = useVentaContext();

    const [consume, setConsume] = useState(venta?.consume);

    const eliminarObs = async (index) => {
        await venta?.observaciones.splice(index, 1);
    }

    return (
        <div className="w-full p-12">

            <form className="mt-4 ml-16 flex flex-wrap justify-start w-full">
                <select
                    name="consume"
                    className={`w-80 p-2 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput`}
                    autoComplete="off"
                    value={consume}
                    onChange={(e) => {
                        setConsume(e.target.value);
                        venta.consume = e.target.value;
                    }}
                >
                    <option value="llevar">Para llevar</option>
                    <option value="restaurante">Comer en restaurante</option>
                </select>
                <select
                    name="mesa"
                    className={`w-80 p-2 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput`}
                    autoComplete="off">
                    <option >Mesa 1</option>
                    <option>Mesa 2</option>
                </select>
                <input
                    type="text"
                    name="nombre"
                    // value={nombre}
                    // onChange={handleClientesChange}
                    className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput`}
                    placeholder="Agregar observación"
                    autoComplete="off"
                // disabled={desactivados} 
                />
            </form>

            <section className={`w-full flex flex-col items-start ml-16 pr-40`}>
                <h2 className="text-white">Observaciones:</h2>
                <div id="contenedorObservaciones"
                    className="w-full border-4 border-dashed rounded-md mt-4 flex flex-wrap pb-4 pt-2 px-4">
                    {venta.observaciones?.map((data, key) => {
                        return <Observacion key={key} index={key} obs={data} eliminarObs={eliminarObs} />
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
                <Link to="/menu">
                    <button
                        type="button"
                        className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                    >
                        Imprimir comanda
                    </button>
                </Link>
                <button
                    type="submit"
                    className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput"
                    onClick={() => setPasoSeleccionado(pasoSeleccionado + 1)}>
                    Finalizar
                </button>
            </div>
        </div>
    );
}
