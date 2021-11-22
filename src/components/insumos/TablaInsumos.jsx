import React, { useEffect, useState } from 'react';
import '../../styles/tablaUsuarios.css';
import '../../styles/tablaInsumos.css';
import Lapiz from '../../assets/lapiz.svg';
import Eliminar from '../../assets/eliminar.svg';
import { useHistory } from 'react-router-dom';
import { axiosPetition, respuesta, resetRespuesta } from '../../helpers/Axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useBanderaContext } from '../../context/banderaContext';
import { faCoffee, faBreadSlice, faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useConsultarInsumoContext } from '../../context/consultarInsumoContext';

export const TablaInsumos = ({ props }) => {

    let { identificador, nombre, stock, gramaje, categoria } = props;

    const { setInsumoEditar } = useConsultarInsumoContext();

    const [disponibilidad, setDisponibilidad] = useState('Disponible');

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

    useEffect(() => {
        if (stock !== null && categoria === 'Bebida') {
            if (stock > 5) {
                setDisponibilidad('Disponible');
            } else if (stock <= 5 && stock > 0) {
                setDisponibilidad('Por agotarse');
            } else {
                setDisponibilidad('Agotado');
            }
        } else if (stock !== null && categoria === 'Comida') {
            if (stock > 12) {
                setDisponibilidad('Disponible');
            } else if (stock <= 12 && stock > 0) {
                setDisponibilidad('Por agotarse');
            } else {
                setDisponibilidad('Agotado');
            }
        } else if (gramaje !== null) {
            if (gramaje > 500) {
                setDisponibilidad('Disponible');
            } else if (gramaje <= 500 && gramaje > 0) {
                setDisponibilidad('Por agotarse');
            } else {
                setDisponibilidad('Agotado');
            }
        }

    }, []);

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
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-white font-semibold whitespace-no-wrap">{identificador}</p>
                </td>
                <td className="px-5 py-3 text-sm">
                    <div>
                        <p className="text-left text-white whitespace-no-wrap">
                            {nombre}
                        </p>
                    </div>
                </td>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-white whitespace-no-wrap">{stock === null ? gramaje + 'g' : stock}</p>
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
                <td className="pl-14 py-3 text-sm text-left">
                    <span
                        className={`w-32 relative inline-block py-1 font-semibold text-white leading-tight rounded-full`}
                    >
                        <span aria-hidden
                        ></span>
                        <span className="relative">
                            <FontAwesomeIcon
                                className='mr-1'
                                icon={disponibilidad === 'Disponible' ? faCheckCircle : disponibilidad === 'Por agotarse' ? faClock : faTimesCircle}
                            />
                            {disponibilidad}
                        </span>
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
