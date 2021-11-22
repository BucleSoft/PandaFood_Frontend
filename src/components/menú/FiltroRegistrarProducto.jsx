import React from 'react';

export const FiltroRegistrarProducto = ({ imagen = '', texto = 'Sin texto' }) => {
    return (
        <div className="flex flex-col text-white mr-8 items-center">
            <img className="rounded-3xl w-28 h-20 mb-1 p-1 cursor-pointer" src={imagen} alt='Imagen del producto' />
            <span className="text-sm">{texto}</span>
        </div>
    );
}
