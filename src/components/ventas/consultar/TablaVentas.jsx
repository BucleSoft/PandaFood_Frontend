import React, { useEffect, useState } from 'react';
import Lapiz from '../../../assets/lapiz.svg';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { axiosPetition } from '../../../helpers/Axios';
import { useEditarVentaContext } from '../../../context/editarVentaContext';

export const TablaVentas = ({ props, filtro }) => {

    let { identificador, fecha, cliente, total, tipoVenta, idMesa } = props;

    const fechaParseada = new Date(fecha).toLocaleDateString();
    const [nombreCliente, setNombreCliente] = useState('');
    const [mesa, setMesa] = useState("-");
    const { setEditarVenta } = useEditarVentaContext();

    const history = useHistory();

    useEffect(() => {

        let isMount = true;

        const buscarCliente = async (isMount) => {

            const busqueda = await axiosPetition(`clientes/${cliente}`);

            if (busqueda.ok === false) {
                return toast.error("Error");
            }

            if (isMount) {
                setNombreCliente(busqueda.cliente.nombre);
            }

        }

        const buscarMesa = async (isMount) => {

            if (idMesa !== null) {

                const buscarMesa = await axiosPetition(`mesas/nombre/${idMesa}`);

                if (!buscarMesa.ok) {
                    return toast.error(buscarMesa.msg, configMensaje);
                }

                if (isMount) {
                    setMesa(buscarMesa.mesa);
                }
            }
        }

        buscarCliente(isMount);
        buscarMesa(isMount);

        return () => {
            isMount = false;
        }


    }, []);


    // const history = useHistory();

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

    return (
        <>
            <tr>
                <td className="px-5 py-3 text-sm text-left">
                    <p className="text-white font-semibold whitespace-no-wrap">{identificador}</p>
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
                <td className={`px-5 text-white text-left font-normal ${filtro === "Domicilio" || filtro === "Redimir" ? "hidden" : ""}`}>
                    <p className="text-white whitespace-no-wrap">{mesa}</p>
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
                                    title="Editar venta"
                                    onClick={() => {
                                        setEditarVenta(props);
                                        history.push("/ventas/editar");
                                    }}
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
