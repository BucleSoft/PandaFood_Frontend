import React, { useEffect } from 'react';
import "../../styles/perfil.css";
import hamburguesa from "../../images/hamburguesa.png";
import ventas from "../../images/ventas.png";
import calendario from "../../images/calendario.png";
import { LineChart } from './LineChart';
import { axiosPetition } from '../../helpers/Axios';

export const Perfil = () => {

    useEffect(() => {
        const buscar = async () => {
            const ventas = await axiosPetition('productos/vendidoshoy');

            console.log(ventas);
        }
        buscar();
    });

    return <div className="w-full h-screen flex flex-wrap overflow-y-scroll gap-24 justify-center">

        <section className="w-72 h-72 mt-10 rounded-3xl fondoSeccion flex flex-col items-center justify-center shadow-lg cursor-pointer">
            <img src={ventas} className="w-28 drop-shadow-2xl" />
            <h2 className="text-white text-xl font-semibold mt-4">Ventas el día de hoy</h2>
            <h2 className="text-white mt-2 text-5xl font-semibold">15</h2>
        </section>

        <section className="w-72 h-72 mt-10 rounded-3xl fondoSeccion flex flex-col items-center justify-center shadow-lg cursor-pointer">
            <img src={calendario} className="w-28 drop-shadow-2xl" />
            <h2 className="text-white text-xl font-semibold mt-4">Ventas en Febrero</h2>
            <h2 className="text-white mt-2 text-5xl font-semibold">300</h2>
        </section>

        <section className="w-72 h-72 mt-10 rounded-3xl fondoSeccion flex flex-col items-center justify-center shadow-lg cursor-pointer">
            <img src={hamburguesa} className="w-28 drop-shadow-2xl" />
            <h2 className="text-white text-xl font-semibold mt-4">Producto más vendido</h2>
            <h2 className="text-white mt-2 text-xl">Salchipapa especial</h2>
        </section>

        <LineChart />

    </div>;
};
