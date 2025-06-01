'use client'

import { useEffect, useState } from 'react'

type Partida = {
  id: number
  puntos: number
  clicks: number
  user: {
    name: string
    email: string
  }
}

export default function PartidasCrud() {
  const [partidas, setPartidas] = useState<Partida[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
  }, [])

  useEffect(() => {
    if (!token) return

    fetch('https://m7uf4laravel-production.up.railway.app/api/partidasAdmin', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("📦 RESPUESTA API:", data)
        setPartidas(data.datos)
      })
      .catch(() => setMessage('❌ Error al cargar las partidas'))
      .finally(() => setLoading(false))
  }, [token])

  const handleDelete = async (id: number) => {
    const res = await fetch(`https://m7uf4laravel-production.up.railway.app/api/partidas/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.ok) {
      setPartidas(prev => prev.filter(p => p.id !== id))
      setMessage('🗑️ Partida eliminada correctamente')
    } else {
      setMessage('❌ No se pudo eliminar la partida')
    }
  }

  const handleEdit = async (id: number, puntos?: number, clicks?: number) => {
    const body: Partial<{ puntos: number; clicks: number }> = {}
    if (puntos !== undefined) body.puntos = puntos
    if (clicks !== undefined) body.clicks = clicks

    const res = await fetch(`https://m7uf4laravel-production.up.railway.app/api/partidas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      setMessage('✅ Partida actualizada correctamente')
    } else {
      setMessage('❌ Error al actualizar la partida')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">CRUD de Partidas (Admin)</h2>
      {message && <p className="text-center text-sm text-gray-600 mb-4">{message}</p>}

      {loading ? (
        <p>Cargando partidas...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Puntos</th>
              <th className="p-2 text-left">Clicks</th>
              <th className="p-2 text-left">Usuario</th>
              <th className="p-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {partidas.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.id}</td>
                <td className="p-2">
                  <input
                    type="number"
                    defaultValue={p.puntos}
                    className="border px-2 py-1 w-20"
                    onBlur={(e) => handleEdit(p.id, parseInt(e.target.value), undefined)}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    defaultValue={p.clicks}
                    className="border px-2 py-1 w-20"
                    onBlur={(e) => handleEdit(p.id, undefined, parseInt(e.target.value))}
                  />
                </td>
                <td className="p-2">{p.user.name} ({p.user.email})</td>
                <td className="p-2 text-right">
                  <button
                    onClick={() => handleDelete(p.id)}
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
