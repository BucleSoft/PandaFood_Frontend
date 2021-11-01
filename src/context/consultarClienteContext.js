import { createContext, useContext } from "react";

export const ConsultarClienteContext = createContext(null);

export const useConsultarClienteContext = () => {
    return useContext(ConsultarClienteContext);
}