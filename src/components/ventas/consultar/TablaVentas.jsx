import React, { useEffect, useState } from 'react';
import Lapiz from '../../../assets/lapiz.svg';
import Eliminar from '../../../assets/eliminar.svg';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBreadSlice, faCheckCircle, faClock, faTimesCircle, faCopy } from '@fortawesome/free-solid-svg-icons';
import { axiosPetition, respuesta } from '../../../helpers/Axios';

export const TablaVentas = ({ props }) => {

    let { numVenta, fecha, cliente, total, tipoVenta } = props;

    const fechaParseada = new Date(fecha).toLocaleDateString();
    const [nombreCliente, setNombreCliente] = useState('');

    useEffect(() => {
        const buscarCliente = async () => {
            await axiosPetition(`clientes/${cliente}`, 'GET');

            if (respuesta.ok === false) {
                toast.error("Error");
            }

            setNombreCliente(respuesta.cliente.nombre);

        }
        buscarCliente();
    }, []);


    // const history = useHistory();

    // const configMensaje = {
    //     position: "bottom-center",
    //     background: "#191c1f !important",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     progress: undefined,
    // };

    return (
        <>
            <tr>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-white font-semibold whitespace-no-wrap">{numVenta}</p>
                </td>
                <td className="py-3 text-sm text-left text-white">
                    {tipoVenta === 'Restaurante' ? 'Venta en restaurante' : tipoVenta === 'Redimir' ? 'Redimir puntos' : tipoVenta}
                </td>
                <td className="px-5 py-3 text-sm">
                    <div>
                        <p className="text-left text-white whitespace-no-wrap">
                            {
                                fechaParseada
                            }
                        </p>
                    </div>
                </td>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-white whitespace-no-wrap">{nombreCliente}</p>
                </td>
                <td className="px-5 text-white text-left font-normal">
                    {
                        tipoVenta === 'Redimir' ? total + ' pts' : total
                    }
                </td>
                <td className="flex px-5 py-3 text-sm justify-center">
                    {
                        tipoVenta !== 'Redimir' ?
                            <div className='flex gap-2'>
                                <img
                                    className="tablaItem" src={Lapiz}
                                    alt="ícono lápiz"
                                ></img>
                                <FontAwesomeIcon className='text-white text-xl cursor-pointer' icon={faCopy} title="Imprimir factura" />
                            </div>
                            :
                            null}
                </td>
            </tr>
            <tr id="espacio"></tr>
        </>
    );
}
