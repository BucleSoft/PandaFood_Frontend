import React, { useRef } from 'react'
import { toast } from 'react-toastify';
import { axiosPetition, respuesta } from '../../helpers/Axios';

export const Categoria = ({ hidden, setHidden, bandera, setBandera }) => {

    const nombreCategoria = useRef();
    const tipo = useRef();

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

    const crearCategoria = async (e) => {

        e.preventDefault();

        const categoria = { nombre: nombreCategoria.current.value.trim(), tipo: tipo.current.value }

        console.log(categoria)
        await axiosPetition('categorias', categoria, 'POST');

        if (!respuesta.ok) {
            return toast.error(respuesta.msg, configMensaje);
        }

        setHidden(true);
        setBandera(!bandera);
    }

    return (
        <div
            id="fondoModal"
            className={`absolute h-full w-full flex justify-center items-center text-white cursor-pointer ${hidden ? "hidden" : ''}`}
        >
            <div
                id="modal"
                className="bg-white rounded-2xl border-2 border-gray-500 mr-96 px-40 py-10 cursor-default"
            >
                <h2 className="text-3xl mb-4 titulo">Nueva Categoría</h2>
                <form className="flex flex-col" onSubmit={crearCategoria}>
                    <input
                        ref={nombreCategoria}
                        placeholder="Nombre de la categoría"
                        className="focus:outline-none text-center border-2 mb-4 p-2 border-white w-52 formInput h-auto rounded-lg" type="text" />
                    <select
                        className="focus:outline-none text-center border-2 p-2 border-gray-500 w-52 formInput h-auto rounded-lg"
                        ref={tipo}
                    >
                        <option value="Insumos">Insumos</option>
                        <option value="Stock">Stock</option>
                    </select>
                    <div className="mt-6">
                        <button
                            type="button"
                            className="py-2 px-3 mr-4 rounded-md botonInput" onClick={(e) => {
                                e.preventDefault();
                                setHidden(true);
                            }}>Cancelar</button>
                        <button
                            type="submit"
                            className="py-2 px-3 rounded-md botonPrincipalInput">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
