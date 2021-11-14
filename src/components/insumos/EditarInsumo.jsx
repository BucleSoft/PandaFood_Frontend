import React, { useEffect } from 'react';
import '../../styles/registrarUsuario.css';
import { useForm } from '../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { useHistory, Link } from 'react-router-dom';
import { useConsultarInsumoContext } from '../../context/consultarInsumoContext';

export const EditarInsumo = () => {

    const { insumoEditar } = useConsultarInsumoContext();

    const history = useHistory();

    const [insumosValues, handleInsumosChange, resetInsumos, formatearTexto] = useForm({
        identificador: insumoEditar?.identificador,
        nombre: insumoEditar?.nombre,
        stock: insumoEditar?.stock,
        categoria: insumoEditar?.categoria,
        disponibilidad: '',
        estado: insumoEditar?.estado
    });

    const { identificador, nombre, stock, categoria, estado } = insumosValues;

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
        if (identificador === '' || identificador == null || identificador == undefined) {
            history.push('/insumos');
        }
    }, []);

    const actualizarInsumo = async (e) => {
        e.preventDefault();
        if (identificador !== '') {
            await axiosPetition(`insumos/${identificador}`, insumosValues, 'PUT');
            if (respuesta.ok === false) {
                toast.error(respuesta.msg, configMensaje);
            } else {
                history.push('/insumos');
            }
        } else {
            toast.error('Ingrese un identificador válido por favor.', configMensaje);
        }
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios">
            <div className="ml-10">

                <h2 className="text-left text-4xl mt-12 mb-12 titulo">Editar Insumo</h2>
                <form onSubmit={actualizarInsumo}>
                    <div className="flex flex-wrap">
                        <input
                            name="identificador"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Identificador del insumo"
                            value={identificador}
                            onChange={handleInsumosChange}
                            autoComplete="off" />
                        <input
                            name="nombre"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Nombre del insumo"
                            value={nombre}
                            onChange={handleInsumosChange}
                            onBlur={formatearTexto}
                            autoComplete="off" />
                        <select
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            name="categoria"
                            onChange={handleInsumosChange}
                            value={categoria}
                        >
                            <option>Comida</option>
                            <option>Bebida</option>
                        </select>
                        <div>
                            <div className="flex flex-col mb-12">
                                <h2 className="text-3xl font-semibold titulo">Stock del insumo</h2>
                                <div className="flex justify-center">
                                    <input
                                        type="number"
                                        className="bigInput w-40 text-8xl text-white border-b-2 text-center bg-transparent focus:outline-none"
                                        name="stock"
                                        value={stock}
                                        onChange={handleInsumosChange}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput">
                                Registrar insumo
                            </button>
                            <button
                                type="button"
                                className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                                onClick={resetInsumos}
                            >
                                Limpiar
                            </button>
                            <Link to="/insumos">
                                <button
                                    type="button"
                                    className="text-lg mb-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                                >
                                    Cancelar
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div >
            <ToastContainer theme='dark' />
        </div >
    );
}
