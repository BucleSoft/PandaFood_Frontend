import React, { useState, useEffect } from 'react';
import '../../styles/registrarUsuario.css';
import { useForm } from '../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { useHistory, Link } from 'react-router-dom';
import { useConsultarClienteContext } from '../../context/consultarClienteContext';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditarPuntos } from './modales/EditarPuntos';

export const EditarCliente = () => {

    const { clienteEditar } = useConsultarClienteContext();

    const [hidden, setHidden] = useState(true);

    const [puntosCliente, setPuntosCliente] = useState(clienteEditar?.puntos);

    const history = useHistory();

    const [clientesValues, handleClientesChange, resetClientes, formatearTexto] = useForm({
        cedula: clienteEditar?.cedula,
        nombre: clienteEditar?.nombre,
        celular: clienteEditar?.celular,
        direccion: clienteEditar?.direccion,
        estado: clienteEditar?.estado
    });

    const { cedula, nombre, celular, direccion, estado } = clientesValues;

    useEffect(() => {
        if (cedula === '' || cedula === undefined || cedula === null) {
            history.push('/clientes');
        }
    }, []);

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

    const actualizarCliente = async (e) => {
        e.preventDefault();
        if (cedula !== '') {
            const data = { ...clientesValues, puntos: puntosCliente }
            await axiosPetition(`clientes/${cedula}`, data, 'PUT');
            if (respuesta.ok === false) {
                toast.error(respuesta.msg, configMensaje);
            } else {
                history.push('/clientes');
            }
        } else {
            toast.error('Ingrese una cédula válida por favor.', configMensaje);
        }
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios mx-16">
            <div className="ml-10 ">

                <h2 className="text-left text-4xl mt-12 mb-12 titulo">Editar clientes</h2>
                <form onSubmit={actualizarCliente}>
                    <div className="flex flex-col">
                        <div className="flex flex-wrap">
                            <input
                                type="number"
                                name="cedula"
                                className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput formInputInactive"
                                value={cedula}
                                onChange={handleClientesChange}
                                autoComplete="off"
                                readOnly />
                            <input
                                name="nombre"
                                className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                                placeholder="Nombre del cliente"
                                value={nombre}
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
                            <input
                                type="text"
                                name="direccion"
                                value={direccion}
                                onChange={handleClientesChange}
                                onBlur={formatearTexto}
                                className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                                placeholder="Dirección del cliente"
                                autoComplete="off" />
                            <select
                                name="estado"
                                className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                                value={estado}
                                onChange={handleClientesChange}
                            >
                                <option value="Activo" defaultValue>Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                        <div className="flex flex-col mb-12 mr-52">
                            <h2 className="text-3xl font-semibold titulo">Puntos del cliente</h2>
                            <div className="flex justify-center">
                                <p className="text-8xl text-white">{puntosCliente}</p>
                                <div className="flex items-start mt-2">
                                    <button
                                        type="button"
                                        className="ml-2 cursor-pointer outline-none">
                                        <FontAwesomeIcon
                                            className='text-white text-xl'
                                            icon={faEdit}
                                            onClick={() => {
                                                setHidden(false);
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <button
                                type="submit"
                                className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput">
                                Actualizar cliente
                            </button>
                            <button
                                type="button"
                                className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                                onClick={() => resetClientes()}
                            >
                                Restaurar
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
            <EditarPuntos hidden={hidden} setHidden={setHidden} puntos={puntosCliente} setPuntos={setPuntosCliente} />
        </div >
    );
}
