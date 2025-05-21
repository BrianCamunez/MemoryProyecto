"use client"

import Header from "@/components/misComponentes/Header";
import GrupoTargeta from "@/components/misComponentes/GrupoTargeta";
import { ContadorProvider, useContador } from "@/app/context/ContadorContext";
import { PuntuacionProvider } from "../context/PuntuacionContext";
import { TiempoProvider } from "../context/TiempoContext";

function ContadorTotal() {
    const { contadorGlobal } = useContador()
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Contador Total: {contadorGlobal}</h2>
        </div>
    )
}

function ContenidoJuego() {
    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center justify-between p-4">
                <h1 className="text-2xl font-bold mb-4">Bienvenido a MemoryProyect</h1>
                <p className="mb-4">¡Desafía tu memoria con nuestras tarjetas!</p>
                <ContadorTotal />
                <GrupoTargeta />
            </main>
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