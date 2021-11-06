import React from 'react';
import '../../styles/registrarUsuario.css';
import { useForm } from '../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { useHistory, Link } from 'react-router-dom';

export const RegistrarCliente = () => {

    const history = useHistory();

    const [clientesValues, handleClientesChange, resetClientes, formatearTexto] = useForm({
        cedula: '',
        nombre: '',
        direccion: '',
        celular: '',
        estado: 'Activo'
    });

    const { cedula, nombre, direccion, celular } = clientesValues;

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

    const registrarCliente = async (e) => {
        e.preventDefault();

        await axiosPetition('clientes', clientesValues, 'POST');

        if (respuesta !== undefined) {

            console.log(respuesta);

            if (respuesta.ok) {
                resetClientes();
                toast.success('Cliente registrado correctamente.', configMensaje);
                history.push('/clientes');
            } else {
                toast.error(respuesta.msg, configMensaje);
            }
        }
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios">
            <div className="ml-10">

                <h2 className="text-left text-4xl mt-12 mb-12 titulo">Registrar clientes</h2>
                <form onSubmit={registrarCliente}>
                    <div className="flex flex-wrap">
                        <input
                            type="number"
                            name="cedula"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Cédula del cliente"
                            value={cedula}
                            onChange={handleClientesChange}
                            autoComplete="off" />
                        <input
                            name="nombre"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Nombre del cliente"
                            value={nombre}
                            onChange={handleClientesChange}
                            onBlur={formatearTexto}
                            autoComplete="off" />
                        <input
                            name="direccion"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Dirección del cliente"
                            value={direccion}
                            onChange={handleClientesChange}
                            onBlur={formatearTexto}
                            autoComplete="off" />
                        <input
                            type="number"
                            name="celular"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            value={celular}
                            onChange={handleClientesChange}
                            placeholder="Celular del cliente"
                            autoComplete="off" />
                        <div>

                            <button
                                type="submit"
                                className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput">
                                Registrar cliente
                            </button>
                            <button
                                type="button"
                                className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                                onClick={resetClientes}
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
