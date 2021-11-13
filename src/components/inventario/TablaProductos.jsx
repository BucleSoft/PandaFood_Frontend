import React from 'react';
import '../../styles/tablaUsuarios.css';
import Lapiz from '../../assets/lapiz.svg';
import Eliminar from '../../assets/eliminar.svg';
import { useHistory } from 'react-router-dom';
import { axiosPetition, respuesta, resetRespuesta } from '../../helpers/Axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt, faCoffee, faBreadSlice } from '@fortawesome/free-solid-svg-icons';
import { useBanderaContext } from '../../context/banderaContext';

export const TablaProductos = ({ props }) => {

    let { identificador, nombre, precio, stock, categoria } = props;

    // const { bandera, setBandera } = useBanderaContext();

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

    // const obtenerInfoCliente = async () => {
    //     resetRespuesta();
    //     await axiosPetition(`clientes/${cedula}`);
    //     if (respuesta.ok) {
    //         setClienteEditar(respuesta.cliente);
    //         history.push('/clientes/editar');
    //     } else {
    //         toast.error(respuesta.msg, configMensaje);
    //     }
    // }

    // const inhabilitarCliente = async () => {

    //     if (estado === 'Activo') {
    //         await axiosPetition(`clientes/estado/${cedula}`, { estado: 'Inactivo' }, 'PUT');
    //     } else {
    //         await axiosPetition(`clientes/estado/${cedula}`, { estado: 'Activo' }, 'PUT');
    //     }

    //     if (respuesta.ok) {
    //         toast.success('Cliente habilitado/deshabilitado correctamente.', configMensaje);
    //         if (estado === 'Activo') {
    //             estado = 'Inactivo';
    //         } else {
    //             estado = 'Activo';
    //         }
    //         setBandera(!bandera);
    //     }
    // }

    return (
        <>
            <tr>
                <td className="px-5 py-3   text-sm text-left">
                    <p className="text-white whitespace-no-wrap">{identificador}</p>
                </td>
                <td className="px-5 py-3   text-sm">
                    <div>
                        <p className="text-left text-white whitespace-no-wrap">
                            {nombre}
                        </p>
                    </div>
                </td>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-white whitespace-no-wrap">{precio}</p>
                </td>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-white whitespace-no-wrap">{stock}</p>
                </td>
                <td className="text-white">
                    {
                        categoria === 'Bebida' ?
                            <FontAwesomeIcon
                                className='mr-1'
                                icon={faCoffee}
                            />
                            :
                            <FontAwesomeIcon
                                className='mr-1'
                                icon={faBreadSlice}
                            />
                    }
                </td>
                <td className="px-5 py-3   text-sm text-center">
                    <span
                        className={`relative inline-block px-3 py-1 font-semibold ${categoria === 'Bebida' ? 'text-green-900' : 'text-red-900'} leading-tight`}>
                        <span aria-hidden
                            className={`absolute inset-0 ${categoria === 'Bebida' ? 'bg-green-200' : 'bg-red-300'} opacity-50 rounded-full`}></span>
                        <span className="relative">{categoria}</span>
                    </span>
                </td>
                <td className="flex px-5 py-3 text-sm justify-center">
                    <img
                        className="tablaItem" src={Lapiz}
                        // onClick={obtenerInfoCliente}
                        alt="ícono lápiz"
                    ></img>
                    {/* <img
                        className="tablaItem" src={Lapiz}
                        // onClick={obtenerInfoCliente}
                        alt="ícono lápiz"
                    ></img>
                    {estado === 'Activo'
                        ?
                        <img
                            className="ml-3 tablaItem"
                            src={Eliminar}
                            alt="ícono eliminar"
                        // onClick={inhabilitarCliente}
                        >
                        </img>
                        :

                        <FontAwesomeIcon
                            className='ml-2 text-blue-500 tablaItem recoverIcon'
                            icon={faUndoAlt}
                        // onClick={inhabilitarCliente}
                        />
                    } */}
                </td>
            </tr>
            <tr id="espacio"></tr>
        </>
    );
}
