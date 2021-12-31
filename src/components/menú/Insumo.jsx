import React, { useState } from 'react';
import '../../styles/insumos.css';

export const Insumo = ({ index, cantidad, unidades, insumo, listaInsumos, setListaInsumos }) => {

    const [visibilidad, setVisibilidad] = useState(true);

    const eliminarInsumo = async () => {
        delete listaInsumos[index];
        setListaInsumos(listaInsumos);
        setVisibilidad(false);
    }

    return (
        <div className={`text-white py-1 rounded-xl w-56 h-8 mx-2 mt-2 outline-none filtro cursor-pointer ${visibilidad === false ? 'hidden' : ''}`}
            onClick={eliminarInsumo}>
            <h2 className="text-white text-sm">{unidades === 'stock' ? cantidad + ' ' + insumo : cantidad + 'g ' + insumo}</h2>
        </div>
    );
}
