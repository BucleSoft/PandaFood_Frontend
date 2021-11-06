import React, { useRef, useEffect } from 'react'

export const EditarPuntos = ({ hidden, setHidden, puntos = 0, setPuntos }) => {


    const puntosCliente = useRef();

    useEffect(() => {
        puntosCliente.current.focus();
    });

    const guardarPuntos = (e) => {
        e.preventDefault();
        setPuntos(puntosCliente.current.value);
        setHidden(true);
    }

    return (
        <div
            id="fondoModal"
            className={`absolute h-full w-full flex justify-center items-center text-white cursor-pointer ${hidden ? "hidden" : ''}`}
        >
            <div
                id="modal"
                className="bg-white rounded-2xl border-2 border-gray-500 mr-96 px-40 py-10 cursor-default"
            >
                <h2 className="text-3xl mb-4 titulo">Editar Puntos</h2>
                <form onSubmit={guardarPuntos}>
                    <input
                        defaultValue={puntos}
                        ref={puntosCliente}
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

