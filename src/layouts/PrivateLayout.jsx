import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuLateral } from '../components/MenuLateral';

export const PrivateLayout = ({ children }) => {

    const history = useHistory();

    useEffect(() => {
        if (window.localStorage.getItem('token') === null) {
            history.push("/login");
        }
    }, []);

    return (
        <div className='flex'>
            <MenuLateral />
            <main className="w-full">
                {children}
            </main>
        </div>
    );
}
