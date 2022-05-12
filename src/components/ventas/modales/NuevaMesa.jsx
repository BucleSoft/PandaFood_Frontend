import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { axiosPetition } from '../../../helpers/Axios';

export const NuevaMesa = ({ hidden, setHidden, bandera, setBandera }) => {

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

    const [idMesa, setIdMesa] = useState(0);
    const [nombreMesa, setNombreMesa] = useState("");

    useEffect(() => {
        maxMesa();
        setNombreMesa("");
    }, [bandera]);

    const maxMesa = async () => {

        const max = await axiosPetition("mesas/max");

        if (!max.ok) {
            return toast.error(max.msg, configMensaje);
        }

        setIdMesa(max.maxCodigo);

    }

    const crearMesa = async (e) => {

        e.preventDefault();

        const creacion = await axiosPetition("mesas/", { identificador: idMesa, nombre: nombreMesa }, "POST");

        if (!creacion.ok) {
            return toast.error(creacion.msg, configMensaje);
        }

        setBandera(!bandera);
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
                <h2 className="text-3xl mb-4 titulo">Registrar Mesa:</h2>
                <form className="flex flex-col" onSubmit={crearMesa}>
                    <label className="text-white text-left">Identificador:</label>
                    <input
                        type="number"
                        value={idMesa}
                        className="focus:outline-none text-xl text-center border-2 border-white w-full formInput h-10 rounded-md mb-4"
                        disabled
                    ></input>
                    <label className="text-white text-left">Nombre mesa:</label>
                    <input
                        type="text"
                        value={nombreMesa}
                        className="focus:outline-none text-md text-center border-2 border-white w-full formInput h-10 rounded-md"
                        onChange={(e) => setNombreMesa(e.target.value)}
                    ></input>
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
        </div >
    );
}

