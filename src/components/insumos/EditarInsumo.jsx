import React, { useEffect, useState } from 'react';
import '../../styles/registrarUsuario.css';
import { useForm } from '../../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import { axiosPetition } from '../../helpers/Axios';
import { useHistory, Link } from 'react-router-dom';
import { useConsultarInsumoContext } from '../../context/consultarInsumoContext';

export const EditarInsumo = () => {

    const { insumoEditar } = useConsultarInsumoContext();
    const history = useHistory();

    const [unidadesState, setUnidadesState] = useState(insumoEditar?.unidades === "gramos" ? 'gramos' : 'stock');

    const [insumosValues, handleInsumosChange, resetInsumos, formatearTexto] = useForm({
        identificador: insumoEditar?.identificador,
        unidades: insumoEditar?.unidades,
        nombre: insumoEditar?.nombre,
        cantidad: insumoEditar?.cantidad,
        categoria: insumoEditar?.categoria,
        estado: insumoEditar?.estado
    });

    let { identificador, unidades, nombre, cantidad, categoria } = insumosValues;

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
            const actualizar = await axiosPetition(`insumos/${identificador}`, insumosValues, 'PUT');
            if (actualizar.ok === false) {
                toast.error(actualizar.msg, configMensaje);
            } else {
                history.push('/insumos');
            }
        } else {
            toast.error('Ingrese un id válido por favor.', configMensaje);
        }
    }

    const reiniciar = () => {
        resetInsumos();
        if (insumoEditar?.unidades === "gramos") {
            setUnidadesState('gramos');
        } else {
            setUnidadesState('stock');
        }
    }

    return (
        <div className="flex flex-col w-full h-screen overflow-y-scroll usuarios mx-16">
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
                                handleInsumosChange(e);
                            }}
                        >
                            <option value="stock">Unidades</option>
                            <option value="gramos">Gramos</option>
                        </select>
                        <input
                            type="number"
                            className={`w-80 p-2 pl-8 pr-8 mr-8 mb-8 rounded-sm border-b-2 text-center focus:outline-none formInput`}
                            name="cantidad"
                            value={cantidad}
                            onChange={handleInsumosChange}
                            placeholder='Cantidad'
                            autoComplete='off'
                        />
                        <div>
                            <button
                                type="submit"
                                className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonPrincipalInput">
                                Actualizar insumo
                            </button>
                            <button
                                type="button"
                                className="text-lg mb-8 mr-8 h-12 w-80 text-white rounded-lg focus:outline-none botonInput"
                                onClick={reiniciar}
                            >
                                Restaurar
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
