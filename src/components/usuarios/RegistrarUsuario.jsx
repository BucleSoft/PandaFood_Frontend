import React, { useRef } from 'react';
import '../../styles/registrarUsuario.css';
import { useForm } from '../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { axiosPetition } from '../../helpers/Axios';
import { useHistory, Link } from 'react-router-dom';

export const RegistrarUsuario = () => {

    const repContraseña = useRef();

    const history = useHistory();

    const [usuariosValues, handleUsuariosChange, resetUsuarios] = useForm({
        cedula: '',
        nombre: '',
        celular: '',
        contraseña: '',
        tipo_usuario: 'Vendedor',
        estado: 'Autorizado'
    });

    const { cedula, nombre, celular, contraseña, tipo_usuario } = usuariosValues;

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

    const registrarUsuario = async (e) => {
        e.preventDefault();
        if (repContraseña.current.value.length === 0) {
            toast.error('Llene todos los campos, por favor.', configMensaje);
        } else if (repContraseña.current.value === contraseña) {
            const registro = await axiosPetition('usuarios', usuariosValues, 'POST');

            if (registro !== undefined) {

                if (registro.ok) {
                    resetUsuarios();
                    repContraseña.current.value = '';
                    toast.success('Usuario registrado correctamente.', configMensaje);
                    history.push('/usuarios');
                } else {
                    toast.error(registro.msg, configMensaje);
                }
            }
        } else {
            toast.error('Las contraseñas no coinciden.', configMensaje);
        }
    }

    const limpiarCampos = () => {
        resetUsuarios();
        repContraseña.current.value = '';
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios mx-16">
            <div className="ml-10">

                <h2 className="text-left text-4xl mt-12 mb-12 titulo">Registrar usuarios</h2>
                <form onSubmit={registrarUsuario}>
                    <div className="flex flex-wrap">
                        <input
                            type="number"
                            name="cedula"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Cédula del usuario"
                            value={cedula}
                            onChange={handleUsuariosChange}
                            autoComplete="off" />
                        <input
                            name="nombre"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Nombre del usuario"
                            value={nombre}
                            onChange={handleUsuariosChange}
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
                            name="contraseña"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            value={contraseña}
                            onChange={handleUsuariosChange}
                            placeholder="Contraseña"
                            autoComplete="off" />
                        <input type="password" name="rep-contraseña" ref={repContraseña} className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput" placeholder="Repetir contraseña" autoComplete="off" />
                        <select
                            name="tipo_usuario"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            value={tipo_usuario}
                            onChange={handleUsuariosChange}>
                            <option value="Administrador">Administrador</option>
                            <option value="Vendedor" defaultValue>Vendedor</option>
                        </select>
                        <button
                            type="submit"
                            className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput">
                            Registrar usuario
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
                </form>
            </div >
            <ToastContainer theme='dark' />
        </div >
    );
}
