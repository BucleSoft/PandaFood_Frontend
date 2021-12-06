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
import { useConsultarProductoContext } from '../../context/consultarProductoContext';
import { Categoria } from './Categoria';

export const EditarProducto = () => {

    const { productos, setProductos } = useConsultarProductoContext();
    const [insumo, setInsumo] = useState(productos?.insumos);
    const [items, setItems] = useState([]);
    const [nuevoInsumo, setNuevoInsumo] = useState({});
    const [categoria, setCategoria] = useState(productos?.categoria);
    const [inputInsumo, setInputInsumo] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [tipo, setTipo] = useState('Insumos');
    const [hidden, setHidden] = useState(true);
    const [bandera, setBandera] = useState(false);
    const [auxiliarTipo, setAuxiliarTipo] = useState(false);

    const history = useHistory();

    const [productosValues, handleProductosChange, resetProductos, formatearTexto] = useForm({
        identificador: productos?.identificador,
        nombre: productos?.nombre,
        precio: productos?.precio,
        stock: productos?.stock === null ? '' : productos?.stock,
        categoria: categoria,
        estado: 'Activo'
    });

    const cantidad = useRef('');
    const comboCategorias = useRef('');

    const { identificador, nombre, stock, precio } = productosValues;

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
            setAuxiliarTipo(!auxiliarTipo);
        }
        buscarCategorias();
    }, [bandera]);

    useEffect(() => {

        const determinarTipo = async () => {
            let posicion;
            await categorias?.find((datos, index) => {
                const resultado = datos.nombre === productos?.categoria;

                if (resultado) {
                    posicion = index;
                    setTipo(categorias[posicion].tipo);
                }

            });
        }

        determinarTipo();
    }, [auxiliarTipo]);

    const handleOnSelect = (item) => {
        nuevoInsumo.identificador = item.identificador;
        nuevoInsumo.nombre = item.nombre;
        setInputInsumo(item.nombre)
        setNuevoInsumo(nuevoInsumo);
    }


    const formatResult = (item) => {
        return item
    }

    const editarProducto = async (e) => {
        e.preventDefault();

        if (stock === '' && insumo.length === 0) {
            return toast.error("Ingresa un stock o registre los insumos del producto.", configMensaje);
        }

        if (stock !== '' && insumo.length !== 0) {
            return toast.error("Ingresa un stock o registre los insumos pero no ambos.", configMensaje);
        }

        if (tipo !== 'Insumos' && typeof stock === 'string') {
            const stockParseado = parseInt(stock);
            if (!isNaN(stockParseado)) {
                productosValues.stock = stockParseado;
            }
        }

        productosValues.categoria = categoria;

        productosValues.insumos = insumo;

        await axiosPetition(`productos/${identificador}`, productosValues, 'PUT');

        if (respuesta !== undefined) {

            if (respuesta.ok) {
                resetProductos();
                toast.success('Producto registrado correctamente.', configMensaje);
                setProductos([]);
                history.push('/menu');
            } else {
                toast.error(respuesta.msg, configMensaje);
            }
        }
    }

    const buscarProducto = async () => {

        await axiosPetition(`productos/${identificador}`);

        if (!respuesta.ok) {
            return toast.error("Error al obtener el producto, contacte a los desarrolladores.", configMensaje);
        }

        setInsumo(respuesta?.producto.insumos);

    }

    const agregarInsumo = () => {

        if (inputInsumo.trim() === '') {
            toast.error("Busque y seleccione un insumo de la lista deslplegable, por favor.", configMensaje);
        } else if (cantidad.current.value.trim() === '') {
            toast.error("La cantidad del insumo es obligatoria.", configMensaje);
        } else {
            nuevoInsumo.cantidad = cantidad.current.value;
            insumo.push(nuevoInsumo);
            setNuevoInsumo({});
            cantidad.current.value = "";
            setInputInsumo("");
        }
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios">
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
                            onChange={(e) => {
                                let posicion;
                                setCategoria(comboCategorias.current.value);
                                categorias?.find((categoria, index) => {
                                    const resultado = categoria.nombre === comboCategorias.current.value
                                    if (resultado) {
                                        posicion = index;
                                    }
                                });
                                const tipoCategoria = categorias[posicion].tipo;
                                setTipo(tipoCategoria);
                                if (tipo !== 'Insumos') {
                                    setInsumo([]);
                                }
                                if (tipo !== 'Stock') {
                                    productosValues.stock = '';
                                }
                            }}>
                            {
                                categorias?.map((datos, key) => {
                                    return <option key={datos._id} value={datos.nombre} >{datos.nombre}</option>;
                                })
                            }
                        </select>
                        <input
                            type="text"
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
                        <input
                            type="number"
                            name="stock"
                            className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${tipo === 'Insumos' ? 'hidden' : ''}`}
                            value={stock}
                            onChange={handleProductosChange}
                            placeholder="Stock del producto"
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
                        placeholder="Cantidad del insumo"
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
                            return <Insumo key={key} index={key} cantidad={data.cantidad} insumo={data.nombre} listaInsumos={insumo} setListaInsumos={setInsumo} />
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

