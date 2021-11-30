import React, { useState } from 'react';
import '../../styles/insumos.css';
import { useConsultarProductoContext } from '../../context/consultarProductoContext';

export const Insumo = ({ index, cantidad, insumo }) => {

    const { productos, setProductos } = useConsultarProductoContext();
    const [visibilidad, setVisibilidad] = useState(true);

    const eliminarInsumo = async () => {
        delete productos[index];
        setProductos(productos);
        setVisibilidad(false);
    }

    return (
        <div className={`text-white py-1 rounded-xl w-56 h-8 mx-2 mt-2 outline-none filtro cursor-pointer ${visibilidad === false ? 'hidden' : ''}`}
            onClick={eliminarInsumo}>
            <h2 className="text-white text-sm">{cantidad} {insumo}</h2>
        </div>
    );
}
