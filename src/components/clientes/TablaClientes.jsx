import React from 'react';
import '../../styles/tablaUsuarios.css';
import Lapiz from '../../assets/lapiz.svg';
import Eliminar from '../../assets/eliminar.svg';
import { useHistory } from 'react-router-dom';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { useConsultarClienteContext } from '../../context/consultarClienteContext';

export const TablaClientes = ({ props }) => {

    let { cedula, nombre, puntos, estado } = props;

    const { setClienteEditar } = useConsultarClienteContext();

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

    const obtenerInfoCliente = async () => {

        await axiosPetition(`clientes/${cedula}`);

        if (respuesta.ok) {
            setClienteEditar(respuesta.cliente);
            history.push('/clientes/editar');
        } else {
            toast.error(respuesta.msg, configMensaje);
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
                    <p className="text-white whitespace-no-wrap">{puntos}</p>
                </td>
                <td className="px-5 py-3   text-sm text-center">
                    <span
                        className={`relative inline-block px-3 py-1 font-semibold ${estado === 'Activo' ? 'text-green-900' : 'text-red-900'} leading-tight`}>
                        <span aria-hidden
                            className={`absolute inset-0 ${estado === 'Activo' ? 'bg-green-200' : 'bg-red-300'} opacity-50 rounded-full`}></span>
                        <span className="relative">{estado}</span>
                    </span>
                </td>
                <td className="flex px-5 py-3 text-sm justify-center">
                    <img
                        className="tablaItem" src={Lapiz}
                        onClick={obtenerInfoCliente}
                        alt="ícono lápiz"
                    ></img>
                    {estado === 'Activo'
                        ?
                        <img
                            className="ml-3 tablaItem"
                            src={Eliminar}
                            alt="ícono eliminar"
                        >
                        </img>
                        :

                        <FontAwesomeIcon
                            className='ml-2 text-blue-500 tablaItem recoverIcon'
                            icon={faUndoAlt}
                        />
                    }
                </td>
            </tr>
            <tr id="espacio"></tr>
        </>
    );
}
