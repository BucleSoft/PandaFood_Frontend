import React from 'react';
import '../../styles/registrarUsuario.css';
import { useForm } from '../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { useHistory, Link } from 'react-router-dom';

export const RegistrarProducto = () => {

    const history = useHistory();

    const [productosValues, handleProductosChange, resetProductos, formatearTexto] = useForm({
        identificador: '',
        nombre: '',
        precio: '',
        stock: '',
        categoria: ''
    });

    const { identificador, nombre, precio, stock, categoria } = productosValues;

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

            if (respuesta.ok) {
                resetProductos();
                toast.success('Producto registrado correctamente.', configMensaje);
                history.push('/productos');
            } else {
                toast.error(respuesta.msg, configMensaje);
            }
        }
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios">
            <div className="ml-10">

                <h2 className="text-left text-4xl mt-12 mb-12 titulo">Registrar Productos</h2>
                <form onSubmit={registrarProducto}>
                    <div className="flex flex-wrap">
                        <input
                            name="identificador"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Identificador del producto"
                            value={identificador}
                            onChange={handleProductosChange}
                            autoComplete="off" />
                        <input
                            name="nombre"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Nombre del cliente"
                            value={nombre}
                            onChange={handleProductosChange}
                            onBlur={formatearTexto}
                            autoComplete="off" />
                        <input
                            type="number"
                            name="direccion"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Dirección del cliente"
                            value={precio}
                            onChange={handleProductosChange}
                            onBlur={formatearTexto}
                            autoComplete="off" />
                        <input
                            type="number"
                            name="celular"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            value={stock}
                            onChange={handleProductosChange}
                            placeholder="Celular del cliente"
                            autoComplete="off" />
                        <div>

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
                            <Link to="/inventario">
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
