"use client"

import { createContext, useContext, useState, useEffect } from 'react';

export interface TiempoContextType {
    tiempo: number
    juegoTerminado: boolean
    reiniciarTiempo: () => void
}

const TiempoContext = createContext<TiempoContextType | undefined>(undefined)

export function TiempoProvider({ children } : {children: React.ReactNode}){
    const [tiempo, setTiempo] = useState(20)
    const [juegoTerminado, setJuegoTerminado] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setTiempo(prevTiempo => {
                if(prevTiempo <= 0) {
                    clearInterval(timer)
                    setJuegoTerminado(true)
                    return 0
                }
                return prevTiempo - 1
            })
        }, 1000)

        return () => clearInterval(timer)

    }, [])

    const reiniciarTiempo = () => {
        setTiempo(20)
        setJuegoTerminado(false)
    }

    return (
        <TiempoContext.Provider value={{ tiempo, juegoTerminado, reiniciarTiempo}}>
            {children}
        </TiempoContext.Provider>
    )

}

export const useTiempo = () => {
    const context = useContext(TiempoContext)
    if(!context) throw new Error('useTiempo debe usarse dentro de TiempoProvider')
    return context
}