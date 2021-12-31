import React, { useEffect, useReducer, useState } from 'react';
import '../../styles/registrarUsuario.css';
import { useForm } from '../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { axiosPetition, respuesta } from '../../helpers/Axios';
import { useHistory, Link } from 'react-router-dom';

export const RegistrarInsumo = () => {

    const history = useHistory();

    const [unidadesState, setUnidadesState] = useState('stock');
    const identificador = useReducer();

    const [insumosValues, handleInsumosChange, resetInsumos, formatearTexto] = useForm({
        nombre: '',
        unidades: 'stock',
        stock: '',
        gramaje: '',
        categoria: 'Comida',
        disponibilidad: 'Disponible',
        estado: 'Activo'
    });

    const { unidades, nombre, stock, gramaje, categoria } = insumosValues;

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
        const maxInsumo = async () => {
            await axiosPetition("insumos/max");

            if (!respuesta.ok) {
                return toast.error(respuesta.msg, configMensaje);
            }

            identificador.current.value = respuesta.maxCodigo;
        }
        maxInsumo();
    }, []);

    const registrarInsumo = async (e) => {
        e.preventDefault();

        if (insumosValues.stock === '' && insumosValues.gramaje === '') {
            toast.error('Ingresa un stock o el gramaje del insumo.', configMensaje);
        } else if (insumosValues.stock !== '' && insumosValues.gramaje !== '') {
            toast.error('Ingresa un stock o el gramaje, pero no ambos.', configMensaje);
        } else {

            insumosValues.identificador = identificador.current.value;

            await axiosPetition('insumos', insumosValues, 'POST');

            if (respuesta !== undefined) {

                if (respuesta.ok) {
                    resetInsumos();
                    toast.success('Insumo registrado correctamente.', configMensaje);
                    history.push('/insumos');
                } else {
                    toast.error(respuesta.msg, configMensaje);
                }
            }
        }
    }



    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios mx-14">
            <div className="ml-10">

                <h2 className="text-left text-4xl mt-12 mb-12 titulo">Registrar Insumos</h2>
                <form onSubmit={registrarInsumo}>
                    <div className="flex flex-wrap">
                        <input
                            name="identificador"
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            placeholder="Identificador del insumo"
                            ref={identificador}
                            title="Identificador del insumo"
                            autoComplete="off"
                            disabled />
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
                        <select
                            className="w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput"
                            name="unidades"
                            value={unidades}
                            onChange={(e) => {
                                setUnidadesState(e.target.value);
                                insumosValues.gramaje = '';
                                insumosValues.stock = '';
                                handleInsumosChange(e);
                            }}
                        >
                            <option value="stock">Unidades</option>
                            <option value="gramos">Gramos</option>
                        </select>
                        <input
                            type="number"
                            className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${unidadesState !== 'stock' ? 'hidden' : ''}`}
                            name="stock"
                            value={stock}
                            onChange={handleInsumosChange}
                            placeholder='Stock'
                            autoComplete='off'
                        />
                        <input
                            type="number"
                            className={`w-80 p-2 pl-8 pr-8 mr-1 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput ${unidadesState !== 'gramos' ? 'hidden' : ''}`}
                            name="gramaje"
                            value={gramaje}
                            onChange={handleInsumosChange}
                            placeholder='Gramaje'
                            autoComplete='off'
                        />
                        <div>
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
