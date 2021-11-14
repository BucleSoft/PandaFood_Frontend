import { createContext, useContext } from "react";

export const ConsultarInsumoContext = createContext(null);

export const useConsultarInsumoContext = () => {
    return useContext(ConsultarInsumoContext);
}