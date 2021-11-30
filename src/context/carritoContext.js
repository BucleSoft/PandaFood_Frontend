import { createContext, useContext } from "react";

export const CarritoContext = createContext(null);

export const useCarritoContext = () => {
    return useContext(CarritoContext);
}