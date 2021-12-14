import React, { useState } from 'react'

export const Observacion = ({ index, obs, eliminarObs }) => {

    const [visibilidad, setVisibilidad] = useState(true);

    const eliminarObservacion = () => {
        eliminarObs(index);
        setVisibilidad(false);
    }

    return (
        <div className={`text-white py-1 rounded-xl w-56 h-8 mx-2 mt-2 outline-none filtro cursor-pointer ${visibilidad === false ? 'hidden' : ''}`}
            onClick={eliminarObservacion}>
            <h2 className="text-white text-sm">{obs}</h2>
        </div>
    );
}
