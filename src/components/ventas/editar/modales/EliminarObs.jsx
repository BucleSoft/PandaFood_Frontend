import React from "react";
import { toast } from "react-toastify";
import { axiosPetition } from "../../../../helpers/Axios";

export const EliminarObs = ({ hidden, setHidden, index, setBandera, bandera }) => {

    const eliminarObs = async () => {
        const eliminar = await axiosPetition(`observaciones/${index}`, {}, "DELETE");

        if (!eliminar.ok) {
            return toast.error(eliminar.msg, configMensaje);
        }

        setBandera(!bandera);
        setHidden(true);
    }

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

