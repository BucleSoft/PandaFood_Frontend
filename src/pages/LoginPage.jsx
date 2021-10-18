import React from 'react';
import logo from '../images/logo-PandaFood.svg';
import '../styles/login.css';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div id="col-izq" className="min-h-screen pt-12 md:pt-20 pb-6 px-6">
                <div id="conten-izq" className="max-w-md mx-auto mt-12">
                    <h2 className="text-lg text-left max-w-lg text-gray-500">Bienvenido a</h2>
                    <h1 id="titulo-principal" className="text-4xl font-bold mb-12 text-left max-w-lg">Panda Food</h1>
                    <form className="flex flex-col">
                        <label className="text-lg max-w-lg text-left mb-2 text-gray-600" htmlFor="usuario">Usuario:</label>
                        <input name="usuario" className="text-lg max-w-lg border-2 border-gray-300 h-12 p-2 rounded-lg focus:outline-none text-gray-700 shadow-lg" placeholder="Ingresa tu nombre de usuario" autoComplete="off" />
                        <label className="text-lg max-w-lg text-left mt-8 mb-2 text-gray-600" htmlFor="contraseña">Contraseña:</label>
                        <input type="password" name="contraseña" className="text-lg max-w-lg border-2 border-gray-300 h-12 mb-4 p-2 rounded-lg focus:outline-none text-gray-700 shadow-lg" placeholder="Ingresa tu contraseña" autoComplete="off" />
                        <div id="ayudas-login" className="flex justify-between mb-12">
                            <div>
                                <input type="checkbox" />
                                <label className="ml-1">Recuérdame</label>
                            </div>
                            <a id="recuperar-pass" href="#">Olvidé mi contraseña</a>
                        </div>
                        <Link to="/perfil" className="text-lg h-14 text-white rounded-lg shadow-2xl">
                            <button id="boton-login" className="text-lg h-14 w-full text-white rounded-lg">Iniciar Sesión</button>
                        </Link>
                    </form>
                </div>
            </div>
            <div id="col-der" className="flex flex-col justify-center h-screen invisible md:visible">
                <img id="logo" src={logo}></img>
            </div>
        </div>
    )
}
