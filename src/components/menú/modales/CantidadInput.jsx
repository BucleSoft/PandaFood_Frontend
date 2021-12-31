import React, { useState, useEffect } from 'react';
import { useCarritoContext } from '../../../context/carritoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export const CantidadInput = ({ identificador, nombre, insumoEnLista, max, setBandera, bandera, listaExcepciones, productoSeleccionado }) => {

    const { carrito } = useCarritoContext();
    const [cantidadExcepcion, setCantidadExcepcion] = useState(1);

    useEffect(() => {
        setCantidadExcepcion(1);
    }, [max]);

    const excepciones = (enLista, identificador, cantidad = 1) => {
        if (!enLista) {
            const nuevaExcepcion = {
                identificador: identificador,
                cantidad
            }
            listaExcepciones.push(nuevaExcepcion);
        } else {
            const index = listaExcepciones.find(elemento => elemento.identificador === identificador);
            listaExcepciones.splice(index, 1);
        }
        carrito.map((dato) => {
            if (dato.identificador === productoSeleccionado) {
                dato.excepciones = listaExcepciones;
            }
        });
        setBandera(!bandera);
    }

    const sumarCantidad = () => {
        if (cantidadExcepcion < max) {
            setCantidadExcepcion(cantidadExcepcion + 1);
        }
        if (insumoEnLista) {
            listaExcepciones.map((dato) => {
                if (dato.identificador === identificador) {
                    dato.cantidad = cantidadExcepcion + 1;
                }
            });
        }
    }

    const restarCantidad = () => {
        if (cantidadExcepcion !== 1) {
            setCantidadExcepcion(cantidadExcepcion - 1);
        }
        if (insumoEnLista) {
            listaExcepciones.map((dato) => {
                if (dato.identificador === identificador) {
                    dato.cantidad = cantidadExcepcion - 1;
                }
            });
        }
    }

    return (
        <tr className="bordeFilas">
            <td className='py-3 text-left pl-4'>
                <input name="checkbox" type="checkbox" checked={insumoEnLista}
                    onChange={() => excepciones(insumoEnLista, identificador, cantidadExcepcion)} />
                <label htmlFor='checkbox' className='ml-2'>Sin {nombre}</label>
            </td>
            <td className='flex justify-center py-3'>
                <div className="flex justify-center items-center bordeCantidad rounded-xl w-24">
                    <FontAwesomeIcon className='text-xs cursor-pointer' icon={faMinus} onClick={restarCantidad} />
                    <input type="number"
                        className='w-10 text-center'
                        value={cantidadExcepcion}
                        disabled />
                    <FontAwesomeIcon className='text-xs cursor-pointer' icon={faPlus} onClick={sumarCantidad} />
                </div>
            </td>
        </tr>
    );
}
