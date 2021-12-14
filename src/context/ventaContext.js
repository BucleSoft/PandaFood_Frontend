import { createContext, useContext } from 'react';

export const VentaContext = createContext(null);

export const useVentaContext = () => {
    return useContext(VentaContext);
}