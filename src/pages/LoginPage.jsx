import React from 'react';
import logo from '../images/logo-PandaFood.svg';
import '../styles/login.css';
import { useHistory } from 'react-router-dom';
import { axiosPetition, respuesta } from '../helpers/Axios';
import { useForm } from '../hooks/useForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginPage = () => {

    const [loginCredentials, loginInputChange, resetForm] = useForm({
        cedula: '',
        contraseña: ''
    });

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
    const { cedula, contraseña } = loginCredentials;

    const login = async (e) => {

        e.preventDefault();

        await axiosPetition('login', loginCredentials, 'POST');

        if (respuesta !== undefined) {

            console.log(respuesta);

            if (respuesta.ok) {
                resetForm();
                history.push('/usuarios');

            } else {
                toast.error(respuesta.msg, configMensaje);
                // history.push('/login');
            }
        }
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div id="col-izq" className="min-h-screen pt-12 md:pt-20 pb-6 px-6">
                <div id="conten-izq" className="max-w-md mx-auto mt-12">
                    <h2 className="text-lg text-left max-w-lg text-gray-500">Bienvenido a</h2>
                    <h1 id="titulo-principal" className="text-4xl font-bold mb-12 text-left max-w-lg">Panda Food</h1>
                    <form className="flex flex-col" onSubmit={login}>
                        <label className="text-lg max-w-lg text-left mb-2 text-gray-600" htmlFor="usuario">Usuario:</label>
                        <input name="cedula"
                            className="loginInput"
                            placeholder="Ingresa tu cédula"
                            value={cedula}
                            onChange={loginInputChange}
                            autoComplete="off" />
                        <label className="text-lg max-w-lg text-left mt-8 mb-2 text-gray-600" htmlFor="contraseña">Contraseña:</label>
                        <input type="password" name="contraseña" className="loginInput"
                            value={contraseña}
                            onChange={loginInputChange}
                            placeholder="Ingresa tu contraseña" autoComplete="off" />
                        <div id="ayudas-login" className="flex justify-between mb-12 mt-4">
                            <div>
                                <input type="checkbox" />
                                <label className="ml-1">Recuérdame</label>
                            </div>
                            <a id="recuperar-pass" href="https://www.google.com.co">Olvidé mi contraseña</a>
                        </div>
                        {/* <Link to={redirect} className="text-lg h-14 text-white rounded-lg shadow-2xl"> */}
                        <button type="submit" id="boton-login" className="text-lg h-14 w-full text-white rounded-lg shadow-2xl focus:outline-none">Iniciar Sesión</button>
                        {/* </Link> */}
                    </form>
                </div>
                <ToastContainer theme="dark" />
            </div>
            <div id="col-der" className="flex flex-col justify-center h-screen invisible md:visible">
                <img alt="logo-PandaFood" id="logo" src={logo}></img>
            </div>
        </div>
    )
}
