"use client"

import { useState, useEffect } from "react"
import Targeta from "./Targeta"
import { useTiempo } from "@/app/context/TiempoContext"
import { usePuntuacion } from "@/app/context/PuntuacionContext"
import { useContador } from "@/app/context/ContadorContext"

const GrupoTargeta = () => {

    interface Targeta {
        id: number;
        nombre: string;
        url: string;
    }

    const [targetas, setTargetas] = useState<Targeta[]>([])
    const [cartasGiradas, setCartasGiradas] = useState<number[]>([])
    const [cartasEmparejadas, setCartasEmparejadas] = useState<number[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { juegoTerminado } = useTiempo();
    const { puntuacion, aumentarPuntuacion } = usePuntuacion();
    const { contadorGlobal } = useContador();


    useEffect(() => {
        const fetchTargetas = async () => {
            try {
                const response = await fetch('https://m7uf4laravel-production.up.railway.app/api/targeta')
                if (!response.ok) {
                    throw new Error('Error al cargar las tarjetas')
                }
                const data = await response.json()

                const randomCards = data
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 9);

                const duplicatedCards = [...randomCards, ...randomCards]
                    .sort(() => Math.random() - 0.5)
                    .map((card: Targeta, index: number) => ({ ...card, id: index }));

                setTargetas(duplicatedCards)
                setLoading(false)
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Error desconocido')
                setLoading(false)
            }
        }

        fetchTargetas()
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

    const datosPartida = {
        clicks: contadorGlobal,
        puntos: puntuacion,
    };

    console.log('Datos a enviar:', datosPartida) 


    const [mensaje, setMensaje] = useState("")

    useEffect(() => {
        const enviarDatos = async () => {
            if (juegoTerminado) {

                const token = localStorage.getItem('token')

                if (!token) {
                    setMensaje('Necesitas iniciar sesión para guardar la partida')
                    return
                }

                console.log(datosPartida)

                try {
                    const response = await fetch('https://m7uf4laravel-production.up.railway.app/api/partidas', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify(datosPartida)
                    })

                    const data = await response.json()

                    console.log(data)

                    if (response.ok) {
                        setMensaje('Partida registrada exitosamente!')
                    } else {
                        setMensaje(data.message || 'Error en el registro')
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        setMensaje(`Error al conectar con el servidor: ${error.message}`)
                    } else {
                        setMensaje('Error al conectar con el servidor')
                    }
                }
            }
        }

        enviarDatos()
    }, [juegoTerminado])

    if (loading) {
        return <div className="text-center">Cargando tarjetas...</div>
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>
    }




    return (
        <div className="flex flex-col items-center">

            {juegoTerminado ? (
                <>
                    <div className="text-2xl font-bold text-red-500">
                        ¡Tiempo agotado! Puntuación final: {puntuacion}
                    </div>
                    <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">
                        {mensaje}
                    </div>
                </>
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