"use client"

import GrupoTargeta from "@/components/misComponentes/GrupoTargeta";
import { ContadorProvider, useContador } from "@/app/context/ContadorContext";
import { PuntuacionProvider } from "../context/PuntuacionContext";
import { TiempoProvider } from "../context/TiempoContext";
import { useTiempo } from "@/app/context/TiempoContext"
import { usePuntuacion } from "@/app/context/PuntuacionContext"


function PanelLateral() {
    const { tiempo } = useTiempo()
    const { puntuacion } = usePuntuacion()
    const { contadorGlobal } = useContador()

    return (
        <aside className="w-[300px] h-screen flex flex-col items-center justify-start p-8 border-r">
            <h1 className="text-4xl font-bold mb-12">MEMORY</h1>

            <div className="space-y-8 w-full">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Tiempo:</h2>
                    <div className="border-2 rounded-xl p-4 text-center text-xl">
                        {tiempo}s
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Puntos:</h2>
                    <div className="border-2 rounded-xl p-4 text-center text-xl">
                        {puntuacion}
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Clicks Totales:</h2>
                    <div className="border-2 rounded-xl p-4 text-center text-xl">
                        {contadorGlobal}
                    </div>
                </div>
            </div>
        </aside>
    )
}

function ContenidoJuego() {
    return (
        <>
            <div className="flex">

                <PanelLateral />
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <GrupoTargeta />
                    </div>
                </main>
            </div>
        </>
    )
}

export default function Juego() {
    return (
        <TiempoProvider>
            <PuntuacionProvider>
                <ContadorProvider>
                    <ContenidoJuego />
                </ContadorProvider>
            </PuntuacionProvider>
        </TiempoProvider>

    )
}