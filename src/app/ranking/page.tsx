'use client'

import { useEffect, useState } from 'react'

type Usuario = {
  id: number
  name: string
  email: string
}

type RankingDatos = {
  user_id: number
  mejor_tiempo: number
  min_clicks: number
  max_puntos: number
  user: Usuario
}

export default function Ranking() {
  const [ranking, setRanking] = useState<RankingDatos[]>([])
  const [cargando, setcargando] = useState(true)
  const [mensaje, setmensaje] = useState('')
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const guardadoToken = localStorage.getItem('token')
    setToken(guardadoToken)
  }, [])

  useEffect(() => {
    if (!token) return

    fetch('https://m7uf4laravel-production.up.railway.app/api/ranking', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setRanking(data.datos)
        setmensaje('🏆 Ranking cargado correctamente')
      })
      .catch(() => setmensaje('❌ Error al cargar el ranking'))
      .finally(() => setcargando(false))
  }, [token])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Ranking TOP 5</h2>
      {mensaje && <p className="text-center text-sm text-gray-600 mb-4">{mensaje}</p>}
      {cargando ? (
        <p className="text-center">Cargando ranking...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Usuario</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-center">⏱️ Mejor tiempo</th>
              <th className="p-2 text-center">🖱️ Mínimo clics</th>
              <th className="p-2 text-center">🎯 Máximo puntos</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((Datos, index) => (
              <tr key={Datos.user_id} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{Datos.user.name}</td>
                <td className="p-2">{Datos.user.email}</td>
                <td className="p-2 text-center">{Datos.mejor_tiempo} s</td>
                <td className="p-2 text-center">{Datos.min_clicks}</td>
                <td className="p-2 text-center">{Datos.max_puntos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
