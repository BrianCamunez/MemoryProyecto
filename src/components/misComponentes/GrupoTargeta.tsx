"use client"

import { useState, useEffect } from "react"
import Targeta from "./Targeta"
import { useTiempo } from "@/app/context/TiempoContext"
import { usePuntuacion } from "@/app/context/PuntuacionContext"

const GrupoTargeta = () => {

    interface Targeta {
        id: number;
        nombre: string;
        url: string;
    }

    const [targetas, setTargetas] = useState<Targeta[]>([])
    const [cartasGiradas, setCartasGiradas] = useState<number[]>([])
    const [cartasEmparejadas, setCartasEmparejadas] = useState<number[]>([])

    const { juegoTerminado } = useTiempo();
    const { puntuacion, aumentarPuntuacion } = usePuntuacion();


    const targetasArray = [
        {
            id: 1,
            nombre: "Saber (Artoria Pendragon)",
            url: "https://ucarecdn.com/aa65204a-a548-488e-9bac-38faa1bc9f16/-/preview/525x1000/"
        },
        {
            id: 2,
            nombre: "Archer (EMIYA)",
            url: "https://ucarecdn.com/79166a35-0ffa-46b9-a7dc-70c3925eedca/-/preview/406x1000/"
        },
        {
            id: 3,
            nombre: "Saber Alter",
            url: "https://ucarecdn.com/bf1ddc54-f4cc-4456-9059-3dee690d46c4/-/preview/525x1000/"
        },
        {
            id: 4,
            nombre: "Rider (Medusa)",
            url: "https://ucarecdn.com/4c358ea9-bff2-4a47-8621-f791351bfcd2/-/preview/585x1000/"
        },
        {
            id: 5,
            nombre: "Kiritsugu Emiya",
            url: "https://ucarecdn.com/97b2664c-88d2-4542-b895-a058f65a08c4/-/preview/362x619/"
        },
        {
            id: 6,
            nombre: "Saber (Lily)",
            url: "https://ucarecdn.com/f9715fa0-af24-47ac-a2bb-94cd6a2e15e4/-/preview/250x300/"
        },
        {
            id: 7,
            nombre: "Gilles de Rais",
            url: "https://ucarecdn.com/3abb8d37-c699-40f4-9bef-564c3a1f1cca/-/preview/504x1000/"
        },
        {
            id: 8,
            nombre: "Hassan of the Cursed Arm",
            url: "https://ucarecdn.com/ff847a5c-abcc-4cbe-8abf-043e41650572/-/preview/779x1000/"
        },
        {
            id: 9,
            nombre: "Sir Lancelot",
            url: "https://ucarecdn.com/681e6308-68a8-4b41-88a3-eccec012b155/-/preview/250x349/"
        }
    ]

    useEffect(() => {
        // Duplicamos las cards y las mezclamos
        const duplicatedCards = [...targetasArray, ...targetasArray]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: index }))

        setTargetas(duplicatedCards)
    }, [])

    const girarCarta = (id: number) => {

        if (cartasGiradas.length >= 2 || cartasGiradas.includes(id) || cartasEmparejadas.includes(id)) {
            return
        }

        setCartasGiradas(prev => [...prev, id])

    }

    useEffect(() => {

        if (cartasGiradas.length === 2) {
            const [primera, segunda] = cartasGiradas

            const carta1 = targetas.find(carta => carta.id === primera)
            const carta2 = targetas.find(carta => carta.id === segunda)

            if (carta1?.nombre === carta2?.nombre) {
                setCartasEmparejadas(prev => [...prev, primera, segunda])
                aumentarPuntuacion()
            }

            setTimeout(() => {
                setCartasGiradas([])
            }, 1000)

        }

    }, [cartasGiradas, targetas])

    return (
        <div className="flex flex-col items-center">

            {juegoTerminado ? (
                <div className="text-2xl font-bold text-red-500">
                    ¡Tiempo agotado! Puntuación final: {puntuacion}
                </div>
            ) : (
                <div className="grid grid-cols-6 gap-4 p-4">
                    {targetas.map((targeta) => (
                        <Targeta
                            key={targeta.id}
                            nombre={targeta.nombre}
                            url={targeta.url}
                            girada={cartasGiradas.includes(targeta.id) || cartasEmparejadas.includes(targeta.id)}
                            emparejada={cartasEmparejadas.includes(targeta.id)}
                            onClick={() => girarCarta(targeta.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default GrupoTargeta;