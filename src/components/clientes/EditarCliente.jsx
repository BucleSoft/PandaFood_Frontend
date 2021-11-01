import React, { useRef, useState, useEffect } from 'react';
import '../../styles/registrarUsuario.css';
import { useForm } from '../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { useHistory, Link } from 'react-router-dom';
import { useConsultarClienteContext } from '../../context/consultarClienteContext';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "@sweetalert2/theme-dark/dark.css";

export const EditarCliente = () => {

    const MySwal = withReactContent(Swal)

    const editarPuntos = () => {
        MySwal.fire({
            title: <p>Editar puntos</p>,
            footer: 'Copyright 2018',
            theme: 'dark'
        }).then(() => {
            return MySwal.fire(<p>Shorthand works too</p>)
        });
    }

    const { clienteEditar } = useConsultarClienteContext();

    const repContraseña = useRef();

    const [campoInactivo, setCampoInactivo] = useState(true);

    const history = useHistory();

    const [clientesValues, handleClientesChange, resetClientes, formatearTexto] = useForm({
        cedula: clienteEditar?.cedula,
        nombre: clienteEditar?.nombre,
        celular: clienteEditar?.celular,
        direccion: clienteEditar?.direccion,
        contraseña: '',
        contraseñaActual: '',
        estado: clienteEditar?.estado,
        puntos: clienteEditar?.puntos
    });

    const { cedula, nombre, celular, direccion, contraseña, contraseñaActual, estado, puntos } = clientesValues;

    useEffect(() => {
        if (cedula === '' || cedula === undefined || cedula === null) {
            history.push('/clientes');
        }
    });

    useEffect(() => {
        if (contraseñaActual === '') {
            setCampoInactivo(true);
            clientesValues.contraseña = '';
            repContraseña.current.value = '';
        } else {
            setCampoInactivo(false);
        }
    }, [contraseñaActual]);

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

            if (contraseñaActual.length !== 0) {

                if (repContraseña.current.value.length === 0 || contraseña.length === 0) {
                    toast.error('Llene los campos de la contraseña nueva o borre la información de la contraseña actual.', configMensaje);
                } else {
                    if (repContraseña.current.value === contraseña) {
                        await axiosPetition(`clientes/${cedula}`, clientesValues, 'PUT');

                        if (respuesta.ok === false) {
                            toast.error(respuesta.msg, configMensaje);
                        } else {
                            history.push('/clientes');
                        }

                    } else {
                        toast.error('Las contraseñas no coinciden.', configMensaje);
                    }
                }
            } else {
                await axiosPetition(`clientes/${cedula}`, clientesValues, 'PUT');

                if (respuesta.ok === false) {
                    toast.error(respuesta.msg, configMensaje);
                } else {
                    history.push('/clientes');
                }

            }

        } else {
            toast.error('Ingrese una cédula válida por favor.', configMensaje);
        }

    }

    const limpiarCampos = () => {
        resetClientes();
        repContraseña.current.value = '';
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios">
            <div className="ml-10 ">

                <h2 className="text-left text-4xl font-semibold mt-12 mb-12 titulo">Editar clientes</h2>
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
                                type="password"
                                name="contraseñaActual"
                                value={contraseñaActual}
                                onChange={handleClientesChange}
                                className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                                placeholder="Contraseña actual (opcional)"
                                autoComplete="off" />
                            <input type="password"
                                name="contraseña"
                                value={contraseña}
                                onChange={handleClientesChange}
                                className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${campoInactivo ? 'formInputInactive' : ''}`}
                                placeholder="Nueva contraseña"
                                autoComplete="off"
                                disabled={campoInactivo} />
                            <input
                                type="password"
                                name="rep-contraseña"
                                ref={repContraseña}
                                className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${campoInactivo ? 'formInputInactive' : ''}`}
                                placeholder="Repetir contraseña"
                                autoComplete="off"
                                disabled={campoInactivo} />
                            <input
                                type="text"
                                name="direccion"
                                value={direccion}
                                onChange={handleClientesChange}
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
                                <p className="text-8xl text-white">{puntos}</p>
                                <div className="flex items-start mt-2">
                                    <button className="ml-2 cursor-pointer outline-none">
                                        <FontAwesomeIcon
                                            className='text-white text-xl'
                                            icon={faEdit}
                                            onClick={editarPuntos}
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
                                onClick={limpiarCampos}
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
