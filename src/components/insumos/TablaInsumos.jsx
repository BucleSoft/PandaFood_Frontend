import React from 'react';
import '../../styles/tablaUsuarios.css';
import Lapiz from '../../assets/lapiz.svg';
import Eliminar from '../../assets/eliminar.svg';
import { useHistory } from 'react-router-dom';
import { axiosPetition, respuesta, resetRespuesta } from '../../helpers/Axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useBanderaContext } from '../../context/banderaContext';
import { faCoffee, faBreadSlice, faCheckCircle, faTimesCircle, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { useConsultarInsumoContext } from '../../context/consultarInsumoContext';

export const TablaInsumos = ({ props }) => {

    let { identificador, nombre, stock, categoria, disponibilidad } = props;

    const { setInsumoEditar } = useConsultarInsumoContext();

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

    const obtenerInfoInsumo = async () => {
        resetRespuesta();
        await axiosPetition(`insumos/${identificador}`);
        if (respuesta.ok) {
            setInsumoEditar(respuesta.insumo);
            history.push('/insumos/editar');
        } else {
            toast.error(respuesta.msg, configMensaje);
        }
    }

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
                    <p className="text-white whitespace-no-wrap">{stock}</p>
                </td>
                <td className="text-white">
                    {
                        categoria === 'Bebida' ?
                            <FontAwesomeIcon
                                className='mr-1'
                                icon={faCoffee}
                                title='Bebida'
                            />
                            :
                            <FontAwesomeIcon
                                className='mr-1'
                                icon={faBreadSlice}
                                title='Comida'
                            />
                    }
                </td>
                <td className="px-5 py-3   text-sm text-center">
                    <span
                        className={`relative inline-block px-3 py-1 font-semibold ${disponibilidad === 'Disponible' ? 'text-green-900' : 'text-red-900'} leading-tight`}>
                        <span aria-hidden
                            className={`absolute inset-0 ${disponibilidad === 'Disponible' ? 'bg-green-200' : 'bg-red-300'} opacity-50 rounded-full`}></span>
                        <span className="relative">
                            <FontAwesomeIcon
                                className='mr-1 text-green-900'
                                icon={faCheckCircle}
                            />
                            {
                                disponibilidad
                            }</span>
                    </span>
                </td>
                <td className="flex px-5 py-3 text-sm justify-center">
                    <img
                        className="tablaItem" src={Lapiz}
                        onClick={obtenerInfoInsumo}
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
