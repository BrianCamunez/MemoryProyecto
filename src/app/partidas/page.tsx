"use client"

import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type Partida = {
    id: number
    duracion: string | null
    puntos: number
    clicks: number
}

const Partidas = () => {
    const [partidas, setPartidas] = useState<Partida[]>([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')

    useEffect(() => {

        const token = localStorage.getItem('token')

        const fetchPartidas = async () => {
            try {
                const response = await fetch('https://m7uf4laravel-production.up.railway.app/api/partidas', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })

                const data = await response.json()

                if (response.ok) {
                    setPartidas(data.datos || [])
                    setMessage('✅ Partidas cargadas correctamente')
                } else {
                    setMessage(data.message || '⚠️ Error al obtener las partidas')
                }
            } catch (error) {
                if (error instanceof Error) {
                    setMessage(`❌ Error al conectar con el servidor: ${error.message}`)
                } else {
                    setMessage('❌ Error inesperado al conectar con el servidor')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchPartidas()
    }, [])

    const handleDelete = async (id: number) => {
        const token = localStorage.getItem('token')

        try {
            const res = await fetch(`https://m7uf4laravel-production.up.railway.app/api/partidas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            const data = await res.json()

            if (res.ok) {
                setPartidas(prev => prev.filter(p => p.id !== id))
                setMessage("🗑️ Partida eliminada correctament")
            } else {
                setMessage(data.message || "❌ Error al eliminar la partida")
            }
        } catch (error) {
            if (error instanceof Error) {
                setMessage(`❌ Error al conectar con el servidor: ${error.message}`)
            } else {
                setMessage("❌ Error inesperado")
            }
        }
    }


    const totalPuntos = partidas.reduce((acc, p) => acc + p.puntos, 0)
    const totalClicks = partidas.reduce((acc, p) => acc + p.clicks, 0)

    return (
        <>
            <div className="flex justify-center px-4 py-10">
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
                    {message && (
                        <div className="text-center text-sm text-gray-600 mb-4">{message}</div>
                    )}

                    {loading ? (
                        <p className="text-center text-gray-600">🔄 Carregant partides...</p>
                    ) : (
                        <Table>
                            <TableCaption className="text-lg font-medium text-gray-600 mb-4">
                                📊 Estadístiques recents de les meves partides
                            </TableCaption>

                            <TableHeader>
                                <TableRow className="bg-blue-50">
                                    <TableHead className="text-blue-800 font-semibold text-left">🎯 Punts</TableHead>
                                    <TableHead className="text-blue-800 font-semibold text-left">🖱️ Clics</TableHead>
                                    <TableHead className="text-blue-800 font-semibold text-right">🗑️ Accions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {partidas.map((p, idx) => (
                                    <TableRow key={p.id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                                        <TableCell className={p.puntos >= 1600 ? "text-green-600 font-semibold" : ""}>
                                            {p.puntos}
                                        </TableCell>
                                        <TableCell className={p.clicks > 100 ? "text-red-500" : ""}>
                                            {p.clicks}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="text-red-600 hover:text-red-800 transition-colors font-semibold"
                                            >
                                                Borrar
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                            <TableFooter>
                                <TableRow className="bg-gray-100">
                                    <TableCell className="font-semibold text-green-700">Total: {totalPuntos}</TableCell>
                                    <TableCell className="font-semibold text-red-700">Total: {totalClicks}</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableFooter>
                        </Table>

                    )}
                </div>
            </div>
        </>
    )
}

export default Partidas
