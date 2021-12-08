import React, { useState, useEffect } from 'react';
import { useCarritoContext } from '../../context/carritoContext';
import { TablaProductos } from './TablaProductos';
import '../../styles/cabeceraVenta.css';

export const HeaderTabla = ({ filtro, busqueda = '' }) => {

    const { carrito } = useCarritoContext();

    const [total, setTotal] = useState(0);
    const [puntos, setPuntos] = useState(0);
    const [bandera, setBandera] = useState(false);

    useEffect(() => {
        const calcularTotal = () => {
            let precioTotal = 0;
            carrito?.forEach((e) => {
                const subtotal = e.precio * e.cantidad;
                precioTotal += subtotal;
            });
            setTotal(precioTotal);
            setPuntos(Math.floor(precioTotal / 2000));
        }

        calcularTotal();
    }, [bandera]);

    return (
        <div className="w-full p-12">
            <table className="leading-normal w-full tabla">
                <thead>
                    <tr>
                        <th
                            className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Identificador
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Nombre del producto
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Cantidad
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Precio
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Subtotal
                        </th>
                        <th
                            className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carrito?.map((datos, key) => {
                            return <TablaProductos key={key} props={datos} index={key} bandera={bandera} setBandera={setBandera} />
                        })
                    }
                </tbody>
            </table>
            <div className="flex mt-4 justify-between">
                <h2 className="text-white text-lg">Total: ${total}</h2>
                <h2 className="text-white text-lg">Puntos: {puntos} pts</h2>
            </div>
            <div>
                <h2 id="descuento" className="flex mt-2 underline cursor-pointer">Aplicar descuento</h2>
            </div>
        </div>
    )
}
