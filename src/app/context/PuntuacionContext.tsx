"use client"

import { createContext, useContext, useState } from 'react'

interface PuntuacionContextType{
    puntuacion: number
    aumentarPuntuacion: () => void
    reiniciarPuntuacion: () => void
}

const PuntuacionContext = createContext<PuntuacionContextType | undefined>(undefined);

export function PuntuacionProvider({ children } : { children: React.ReactNode }) {
    const [puntuacion, setPuntuacion] = useState(0)
    
    const aumentarPuntuacion = () => setPuntuacion(prev => prev + 10)
    const reiniciarPuntuacion = () => setPuntuacion(0)

    return (
        <PuntuacionContext.Provider value={{ puntuacion, aumentarPuntuacion, reiniciarPuntuacion }}>
            {children}
        </PuntuacionContext.Provider>
    )

}

export const usePuntuacion = () => {
    const context = useContext(PuntuacionContext)

    if(!context) throw new Error('usePuntuacion debe usarse dentro de PuntuacionProvider')
    return context

}