"use client"

import { createContext, useContext, useState } from "react";

interface ContadorContextType {
  contadorGlobal: number;
  incrementarContador: () => void;
}

const ContadorContext = createContext<ContadorContextType | undefined>(undefined);

export function  ContadorProvider({ children }: { children: React.ReactNode }) {

    const [contadorGlobal, setContadorGlobal] = useState(0);

    const incrementarContador = () => {
        setContadorGlobal(prev => prev + 1);
    };

    return (
        <ContadorContext.Provider value={{ contadorGlobal, incrementarContador }}>
            {children}
        </ContadorContext.Provider>
    )
}

export function useContador() {
    const context = useContext(ContadorContext)
    if (!context) {
        throw new Error("useContador debe ser usado dentro de un ContadorProvider");
    }
    return context
}