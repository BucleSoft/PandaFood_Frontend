import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useCarritoContext } from '../../context/carritoContext';
import "../../styles/ventas.css";
import { FormaPago } from './FormaPago';
import { HeaderTabla } from './HeaderTabla';
import { InfoVenta } from './InfoVenta';
import { ObservacionesFinales } from './ObservacionesFinales';

export const Ventas = () => {

    const [pasoSeleccionado, setPasoSeleccionado] = useState(1);

    const { carrito } = useCarritoContext();

    useEffect(() => {
        carrito?.map((datos, index) => {
            console.log(datos);
            if (datos === undefined || datos === '' || datos === null) {
                carrito.splice(index, 1);
            }
        });
    }, []);

    const mostrarContenido = () => {
        switch (pasoSeleccionado) {
            case 1:
                return <InfoVenta setPasoSeleccionado={setPasoSeleccionado} pasoSeleccionado={pasoSeleccionado} />;
            case 2:
                return <HeaderTabla setPasoSeleccionado={setPasoSeleccionado} pasoSeleccionado={pasoSeleccionado} />
            case 3:
                return <FormaPago setPasoSeleccionado={setPasoSeleccionado} pasoSeleccionado={pasoSeleccionado} />
            case 4:
                return <ObservacionesFinales setPasoSeleccionado={setPasoSeleccionado} pasoSeleccionado={pasoSeleccionado} />
        }
    }

    return (
        <div className="w-full h-screen justify-start overflow-y-scroll">
            <section className="flex flex-col items-center">
                <div className="flex pt-12 gap-14">
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button
                            className={`w-12 h-12 mb-2 text-white font-bold text-xl rounded-full ${pasoSeleccionado === 1 ? "itemVentaActivado" : "itemVenta"} `}
                            onClick={() => setPasoSeleccionado(1)}>
                            1
                        </button>
                        <h2 className={`${pasoSeleccionado === 1 ? "" : "hidden"}`}>Información de la venta</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button
                            className={`w-12 h-12 mb-2 text-white font-bold text-xl rounded-full ${pasoSeleccionado === 2 ? "itemVentaActivado" : "itemVenta"} `}
                            onClick={() => setPasoSeleccionado(2)}>
                            2
                        </button>
                        <h2 className={`${pasoSeleccionado === 2 ? "" : "hidden"}`}>Lista de productos</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button
                            className={`w-12 h-12 mb-2 text-white font-bold text-xl rounded-full ${pasoSeleccionado === 3 ? "itemVentaActivado" : "itemVenta"} `}
                            onClick={() => setPasoSeleccionado(3)}>
                            3
                        </button>
                        <h2 className={`${pasoSeleccionado === 3 ? "" : "hidden"}`}>Forma de pago</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button
                            className={`w-12 h-12 mb-2 text-white font-bold text-xl rounded-full ${pasoSeleccionado === 4 ? "itemVentaActivado" : "itemVenta"} `}
                            onClick={() => setPasoSeleccionado(4)}>
                            4
                        </button>
                        <h2 className={`${pasoSeleccionado === 4 ? "" : "hidden"}`}>Observaciones finales</h2>
                    </div>
                </div>
                {
                    mostrarContenido()
                }
            </section>
            <ToastContainer theme="dark" />
        </div>
    );
}
