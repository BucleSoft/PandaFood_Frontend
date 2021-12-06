import React from 'react';
import "../../styles/ventas.css";

export const Ventas = () => {
    return (
        <div lassName="w-full h-screen justify-start overflow-y-scroll">
            <section className="px-24 flex flex-col items-center">
                <div className="flex pt-12">
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button className="w-12 h-12 mb-2 text-white font-bold text-xl rounded-full itemVentaActivado">
                            1
                        </button>
                        <h2 className="">Información de la venta</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button className="w-12 h-12 mb-2 text-white font-bold text-xl rounded-full itemVenta">
                            2
                        </button>
                        <h2 className="hidden">Información de la venta</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button className="w-12 h-12 mb-2 text-white font-bold text-xl rounded-full itemVenta">
                            3
                        </button>
                        <h2 className="hidden">Información de la venta</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button className="w-12 h-12 mb-2 text-white font-bold text-xl rounded-full itemVenta">
                            4
                        </button>
                        <h2 className="hidden">Información de la venta</h2>
                    </div>
                    <div className="flex flex-col w-48 text-white items-center justify-start">
                        <button className="w-12 h-12 mb-2 text-white font-bold text-xl rounded-full itemVenta">
                            5
                        </button>
                        <h2 className="hidden">Información de la venta</h2>
                    </div>

                </div>
            </section>
        </div>
    );
}
