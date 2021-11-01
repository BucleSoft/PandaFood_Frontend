import React from 'react'
import { MenuLateral } from '../components/MenuLateral';

export const PrivateLayout = ({ children }) => {
    return (
        <div className='flex'>
            <MenuLateral />
            <main className="w-full">
                {children}
            </main>
        </div>
    );
}
