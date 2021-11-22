import React from 'react';
import { Card } from './Card';
import '../../styles/menu.css';
import { ConsultarProductos } from './ConsultarProductos';

export const Menú = () => {
    return (
        <div className="flex flex-col w-full h-screen items-center justify-start">
            <ConsultarProductos />
            <div className="flex flex-wrap overflow-y-scroll justify-center">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}
