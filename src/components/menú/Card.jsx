import React, { useState, useEffect } from 'react';
import '../../styles/card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faCoffee, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import hamburguesa from '../../images/hamburguesa.jpeg';
import bebida from '../../images/bebida.jpg';
import salchipapa from '../../images/salchipapa.jpg';
import entrada from '../../images/entrada.jpg';
import perro from '../../images/perro.jpg';
import picada from '../../images/picada.jpg';
import panda from '../../images/default-image.png';
import { useCarritoContext } from '../../context/carritoContext';
import { useHistory } from 'react-router';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { useConsultarProductoContext } from '../../context/consultarProductoContext';
import { toast } from 'react-toastify';

export const Card = ({ identificador = '', precio = '0', nombre = 'Sin nombre', categoria = 'Hamburguesa', soloAgregados = false, bandera, setBandera }) => {

    const [imagen, setImagen] = useState(hamburguesa);
    const [cantidad, setCantidad] = useState(1);
    const [controles, setControles] = useState(false);
    const [agregado, setAgregado] = useState(false);
    const [index, setIndex] = useState();
    const [auxiliar, setAuxiliar] = useState(false);
    const { carrito, setCarrito } = useCarritoContext();
    const history = useHistory();

    const { productos, setProductos } = useConsultarProductoContext();

    const configMensaje = {
        position: "bottom-center",
        background: "#191c1f !important",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    };

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
            case "Picada":
                setImagen(picada);
                break;
            default:
                setImagen(panda);
        }
    }, []);

    useEffect(() => {

        const buscarCarrito = async () => {

            await carrito?.find((productos, index) => {
                const resultado = productos?.identificador === identificador;
                if (resultado) {
                    setAgregado(true);
                    setCantidad(productos.cantidad);
                    setIndex(index);
                }

            });
        }
        buscarCarrito();
        setBandera(!bandera);
    }, [auxiliar]);

    const sumarCantidad = () => {
        setCantidad(parseInt(cantidad) + 1);
    }

    const restarCantidad = () => {
        if (cantidad > 1) {
            setCantidad(parseInt(cantidad) - 1);
        }
    }

    const agregarAlCarrito = async () => {

        if (cantidad === '') {
            return toast.error("La cantidad debe ser un valor numérico.", configMensaje);
        }

        if (cantidad <= 0) {
            return toast.error("La cantidad debe ser mayor que cero.", configMensaje);
        }

        if (cantidad.toString().includes('.') || cantidad.toString().includes(',')) {
            return toast.error("La cantidad no puede contener puntos ni comas.", configMensaje);
        }

        const producto = {
            identificador,
            nombre,
            cantidad,
            precio,
            categoria
        }
        await carrito.push(producto);
        setAuxiliar(!auxiliar);
    }

    const quitarDelCarrito = async () => {
        setAuxiliar(!auxiliar);
        delete carrito[index];
        setCarrito(carrito);
        setAgregado(false);
        setCantidad(1);
        setAuxiliar(!auxiliar);
    }

    const activarControles = () => {
        if (!agregado) {
            setControles(true);
        }
    }

    const desactivarControles = () => {
        if (!agregado) {
            setControles(false);
        }
    }

    const buscarProducto = async () => {

        await axiosPetition(`productos/${identificador}`);

        if (!respuesta.ok) {
            return toast.error("Error al obtener el producto, contacte a los desarrolladores.", configMensaje);
        }

        setProductos(respuesta.producto);
        history.push('/menu/editar');
        console.log(respuesta.producto);
    }

    return (
        <div className={`text-white max-w-xs w-full shadow-md rounded-2xl card my-4 mr-6 ${soloAgregados ? agregado === false ? "hidden" : "" : ""}`}>

            <img
                src={imagen}
                alt="Imagen del producto"
                className=" w-full h-52 object-cover rounded-t-2xl cursor-pointer"
                onClick={agregado ? quitarDelCarrito : agregarAlCarrito} />

            <div className='p-4'>
                <div className="flex flex-wrap ">
                    <div className="flex items-center w-full justify-between min-w-0 ">
                        <h2
                            className="text-xl font-medium cursor-pointer text-gray-200"
                            onClick={() => {
                                buscarProducto();
                            }}>
                            {nombre}
                            <FontAwesomeIcon
                                className='ml-3'
                                icon={categoria === 'Bebida' ? faCoffee : faHamburger}
                                title={categoria} />
                        </h2>
                    </div>
                    <div className="text-sm w-full text-left text-gray-500 mt-1">{categoria}</div>
                    <div className="text-xl text-white font-semibold mt-1">${precio}</div>
                </div>
                <div className='flex flex-col'>
                    <div className="flex border-2 border-gray-500 mt-2 rounded-full"
                        onMouseEnter={activarControles}
                        onMouseLeave={desactivarControles}>
                        <div className={`flex flex-col items-center justify-center ml-4 ${controles === false ? 'hidden' : ''}`}>
                            <FontAwesomeIcon
                                className="text-sm text-gray-500 cursor-pointer"
                                icon={faPlusSquare}
                                onClick={sumarCantidad}
                            />
                            <FontAwesomeIcon
                                className="text-sm text-gray-500 cursor-pointer"
                                icon={faMinusSquare}
                                onClick={restarCantidad}
                            />
                        </div>
                        <input
                            type="number"
                            className='w-full py-2 outline-none text-center rounded-full'
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            disabled={agregado ? true : false}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    agregarAlCarrito();
                                    desactivarControles();
                                }
                            }}
                        />
                        <div className={`flex flex-col items-center justify-center mr-4 ${controles === false ? 'hidden' : ''}`}>
                            <FontAwesomeIcon
                                className="text-sm text-gray-500 cursor-pointer"
                                icon={faPlusSquare}
                                onClick={sumarCantidad}
                            />
                            <FontAwesomeIcon
                                className="text-sm text-gray-500 cursor-pointer"
                                icon={faMinusSquare}
                                onClick={restarCantidad}
                            />
                        </div>
                    </div>
                    <button
                        onClick={agregado ? quitarDelCarrito : agregarAlCarrito}
                        className={`font-medium mt-4 mb-2 ${agregado ? 'botonInput' : 'botonPrincipalInput'} py-2 px-5 rounded-full shadow-lg`}
                    >
                        {
                            agregado ?
                                'Quitar del carrito'
                                :
                                'Agregar al carrito'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
