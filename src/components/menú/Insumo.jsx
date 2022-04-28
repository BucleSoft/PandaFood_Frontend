import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosPetition } from '../../helpers/Axios';
import '../../styles/insumos.css';

export const Insumo = ({ index, insumo, listaInsumos, setListaInsumos }) => {

    const [visibilidad, setVisibilidad] = useState(true);
    const [infoInsumo, setInfoInsumo] = useState({});

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

    useEffect(() => {
        const buscarInsumo = async () => {
            const busqueda = await axiosPetition(`insumos/${insumo.id_insumo}`);

            if (!busqueda.ok) {
                return toast.error(busqueda.msg, configMensaje)
            }

            setInfoInsumo(busqueda.insumo);
        }

        buscarInsumo();
    }, []);

    const eliminarInsumo = async () => {

        delete listaInsumos[index];
        setListaInsumos(listaInsumos);
        setVisibilidad(false);

    }

    return (
        <div className={`text-white py-1 rounded-xl w-56 h-8 mx-2 mt-2 outline-none filtro cursor-pointer ${visibilidad === false ? 'hidden' : ''}`}
            onClick={eliminarInsumo}>
            <h2 className="text-white text-sm">{infoInsumo.unidades === 'stock' ? insumo.cantidad + ' ' + infoInsumo.nombre : insumo.cantidad + 'g ' + infoInsumo.nombre}</h2>
        </div>
    );
}
