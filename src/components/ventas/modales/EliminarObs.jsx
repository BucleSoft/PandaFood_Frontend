import React from "react";
import { useVentaContext } from "../../../context/ventaContext";

export const EliminarObs = ({ hidden, setHidden, observaciones, index }) => {

    const { venta } = useVentaContext();

    const eliminarObs = () => {
        observaciones.splice(index, 1);
        venta.observaciones = observaciones;
        setHidden(true);
    }

    return (
        <div
            id="fondoModal"
            className={`absolute top-0 h-full w-full flex justify-center items-center text-white cursor-pointer ${hidden ? "hidden" : ''}`}
        >
            <div
                id="modal"
                className="bg-white rounded-2xl border-2 border-gray-500 mr-96 px-20 py-10 cursor-default"
            >
                <h2 className="text-2xl mb-4 text-white">¿Eliminar observación?</h2>
                <button
                    type="submit"
                    className="w-14 mr-2 py-2 px-3 rounded-md botonPrincipalInput"
                    onClick={eliminarObs}>Sí</button>
                <button
                    type="submit"
                    className="w-14 py-2 px-3 rounded-md botonInput"
                    onClick={() => setHidden(true)}
                >No</button>
            </div>
        </div>
    );
}

