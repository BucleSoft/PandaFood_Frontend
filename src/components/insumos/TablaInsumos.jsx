import React, { useEffect, useState } from 'react';
import '../../styles/tablaUsuarios.css';
import '../../styles/tablaInsumos.css';
import Lapiz from '../../assets/lapiz.svg';
import { useHistory } from 'react-router-dom';
import { axiosPetition } from '../../helpers/Axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBreadSlice, faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useConsultarInsumoContext } from '../../context/consultarInsumoContext';

export const TablaInsumos = ({ props }) => {

    let { identificador, unidades, nombre, cantidad, categoria } = props;

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
        const insumo = await axiosPetition(`insumos/${identificador}`);
        if (insumo.ok) {
            setInsumoEditar(insumo.insumo);
            history.push('/insumos/editar');
        } else {
            toast.error(insumo.msg, configMensaje);
        }
    }

    useEffect(() => {
        if (unidades === "stock" && categoria === 'Bebida') {
            if (cantidad > 5) {
                setDisponibilidad('Disponible');
            } else if (cantidad <= 5 && cantidad > 0) {
                setDisponibilidad('Por agotarse');
            } else {
                setDisponibilidad('Agotado');
            }
        } else if (unidades === "stock" && categoria === 'Comida') {
            if (cantidad > 12) {
                setDisponibilidad('Disponible');
            } else if (cantidad <= 12 && cantidad > 0) {
                setDisponibilidad('Por agotarse');
            } else {
                setDisponibilidad('Agotado');
            }
        } else if (unidades === "gramos") {
            if (cantidad > 500) {
                setDisponibilidad('Disponible');
            } else if (cantidad <= 500 && cantidad > 0) {
                setDisponibilidad('Por agotarse');
            } else {
                setDisponibilidad('Agotado');
            }
        }

    }, []);

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
                    <p className="text-white whitespace-no-wrap">{unidades === "gramos" ? cantidad + 'g' : cantidad}</p>
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
