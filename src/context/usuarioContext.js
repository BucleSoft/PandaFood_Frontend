import { createContext, useContext } from "react";

export const UsuarioContext = createContext(null);

export const useUsuarioContext = () => {
    return useContext(UsuarioContext);
}