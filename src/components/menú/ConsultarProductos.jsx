import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faShoppingCart, faChevronRight, faChevronDown, faBroom } from '@fortawesome/free-solid-svg-icons';
import '../../styles/consultarProductos.css';
import { Link } from 'react-router-dom';
import { axiosPetition } from '../../helpers/Axios';
import { toast, ToastContainer } from 'react-toastify';
import { Card } from './Card';
import { useCarritoContext } from '../../context/carritoContext';
import { useMenuContext } from '../../context/menuContext';
import { Observaciones } from './modales/Observaciones';

export const ConsultarProductos = () => {

    const [filtro, setFiltro] = useState('Todos');

    const [categoriaID, setCategoriaID] = useState();

    const [busqueda, setBusqueda] = useState('');

    const [productos, setProductos] = useState([]);

    const [filtrar, setFiltrar] = useState(true);

    const [categorias, setCategorias] = useState([]);

    const [hidden, setHidden] = useState(true);

    const [cantidadCarrito, setCantidadCarrito] = useState(0);

    const [bandera, setBandera] = useState(false);

    const { carrito, setCarrito } = useCarritoContext();

    const { setActive } = useMenuContext();

    const [productoSeleccionado, setProductoSeleccionado] = useState(0);

    const [nombreCategoria, setNombreCategoria] = useState("");

    const cambiarFiltro = (filtro) => {
        setFiltro(filtro);
    }

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
        let cantidad = 0;
        carrito?.map((datos, key) => {
            cantidad += parseInt(datos.cantidad);
        });

        setCantidadCarrito(cantidad);
    }, [bandera, carrito]);

    useEffect(() => {

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

        const buscarCategorias = async () => {

            const busqueda = await axiosPetition('categorias');

            if (!busqueda.ok) {
                return toast('Error al cargar las categorias!', configMensaje);
            }

            setCategorias(busqueda.categorias);

        }

        const buscarProductos = async () => {

            const busqueda = await axiosPetition('productos');

            if (!busqueda.ok) {
                return toast('Error al cargar los productos!', configMensaje);
            }

            setProductos(busqueda.productos?.reverse());

        }
        buscarCategorias();
        buscarProductos();
    }, []);

    const handleInputChange = (e) => {
        setBusqueda(e.target.value);
    }

    return (
        <div className="w-full h-screen justify-start overflow-y-scroll">
            <div className="px-24 flex flex-col items-center">
                <div className='flex flex-col w-full h-full items-center'>
                    <div id='buscador' className='w-full flex items-end mt-8 mr-4 h-12 rounded-lg pl-4'>
                        <div className='flex items-center justify-center h-12'>
                            <FontAwesomeIcon className='text-white text-lg mr-2' icon={faSearch}></FontAwesomeIcon>
                        </div>
                        <input
                            className='w-full text-md h-12 outline-none rounded-lg text-white'
                            placeholder='Busca un producto por su nombre o identificador'
                            value={busqueda}
                            onChange={handleInputChange}
                        />
                        <Link to="/menu/registrar">
                            <FontAwesomeIcon
                                className='text-white h-12 mr-4 text-2xl font-normal cursor-pointer'
                                icon={faPlus}
                                title='Agregar producto'>
                            </FontAwesomeIcon>
                        </Link>
                        <section className='flex mr-2'>
                            <FontAwesomeIcon
                                className='h-12 text-white text-2xl font-normal cursor-pointer'
                                icon={faShoppingCart}
                                title='Ir a la venta'
                                onClick={() => cambiarFiltro("Carrito")}>
                            </FontAwesomeIcon>
                            <p className='text-center mt-1 text-white font-semibold rounded-full numeroCarrito'>{cantidadCarrito}</p>
                        </section>
                    </div>
                    <h2
                        onClick={() => setFiltrar(!filtrar)}
                        className='text-white w-full text-left mt-4 cursor-pointer'>Filtros <FontAwesomeIcon icon={filtrar ? faChevronDown : faChevronRight} /></h2>

                    {/* FILTROS BUSCAR PRODUCTO */}

                    <div className={`${filtrar === false ? 'hidden' : ''}`}>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Frecuentes' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                            onClick={() => cambiarFiltro('Frecuentes')}>
                            Frecuentes
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Carrito' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                            onClick={() => cambiarFiltro('Carrito')}>
                            Carrito
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Todos' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                            onClick={() => cambiarFiltro('Todos')}>
                            Todos
                        </button>
                        <button
                            className={`text-white px-2 py-1 rounded-xl ${filtro === 'Redimibles' ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 w-28 outline-none`}
                            onClick={() => cambiarFiltro('Redimibles')}>
                            Redimibles
                        </button>
                        {
                            categorias?.map((datos, key) => {
                                return <button
                                    key={key}
                                    className={`text-white px-4 py-1 rounded-xl ${filtro === datos?.nombre ? 'filtroSeleccionado' : 'filtro'} my-2 mr-4 outline-none`}
                                    onClick={() => {
                                        cambiarFiltro(datos?.nombre);
                                        setCategoriaID(datos?.identificador);
                                    }}>
                                    {datos?.nombre}
                                </button>
                            })
                        }
                    </div>
                </div>
                <section className='absolute right-12 bottom-8 flex flex-col justify-center overflow-hidden'>
                    <Link to="/menu/registrar">
                        <button id='botonAgregar' className='rounded-full w-12 h-12 flex items-center justify-center shadow-md' title='Agregar producto' >
                            <FontAwesomeIcon className='text-white text-2xl font-normal' icon={faPlus}>
                            </FontAwesomeIcon>
                        </button>
                    </Link>
                    <Link to="/ventas">
                        <button
                            id='botonCarrito'
                            className='rounded-full w-12 h-12 mt-4 flex items-center justify-center shadow-md'
                            title='Ir a la venta'
                            onClick={() => {
                                setActive('ventas');
                            }
                            }>
                            <FontAwesomeIcon className='text-white text-2xl font-normal' icon={faShoppingCart}>
                            </FontAwesomeIcon>
                        </button>
                    </Link>
                    <button
                        id='botonCarrito'
                        className='rounded-full w-12 h-12 mt-4 flex items-center justify-center shadow-md' title='Vaciar carrito'
                        onClick={() => {
                            if (carrito.length > 0) {
                                setCarrito([]);
                                window.location.href = window.location.href;
                            }
                        }}>
                        <FontAwesomeIcon className='text-white text-2xl font-normal' icon={faBroom}>
                        </FontAwesomeIcon>
                    </button>
                </section>
            </div>

            <div className="pl-32 flex flex-wrap justify-start">
                {

                    productos?.map((datos, key) => {

                        const condicion = (datos.nombre.trim().toLowerCase().includes(busqueda.trim().toLowerCase()));


                        if (filtro === "Todos") {
                            if (condicion) {
                                return <Card identificador={datos.identificador} tipoUnidad={datos.tipoUnidad} nombre={datos.nombre} precio={datos.precio} puntos={datos.puntos} categoria_id={datos.categoria_id} key={key} bandera={bandera} setBandera={setBandera} setProductoSeleccionado={setProductoSeleccionado} setHidden={setHidden} nombreCategoria={nombreCategoria} />;
                            }
                        }

                        if (filtro === "Carrito") {
                            if (condicion) {
                                return <Card identificador={datos.identificador} tipoUnidad={datos.tipoUnidad} nombre={datos.nombre} precio={datos.precio} puntos={datos.puntos} categoria_id={datos.categoria_id} key={key} soloAgregados={true} bandera={bandera} setBandera={setBandera} setProductoSeleccionado={setProductoSeleccionado} setHidden={setHidden} />;
                            }
                        }

                        if (filtro === "Redimibles") {
                            if (condicion && datos.puntos !== 0 && datos.puntos !== null) {
                                return <Card identificador={datos.identificador} tipoUnidad={datos.tipoUnidad} nombre={datos.nombre} precio={datos.precio} puntos={datos.puntos} categoria_id={datos.categoria_id} key={key} soloAgregados={false} bandera={bandera} setBandera={setBandera} setProductoSeleccionado={setProductoSeleccionado} setHidden={setHidden} />;
                            }

                        }

                        if (datos.categoria_id === categoriaID) {
                            if (condicion) {
                                return <Card identificador={datos.identificador} tipoUnidad={datos.tipoUnidad} nombre={datos.nombre} precio={datos.precio} puntos={datos.puntos} categoria_id={datos.categoria_id} key={key} bandera={bandera} setBandera={setBandera} setProductoSeleccionado={setProductoSeleccionado} setHidden={setHidden} />;
                            }
                        }
                    }
                    )
                }
            </div>
            <Observaciones productoSeleccionado={productoSeleccionado} hidden={hidden} setHidden={setHidden} />
            <ToastContainer theme="dark" />
        </div>
    )
}
