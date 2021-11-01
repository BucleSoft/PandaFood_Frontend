import React from 'react';
import '../../styles/tablaUsuarios.css';
import Lapiz from '../../assets/lapiz.svg';
import Eliminar from '../../assets/eliminar.svg';
import { useHistory } from 'react-router-dom';
import { useConsultarUsuarioContext } from '../../context/consultarUsuarioContext';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { useBanderaContext } from '../../context/banderaContext';

export const TablaUsuarios = ({ props }) => {

    let { cedula, nombre, tipo_usuario, estado } = props;

    const { usuarioEditar, setUsuarioEditar } = useConsultarUsuarioContext();
    const { bandera, setBandera } = useBanderaContext();

    const history = useHistory();

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

    const obtenerInfoUsuario = async () => {

        await axiosPetition(`usuarios/${cedula}`);

        if (respuesta.ok) {
            setUsuarioEditar(respuesta.usuario);
            history.push('/usuarios/editar');
        } else {
            toast.error(respuesta.msg, configMensaje);
        }
    }

    const gestionarAcceso = async () => {

        if (estado === 'Autorizado') {
            await axiosPetition(`usuarios/acceso/${cedula}`, { estado: 'No autorizado' }, 'PUT');
        } else {
            await axiosPetition(`usuarios/acceso/${cedula}`, { estado: 'Autorizado' }, 'PUT');
        }

        if (respuesta.ok) {
            toast.success('Estado de usuario habilitado/deshabilitado correctamente.', configMensaje);
            if (estado === 'Autorizado') {
                estado = 'No autorizado';
            } else {
                estado = 'Autorizado';
            }
            setBandera(!bandera);
        }
    }

    return (
        <>
            <tr>
                <td className="px-5 py-3   text-sm text-left">
                    <p className="text-white whitespace-no-wrap">{cedula}</p>
                </td>
                <td className="px-5 py-3   text-sm">
                    <div>
                        <p className="text-left text-white whitespace-no-wrap">
                            {nombre}
                        </p>
                    </div>
                </td>
                <td className="px-5 py-3   text-sm text-left">
                    <p className="text-white whitespace-no-wrap">{tipo_usuario}</p>
                </td>
                <td className="px-5 py-3   text-sm text-center">
                    <span
                        className={`relative inline-block px-3 py-1 font-semibold ${estado === 'Autorizado' ? 'text-green-900' : 'text-red-900'} leading-tight`}>
                        <span aria-hidden
                            className={`absolute inset-0 ${estado === 'Autorizado' ? 'bg-green-200' : 'bg-red-300'} opacity-50 rounded-full`}></span>
                        <span className="relative">{estado}</span>
                    </span>
                </td>
                <td className="flex px-5 py-3   text-sm text-left">
                    <img
                        className="tablaItem" src={Lapiz}
                        onClick={obtenerInfoUsuario}
                    ></img>
                    {estado === 'Autorizado'
                        ?
                        <img
                            className="ml-3 tablaItem"
                            src={Eliminar}
                            onClick={gestionarAcceso}></img>
                        :

                        <FontAwesomeIcon
                            className='ml-2 text-blue-500 tablaItem recoverIcon'
                            icon={faUndoAlt}
                            onClick={gestionarAcceso} />
                    }
                </td>
            </tr>
            <tr id="espacio"></tr>
        </>
    );
}
