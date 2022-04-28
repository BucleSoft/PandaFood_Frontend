import React, { useRef, useState, useEffect } from 'react';
import '../../styles/registrarUsuario.css';
import { useForm } from '../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { axiosPetition } from '../../helpers/Axios';
import { useHistory, Link } from 'react-router-dom';
import { useConsultarUsuarioContext } from '../../context/consultarUsuarioContext';

export const EditarUsuario = () => {

    const { usuarioEditar } = useConsultarUsuarioContext();

    const repContraseña = useRef();

    const [campoInactivo, setCampoInactivo] = useState(true);

    const history = useHistory();

    const [usuariosValues, handleUsuariosChange, resetUsuarios, formatearTexto] = useForm({
        cedula: usuarioEditar?.cedula,
        nombre: usuarioEditar?.nombre,
        celular: usuarioEditar?.celular,
        contraseña: '',
        contraseñaActual: '',
        tipo_usuario: usuarioEditar?.tipo_usuario,
        estado: usuarioEditar?.estado
    });

    const { cedula, nombre, celular, contraseña, contraseñaActual, tipo_usuario, estado } = usuariosValues;

    useEffect(() => {
        if (cedula === '' || cedula === undefined || cedula === null) {
            history.push('/usuarios');
        }
    });

    useEffect(() => {
        if (contraseñaActual === '') {
            setCampoInactivo(true);
            usuariosValues.contraseña = '';
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

    const actualizarUsuario = async (e) => {
        e.preventDefault();

        if (cedula !== '') {
            let actualizar;

            if (contraseñaActual.length !== 0) {


                if (repContraseña.current.value.length === 0 || contraseña.length === 0) {
                    toast.error('Llene los campos de la contraseña nueva o borre la información de la contraseña actual.', configMensaje);
                } else {
                    if (repContraseña.current.value === contraseña) {
                        actualizar = await axiosPetition(`usuarios/${cedula}`, usuariosValues, 'PUT');

                        if (actualizar.ok === false) {
                            toast.error(actualizar.msg, configMensaje);
                        } else {
                            history.push('/usuarios');
                        }

                    } else {
                        toast.error('Las contraseñas no coinciden.', configMensaje);
                    }
                }
            } else {
                actualizar = await axiosPetition(`usuarios/${cedula}`, usuariosValues, 'PUT');

                if (actualizar.ok === false) {
                    toast.error(actualizar.msg, configMensaje);
                } else {
                    history.push('/usuarios');
                }

            }

        } else {
            toast.error('Ingrese una cédula válida por favor.', configMensaje);
        }

    }

    const limpiarCampos = () => {
        resetUsuarios();
        repContraseña.current.value = '';
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios mx-16">
            <div className="ml-10">

                <h2 className="text-left text-4xl mt-12 mb-12 titulo">Editar usuarios</h2>
                <form onSubmit={actualizarUsuario}>
                    <div className="flex flex-wrap">
                        <input
                            type="number"
                            name="cedula"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput formInputInactive"
                            value={cedula}
                            onChange={handleUsuariosChange}
                            autoComplete="off"
                            readOnly />
                        <input
                            name="nombre"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Nombre del usuario"
                            value={nombre}
                            onChange={handleUsuariosChange}
                            onBlur={formatearTexto}
                            autoComplete="off" />
                        <input
                            type="number"
                            name="celular"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            value={celular}
                            onChange={handleUsuariosChange}
                            placeholder="Celular del usuario"
                            autoComplete="off" />
                        <input
                            type="password"
                            name="contraseñaActual"
                            value={contraseñaActual}
                            onChange={handleUsuariosChange}
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Contraseña actual (opcional)"
                            autoComplete="off" />
                        <input type="password"
                            name="contraseña"
                            value={contraseña}
                            onChange={handleUsuariosChange}
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
                        <select
                            name="tipo_usuario"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            value={tipo_usuario}
                            onChange={handleUsuariosChange}>
                            <option value="Administrador">Administrador</option>
                            <option value="Vendedor" defaultValue>Vendedor</option>
                        </select>
                        <select
                            name="estado"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            value={estado}
                            onChange={handleUsuariosChange}
                        >
                            <option value="Autorizado" defaultValue>Autorizado</option>
                            <option value="No autorizado">No autorizado</option>
                        </select>
                        <div className="flex">
                            <button
                                type="submit"
                                className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput">
                                Actualizar usuario
                            </button>
                            <button
                                type="button"
                                className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                                onClick={limpiarCampos}
                            >
                                Limpiar
                            </button>
                            <Link to="/usuarios">
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
