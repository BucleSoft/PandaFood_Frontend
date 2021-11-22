import React from 'react';
import '../../styles/insumos.css';

export const Insumo = ({ cantidad, insumo }) => {
    return (
        <div className="text-white py-1 rounded-xl w-56 h-8 mx-2 mt-2 outline-none filtro cursor-pointer">
            <h2 className="text-white text-sm">{cantidad} {insumo}</h2>
        </div>
    );
}
