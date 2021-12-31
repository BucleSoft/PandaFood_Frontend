import React from 'react';

export const Observacion = ({ index, obs, setHidden, setIndexObs }) => {

    const eliminarObservacion = () => {
        setIndexObs(index);
        setHidden(false);
    }

    return (
        <div className={`text-white py-1 px-4 rounded-xl h-8 mx-2 mt-2 outline-none filtro cursor-pointer `}
            onClick={() => {
                eliminarObservacion();
            }}>
            <h2 className="text-white text-sm">{obs}</h2>
        </div>
    );
}
