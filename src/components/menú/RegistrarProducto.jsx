import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { useHistory, Link } from 'react-router-dom';
import { FiltroRegistrarProducto } from './FiltroRegistrarProducto';
import { Insumo } from './Insumo';
import hamburguesa from '../../images/hamburguesa.jpeg';
import perro from '../../images/perro.jpg';
import salchipapa from '../../images/salchipapa.jpg';
import picada from '../../images/picada.jpg';
import combo from '../../images/combo.jpg';
import bebida from '../../images/bebida.jpg';
import entrada from '../../images/entrada.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import '../../styles/registrarProducto.css';

export const RegistrarProducto = () => {

    const [items, setItems] = useState([]);
    const [insumos, setInsumos] = useState([{ nombre: 'Fresa', cantidad: 3 }]);
    const [nuevoInsumo, setNuevoInsumo] = useState({});

    useEffect(() => {
        const buscarInsumos = async () => {
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

            await axiosPetition("insumos");
            if (!respuesta.ok) {
                toast.error(
                    "Ha ocurrido un error al intentar obtener la lista de insumos.",
                    configMensaje
                );
            }

            setItems(respuesta.insumos);
        }
        buscarInsumos();
        console.log(items)
    }, []);




    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }

    const handleOnHover = (result) => {

    }

    const handleOnSelect = (item) => {
        nuevoInsumo.identificador = item.id;
        nuevoInsumo.nombre = item.name;
        setNuevoInsumo(nuevoInsumo);
    }

    const handleOnFocus = () => {

    }

    const formatResult = (item) => {
        return item
        // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
    }

    const history = useHistory();

    const [productosValues, handleProductosChange, resetProductos, formatearTexto] = useForm({
        identificador: '',
        nombre: '',
        precio: '',
        insumos: [],
        estado: 'Activo'
    });


    const insumo = useRef('');
    const cantidad = useRef('');

    const { identificador, nombre, precio } = productosValues;

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

    const registrarProducto = async (e) => {
        e.preventDefault();

        await axiosPetition('productos', productosValues, 'POST');

        if (respuesta !== undefined) {

            console.log(respuesta);

            if (respuesta.ok) {
                resetProductos();
                toast.success('Producto registrado correctamente.', configMensaje);
                history.push('/productos');
            } else {
                toast.error(respuesta.msg, configMensaje);
            }
        }
    }

    const agregarInsumo = () => {
        nuevoInsumo.cantidad = cantidad.current.value;
        insumos.push(nuevoInsumo);
        setInsumos(insumos);
        setNuevoInsumo([]);
        insumo.current.value = '';
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios">
            <div className="ml-10">

                <h2 className="text-left text-4xl mt-12 mb-8 titulo">Registrar productos</h2>
                <section className="flex flex-wrap">
                    <FiltroRegistrarProducto imagen={hamburguesa} texto="Hamburguesa" />
                    <FiltroRegistrarProducto imagen={perro} texto="Perro" />
                    <FiltroRegistrarProducto imagen={salchipapa} texto="Salchipapa" />
                    <FiltroRegistrarProducto imagen={picada} texto="Picada" />
                    <FiltroRegistrarProducto imagen={combo} texto="Combo" />
                    <FiltroRegistrarProducto imagen={bebida} texto="Bebida" />
                    <FiltroRegistrarProducto imagen={entrada} texto="Entrada" />
                </section>
                <form onSubmit={registrarProducto} className="mt-8">
                    <div className="flex flex-wrap">
                        <input
                            type="number"
                            name="identificador"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Identificador del producto"
                            value={identificador}
                            onChange={handleProductosChange}
                            autoComplete="off" />
                        <input
                            name="nombre"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Nombre del producto"
                            value={nombre}
                            onChange={handleProductosChange}
                            onBlur={formatearTexto}
                            autoComplete="off" />
                        <input
                            type="number"
                            name="precio"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            value={precio}
                            onChange={handleProductosChange}
                            placeholder="Precio del producto"
                            autoComplete="off" />
                        <div id="insumosInput" style={{ width: '20rem' }} className="mr-8 mb-8 rounded-sm border-b-2">
                            <ReactSearchAutocomplete
                                ref={insumo}
                                items={items}
                                onSearch={handleOnSearch}
                                onHover={handleOnHover}
                                onSelect={handleOnSelect}
                                onFocus={handleOnFocus}
                                formatResult={formatResult}
                                styling={{ backgroundColor: '#212227', color: 'white', border: 'none', borderRadius: '2px', hoverBackgroundColor: "#28292e" }}
                                placeholder='Busca un insumo'
                            />
                        </div>
                        <input
                            type="text"
                            ref={cantidad}
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Cantidad del insumo"
                            autoComplete="off" />
                        <button
                            type="button"
                            className="botonPrincipalInput mb-8 w-10 h-10 rounded-full flex items-center justify-center"
                            onClick={agregarInsumo}>
                            <FontAwesomeIcon className="text-white text-xl" icon={faPlus} />
                        </button>
                        <div className="w-full flex flex-col items-start contenedorTabla">
                            <h2 className="text-white">Insumos:</h2>
                            <div id="contenedorInsumos" className="w-full border-4 border-dashed rounded-md mt-4 flex flex-wrap pb-4 pt-2 px-4">
                                {insumos?.map((data, key) => {
                                    return <Insumo cantidad={data.cantidad} insumo={data.nombre} />
                                })}
                            </div>
                        </div>
                        <div className="mt-8">
                            <input
                                type="text"
                                className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                                placeholder="Cambiar imagen"
                                autoComplete="off" />
                        </div>
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput">
                                Registrar producto
                            </button>
                            <button
                                type="button"
                                className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                                onClick={resetProductos}
                            >
                                Limpiar
                            </button>
                            <Link to="/clientes">
                                <button
                                    type="button"
                                    className="text-lg mb-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                                >
                                    Cancelar
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div >
            <ToastContainer theme='dark' />
        </div >
    );
}

