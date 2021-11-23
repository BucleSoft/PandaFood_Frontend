import React, { useState, useEffect } from 'react';
import '../../styles/card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faCoffee } from '@fortawesome/free-solid-svg-icons';
import hamburguesa from '../../images/hamburguer.jpg';
import bebida from '../../images/bebida.jpg';
import salchipapa from '../../images/salchipapa.jpg';
import entrada from '../../images/entrada.jpg';
import perro from '../../images/perro.jpg';

export const Card = ({ precio = '0', nombre = 'Sin nombre', categoria = 'Hamburguesa' }) => {

    const [imagen, setImagen] = useState(hamburguesa);

    useEffect(() => {
        switch (categoria) {
            case "Hamburguesa":
                setImagen(hamburguesa);
                break;
            case "Bebida":
                setImagen(bebida);
                break;
            case "Salchipapa":
                setImagen(salchipapa);
                break;
            case "Entrada":
                setImagen(entrada);
                break;
            case "Perro":
                setImagen(perro);
                break;
        }
    });

    return (
        <div className='text-white max-w-xs w-full shadow-md rounded-2xl card my-4 mr-6'>
            <img
                src={imagen}
                alt="Imagen del producto"
                className=" w-full h-52 object-cover rounded-t-2xl cursor-pointer" />
            <div className='p-4'>
                <div class="flex flex-wrap ">
                    <div class="flex items-center w-full justify-between min-w-0 ">
                        <h2 class="text-xl font-medium cursor-pointer text-gray-200">
                            {nombre}
                            <FontAwesomeIcon
                                className='ml-3'
                                icon={categoria === 'Bebida' ? faCoffee : faHamburger} />
                        </h2>
                    </div>
                    <div class="text-xl text-white font-semibold mt-1">${precio}</div>
                </div>
                <div className='flex flex-col'>
                    <input className='w-12 mt-2 outline-none text-center rounded-md py-1 border-2' value='1' />
                    <button className='font-medium mt-4 mb-2 botonPrincipalInput py-2 px-5 rounded-full shadow-lg'>Agregar al carrito</button>
                </div>
            </div>
        </div>
    )
}
