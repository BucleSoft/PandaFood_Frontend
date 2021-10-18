import React from 'react';
import { MenuLateral } from '../components/MenuLateral';
import { OpcionesPerfil } from '../components/OpcionesPerfil';

export const PerfilPage = () => {
    return (
        <div className="grid grid-cols-7">
            <MenuLateral />
            <OpcionesPerfil />
        </div>
    );
}
