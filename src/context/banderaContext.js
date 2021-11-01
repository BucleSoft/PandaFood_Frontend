import { createContext, useContext } from "react";

export const BanderaContext = createContext(null);

export const useBanderaContext = () => {
    return useContext(BanderaContext);
}