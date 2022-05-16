import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { axiosPetition } from '../../helpers/Axios';
import { useHistory, Link } from 'react-router-dom';
import { Insumo } from './Insumo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import '../../styles/registrarProducto.css';
import { useConsultarProductoContext } from '../../context/consultarProductoContext';
import { Categoria } from './Categoria';

export const EditarProducto = () => {

    const { productos, setProductos } = useConsultarProductoContext();
    const [insumo, setInsumo] = useState([]);
    const [items, setItems] = useState([]);
    const [nuevoInsumo, setNuevoInsumo] = useState({});
    const [categoria, setCategoria] = useState(productos?.categoria_id);
    const [inputInsumo, setInputInsumo] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [tipo, setTipo] = useState('Insumos');
    const [hidden, setHidden] = useState(true);
    const [bandera, setBandera] = useState(false);
    const [auxiliarTipo, setAuxiliarTipo] = useState(false);
    const [unidadesInsumo, setUnidadesInsumo] = useState("stock");

    const history = useHistory();

    const [productosValues, handleProductosChange, resetProductos, formatearTexto] = useForm({
        identificador: 'P' + productos?.identificador,
        nombre: productos?.nombre,
        precio: productos?.precio,
        puntos: productos?.puntos,
        stock: productos?.stock,
        categoria_id: categoria,
        tipoUnidad: productos?.tipoUnidad,
        estado: 'Activo'
    });

    const cantidad = useRef('');
    const comboCategorias = useRef('');

    const { identificador, stock, nombre, precio, puntos, tipoUnidad } = productosValues;


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
        if (productos === undefined) {
            history.push("/menu");
        }
    });

    useEffect(() => {
        const obtenerInsumos = async () => {

            const id = identificador.split('P');

            const busqueda = await axiosPetition(`detalle_producto/${id[1]}`);

            if (!busqueda.ok) {
                return toast.error(busqueda.msg, configMensaje);
            }

            setInsumo(busqueda.insumos);

        }

        obtenerInsumos();
    }, [bandera]);

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

            const insumos = await axiosPetition("insumos");

            insumos.insumos?.map((datos, key) => {
                datos.name = datos.nombre;
                datos.id = key;
            });


            if (!insumos.ok) {
                toast.error(
                    insumos.msg,
                    configMensaje
                );
            }

            setItems(insumos.insumos);




        }
        buscarInsumos();

    }, [bandera]);

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

            const categorias = await axiosPetition('categorias');

            if (!categorias.ok) {
                toast.error(
                    "Ha ocurrido un error al intentar obtener la lista de categorias.",
                    configMensaje
                );
            }

            setCategorias(categorias.categorias);
            setAuxiliarTipo(!auxiliarTipo);
        }
        buscarCategorias();
    }, [bandera]);

    useEffect(() => {

        const determinarTipo = async () => {

            const busqueda = categorias.find(x => x.identificador === categoria);

            if (busqueda) {
                setTipo(busqueda.tipo);
            }

        }

        determinarTipo();
    }, [auxiliarTipo]);

    const handleOnSelect = (item) => {
        nuevoInsumo.identificador = item.identificador;
        nuevoInsumo.nombre = item.nombre;
        nuevoInsumo.unidades = item.unidades;
        setInputInsumo(item.nombre)
        setNuevoInsumo(nuevoInsumo);
        setUnidadesInsumo(item.unidades);
    }


    const formatResult = (item) => {
        return item
    }

    const editarProducto = async (e) => {
        e.preventDefault();

        const listaFiltrada = insumo.filter(Boolean);

        const id = identificador.split('P')[1];

        productosValues.categoria_id = comboCategorias.current.value;
        productosValues.tipoUnidad = tipo;
        productosValues.insumos = listaFiltrada;

        if (tipo === "Stock") {

            productosValues.insumos = [];

            if (productosValues.stock !== '') {
                productosValues.stock = parseInt(productosValues.stock);
            }
        } else if (tipo === "Insumos") {

            productosValues.stock = '';

        }

        if (productosValues.puntos === '') {
            productosValues.puntos = 0;
        } else {
            productosValues.puntos = parseInt(productosValues.puntos);
        }

        const actualizacion = await axiosPetition(`productos/${id}`, { ...productosValues, identificador: parseInt(id) }, "PUT");

        if (!actualizacion.ok) {
            return toast.error(actualizacion.msg, configMensaje);
        }

        history.push("/menu");

    }

    const buscarProducto = async () => {

        const id = identificador.split('P')[1];

        const busqueda = await axiosPetition(`productos/${id}`);

        if (!busqueda.ok) {
            return toast.error("Error al obtener el producto, contacte a los desarrolladores.", configMensaje);
        }

        setInsumo(busqueda?.producto.insumos);

    }

    const agregarInsumo = () => {

        if (inputInsumo.trim() === '') {
            toast.error("Busque y seleccione un insumo de la lista desplegable, por favor.", configMensaje);
        } else if (cantidad.current.value.trim() === '') {
            toast.error("La cantidad del insumo es obligatoria.", configMensaje);
        } else {

            let agregado = false;

            insumo.map((dato) => {
                if (dato.identificador === nuevoInsumo.identificador) {
                    agregado = true;
                }
            });

            if (agregado) {
                return toast.error("El insumo ya se encuentra registrado, elimine el anterior", configMensaje);
            }

            nuevoInsumo.cantidad = cantidad.current.value;
            insumo.push(nuevoInsumo);
            setNuevoInsumo({});
            cantidad.current.value = "";
            setInputInsumo("");
        }
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios mx-16">
            <div className="ml-10">
                <h2 className="text-left text-4xl mt-12 mb-4 titulo">Editar productos</h2>
                <h2
                    className="text-white underline text-left cursor-pointer"
                    onClick={() => setHidden(false)}>Nueva categoría</h2>
                <form onSubmit={editarProducto} className="mt-1">
                    <div className="flex flex-wrap">
                        <select
                            ref={comboCategorias}
                            className="w-80 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            value={categoria}
                            title="Categoría del producto"
                            onChange={() => {

                                setCategoria(parseInt(comboCategorias.current.value));
                                setAuxiliarTipo(!auxiliarTipo);
                                setBandera(!bandera);
                            }}>
                            {
                                categorias?.map((datos, key) => {
                                    return <option key={key} value={datos.identificador} >{datos.nombre}</option>;
                                })
                            }
                        </select>
                        <input
                            type="text"
                            name="identificador"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Identificador del producto*"
                            title="Identificador del producto"
                            value={identificador}
                            onChange={handleProductosChange}
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
                            value={stock === null ? '' : stock}
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
                        placeholder={unidadesInsumo === "stock" ? "Cantidad del insumo" : "Gramaje del insumo"}
                        autoComplete="off" />
                    <button
                        type="button"
                        className="botonPrincipalInput mt-1 w-10 h-10 rounded-full flex items-center justify-center"
                        onClick={agregarInsumo}>
                        <FontAwesomeIcon className="text-white text-xl" icon={faPlus} />
                    </button>
                </div>
                <div
                    className={`w-full flex flex-col items-start contenedorTabla ${tipo === 'Stock' ? 'hidden' : ''}`}>
                    <h2 className="text-white">Insumos:</h2>
                    <div
                        name="insumos"
                        id="contenedorInsumos"
                        className="w-full border-4 border-dashed rounded-md mt-4 flex flex-wrap pb-4 pt-2 px-4">
                        {insumo?.map((data, key) => {
                            data.id_insumo = data.identificador;
                            return <Insumo key={key} index={key} insumo={data} listaInsumos={insumo} setListaInsumos={setInsumo} />
                        })}
                    </div>
                </div>
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
                        onClick={editarProducto}
                        className="text-lg mb-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput">
                        Actualizar producto
                    </button>
                    <button
                        type="button"
                        className="text-lg mb-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                        onClick={() => {
                            buscarProducto();
                            setCategoria(productos?.categoria);
                            resetProductos();
                            setAuxiliarTipo(!auxiliarTipo);
                            setBandera(!bandera);
                        }}
                    >
                        Restaurar
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

