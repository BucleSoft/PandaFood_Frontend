import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

export const Descuento = ({ hidden, setHidden, descuento = '', setDescuento }) => {

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

    const descuentoVenta = useRef();

    useEffect(() => {
        descuentoVenta.current.focus();
    });

    const aplicarDescuento = async (e) => {
        e.preventDefault();
        if (descuentoVenta.current.value.trim().length === 0) {
            return toast.error('Ingrese el valor del descuento.', configMensaje);
        }

        if (descuentoVenta.current.value <= 0) {
            return toast.error('El descuento debe ser un valor positivo y mayor a cero.', configMensaje);
        }
        setDescuento(parseInt(descuentoVenta.current.value));
        setHidden(true);

    }

    return (
        <div
            id="fondoModal"
            className={`absolute top-0 h-full w-full flex justify-center items-center text-white cursor-pointer ${hidden ? "hidden" : ''}`}
        >
            <div
                id="modal"
                className="bg-white rounded-2xl border-2 border-gray-500 mr-96 px-40 py-10 cursor-default"
            >
                <h2 className="text-3xl mb-4 titulo">Aplicar descuento</h2>
                <form onSubmit={aplicarDescuento}>
                    <input
                        type="number"
                        defaultValue={descuento}
                        ref={descuentoVenta}
                        className="focus:outline-none text-5xl text-center border-b-2 border-white w-40 formInput h-auto rounded-sm" type="number"></input>
                    <div className="mt-6">
                        <button
                            type="button"
                            className="py-2 px-3 mr-4 rounded-md botonInput" onClick={(e) => {
                                e.preventDefault();
                                setHidden(true);
                            }}>Cancelar</button>
                        <button
                            type="submit"
                            className="py-2 px-3 rounded-md botonPrincipalInput">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

