'use client'

import { useEffect, useState } from 'react'

type Targeta = {
    id: number
    nombre: string
    url: string
}

export default function TargetasCrud() {
    const [targetas, setTargetas] = useState<Targeta[]>([])
    const [nombre, setNombre] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        setToken(storedToken)
    }, [])


    useEffect(() => {
        if (!token) return
        fetch('https://m7uf4laravel-production.up.railway.app/api/targeta', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setTargetas(data))
            .catch(() => setMessage('❌ Error al cargar las targetas'))
            .finally(() => setLoading(false))
    }, [token])

    const handleDelete = async (id: number) => {
        const res = await fetch(`https://m7uf4laravel-production.up.railway.app/api/targeta/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (res.ok) {
            setTargetas(prev => prev.filter(t => t.id !== id))
            setMessage('🗑️ Targeta eliminada correctamente')
        }
    }

    const handleUpdate = async (id: number, nombre: string, url: string) => {
        const res = await fetch(`https://m7uf4laravel-production.up.railway.app/api/targeta/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ nombre, url }),
        })

        if (res.ok) {
            setMessage('✅ Targeta actualizada')
        } else {
            setMessage('❌ Error al actualizar la targeta')
        }
    }

    const handleCreate = async () => {
        const res = await fetch(`https://m7uf4laravel-production.up.railway.app/api/targeta`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ nombre, url }),
        })

        const data = await res.json()

        if (res.ok) {
            setTargetas(prev => [...prev, data])
            setNombre('')
            setUrl('')
            setMessage('✅ Targeta creada')
        } else {
            setMessage(data.message || '❌ Error al crear la targeta')
        }
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Panel Admin - CRUD Targetas</h1>

            {message && <p className="mb-4 text-center text-sm text-gray-600">{message}</p>}

            {/* Crear nueva targeta */}
            <div className="mb-6 flex flex-col md:flex-row gap-2 items-start md:items-end">
                <input
                    type="text"
                    placeholder="Nombre de la targeta"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    className="border px-3 py-2 rounded w-full md:w-1/3"
                />
                <input
                    type="text"
                    placeholder="URL de la targeta"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    className="border px-3 py-2 rounded w-full md:w-1/2"
                />
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Crear
                </button>
            </div>

            {/* Tabla de targetas */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">ID</th>
                            <th className="p-2 text-left">Nombre</th>
                            <th className="p-2 text-left">URL</th>
                            <th className="p-2 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {targetas.map((t) => (
                            <tr key={t.id} className="border-b">
                                <td className="p-2">{t.id}</td>
                                <td className="p-2">
                                    <input
                                        defaultValue={t.nombre}
                                        className="border px-2 py-1 w-full"
                                        onBlur={(e) =>
                                            handleUpdate(t.id, e.target.value, t.url)
                                        }
                                    />
                                </td>
                                <td className="p-2">
                                    <input
                                        defaultValue={t.url}
                                        className="border px-2 py-1 w-full"
                                        onBlur={(e) =>
                                            handleUpdate(t.id, t.nombre, e.target.value)
                                        }
                                    />
                                </td>
                                <td className="p-2 text-right">
                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        className="text-red-600 hover:text-red-800 font-semibold"
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
