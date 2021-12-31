import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { useHistory, Link } from 'react-router-dom';
import { Insumo } from './Insumo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import '../../styles/registrarProducto.css';
import { Categoria } from './Categoria';

export const RegistrarProducto = () => {


    const [listaInsumos, setListaInsumos] = useState([]);
    const [items, setItems] = useState([]);
    const [nuevoInsumo, setNuevoInsumo] = useState({});
    const [categoria, setCategoria] = useState('Hamburguesa');
    const [inputInsumo, setInputInsumo] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [tipo, setTipo] = useState('Insumos');
    const [hidden, setHidden] = useState(true);
    const [bandera, setBandera] = useState(false);
    const [unidadInsumo, setUnidadInsumo] = useState('stock');
    const identificador = useRef('');

    const history = useHistory();

    const [productosValues, handleProductosChange, resetProductos, formatearTexto] = useForm({
        nombre: '',
        precio: '',
        puntos: '',
        stock: '',
        insumos: [],
        categoria: '',
        tipoUnidad: '',
        estado: 'Activo'
    });

    const cantidad = useRef('');
    const comboCategorias = useRef('');

    const { nombre, stock, puntos, precio } = productosValues;

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

        const maxProducto = async () => {
            await axiosPetition('productos/max');

            if (!respuesta.ok) {
                return toast.error(respuesta.msg, configMensaje);
            }

            identificador.current.value = respuesta.maxCodigo;
        }

        maxProducto();
    }, []);

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

            respuesta.insumos?.map((datos, key) => {
                datos.name = datos.nombre;
                datos.id = key;
            });


            if (!respuesta.ok) {
                toast.error(
                    "Ha ocurrido un error al intentar obtener la lista de insumos.",
                    configMensaje
                );
            }

            setItems(respuesta.insumos);
        }

        buscarInsumos();

    }, []);

    useEffect(() => {

        const buscarCategorias = async () => {
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

            await axiosPetition('categorias');

            if (!respuesta.ok) {
                toast.error(
                    "Ha ocurrido un error al intentar obtener la lista de categorias.",
                    configMensaje
                );
            }

            setCategorias(respuesta.categorias);
        }
        buscarCategorias();
    }, [bandera]);

    const handleOnSelect = (item) => {
        nuevoInsumo.identificador = item.identificador;
        nuevoInsumo.nombre = item.nombre;
        nuevoInsumo.unidades = item.unidades;
        setInputInsumo(item.nombre)
        setNuevoInsumo(nuevoInsumo);
        setUnidadInsumo(item.unidades);
    }

    const formatResult = (item) => {
        return item
    }

    const registrarProducto = async (e) => {
        e.preventDefault();

        if (stock === '' && listaInsumos.length === 0) {
            return toast.error("Ingresa un stock o registre los insumos del producto.", configMensaje);
        }

        if (stock !== '' && listaInsumos.length !== 0) {
            return toast.error("Ingresa un stock o registre los insumos pero no ambos.", configMensaje);
        }

        if (tipo !== 'Insumos' && typeof stock === 'string') {
            const stockParseado = parseInt(stock);
            if (!isNaN(stockParseado)) {
                productosValues.stock = stockParseado;
            }
        }

        const listaFiltrada = listaInsumos.filter((el) => {
            return el != null;
        });

        productosValues.identificador = identificador.current.value;
        productosValues.categoria = categoria;
        productosValues.insumos = listaFiltrada;
        productosValues.tipoUnidad = tipo;

        await axiosPetition('productos', productosValues, 'POST');

        if (respuesta !== undefined) {

            if (respuesta.ok) {
                resetProductos();
                toast.success('Producto registrado correctamente.', configMensaje);
                setListaInsumos([]);
                history.push('/menu');
            } else {
                toast.error(respuesta.msg, configMensaje);
            }
        }
    }

    const agregarInsumo = () => {

        if (inputInsumo.trim() === '') {
            toast.error("Busque y seleccione un insumo de la lista desplegable, por favor.", configMensaje);
        } else if (cantidad.current.value.trim() === '') {
            toast.error("La cantidad del insumo es obligatoria.", configMensaje);
        } else {

            let agregado = false;

            listaInsumos.map((dato) => {
                if (dato.identificador === nuevoInsumo.identificador) {
                    agregado = true;
                }
            });

            if (agregado) {
                return toast.error("El insumo ya se encuentra registrado, elimine el anterior", configMensaje);
            }

            nuevoInsumo.cantidad = cantidad.current.value;
            listaInsumos.push(nuevoInsumo);
            setListaInsumos(listaInsumos);
            setNuevoInsumo({});
            cantidad.current.value = "";
            setInputInsumo("");
        }
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios mx-16">
            <div className="ml-10">
                <h2 className="text-left text-4xl mt-12 mb-4 titulo">Registrar productos</h2>
                <h2
                    className="text-white underline text-left cursor-pointer"
                    onClick={() => setHidden(false)}>Nueva categoría</h2>
                <form onSubmit={registrarProducto} className="mt-1">
                    <div className="flex flex-wrap">
                        <select
                            ref={comboCategorias}
                            className="w-80 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            defaultValue="Hamburguesa"
                            title="Categoría del producto"
                            onChange={() => {
                                let posicion;
                                setCategoria(comboCategorias.current.value);
                                categorias?.find((categoria, index) => {
                                    const resultado = categoria.nombre === comboCategorias.current.value
                                    if (resultado) {
                                        posicion = index;
                                    }
                                });
                                setTipo(categorias[posicion].tipo);

                                setListaInsumos([]);
                                productosValues.stock = '';


                            }}>
                            {
                                categorias?.map((datos, key) => {
                                    return <option key={datos._id} value={datos.nombre} >{datos.nombre}</option>;
                                })
                            }
                        </select>
                        <input
                            ref={identificador}
                            type="text"
                            name="identificador"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Identificador del producto*"
                            title="Identificador del producto"
                            autoComplete="off"
                            disabled />
                        <input
                            name="nombre"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Nombre del producto*"
                            title="Nombre del producto"
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
                            placeholder="Precio del producto*"
                            title="Precio del producto"
                            autoComplete="off" />
                        <input
                            type="number"
                            name="puntos"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            value={puntos}
                            onChange={handleProductosChange}
                            placeholder="Puntos del producto"
                            title="Puntos del producto"
                            autoComplete="off" />
                        <input
                            type="number"
                            name="stock"
                            className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${tipo === 'Insumos' ? 'hidden' : ''}`}
                            value={stock}
                            onChange={handleProductosChange}
                            placeholder="Stock del producto*"
                            title="Stock del producto"
                            autoComplete="off" />
                    </div>
                </form>

                <div
                    className={`flex flex-wrap w-full ${tipo === 'Stock' ? 'hidden' : ''}`}>
                    <div id="insumosInput" style={{ width: '20rem' }} className="mr-8 mb-8 rounded-sm border-b-2">
                        <ReactSearchAutocomplete
                            inputSearchString={inputInsumo}
                            items={items}
                            onSelect={handleOnSelect}
                            formatResult={formatResult}
                            styling={{ backgroundColor: '#212227', color: 'white', border: 'none', borderRadius: '2px', hoverBackgroundColor: "#28292e" }}
                            placeholder='Busca un insumo'
                        />
                    </div>
                    <input
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                agregarInsumo();
                            }
                        }}
                        type="number"
                        ref={cantidad}
                        className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                        placeholder={unidadInsumo === "stock" ? "Cantidad del insumo" : "Gramaje del insumo"}
                        autoComplete="off" />
                    <button
                        type="button"
                        className="botonPrincipalInput mt-1 w-10 h-10 rounded-full flex items-center justify-center"
                        onClick={agregarInsumo}>
                        <FontAwesomeIcon className="text-white text-xl" icon={faPlus} />
                    </button>
                </div>
                <section className={`w-full flex flex-col items-start contenedorTabla ${tipo === 'Stock' ? 'hidden' : ''}`}>
                    <h2 className="text-white">Insumos:</h2>
                    <div id="contenedorInsumos"
                        className="w-full border-4 border-dashed rounded-md mt-4 flex flex-wrap pb-4 pt-2 px-4">
                        {listaInsumos?.map((data, key) => {
                            return <Insumo key={key} index={key} cantidad={data.cantidad} identificador={data.identificador} insumo={data.nombre} unidades={data.unidades} listaInsumos={listaInsumos} setListaInsumos={setListaInsumos} />
                        })}
                    </div>
                </section>
                {/* </div> */}
                {/* <div className="mt-8">
                            <input
                                type="text"
                                className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                                placeholder="Cambiar imagen"
                                autoComplete="off" />
                        </div> */}
                <div className="w-full flex flex-wrap mt-10 gap-6">
                    <button
                        type="submit"
                        onClick={registrarProducto}
                        className="text-lg mb-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput">
                        Registrar producto
                    </button>
                    <button
                        type="button"
                        className="text-lg mb-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                        onClick={() => {
                            resetProductos();
                            setListaInsumos([]);
                        }}
                    >
                        Limpiar
                    </button>
                    <Link to="/menu">
                        <button
                            type="button"
                            className="text-lg mb-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                        >
                            Cancelar
                        </button>
                    </Link>
                </div>
            </div >
            <ToastContainer theme='dark' />
            <Categoria hidden={hidden} setHidden={setHidden} bandera={bandera} setBandera={setBandera} />;
        </div >
    );
}

