'use client'

import { useEffect, useState } from 'react'

type Usuario = {
  id: number
  name: string
  email: string
  role: string
}

export default function UsuariosCrud() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
  }, [])

  useEffect(() => {
    if (!token) return

    fetch('https://m7uf4laravel-production.up.railway.app/api/usuarios', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUsuarios(data.datos)) // ✅ Corregido: usar data.datos
      .catch(() => setMessage('❌ Error al cargar usuarios'))
      .finally(() => setLoading(false))
  }, [token])

  const handleDelete = async (id: number) => {
    const res = await fetch(`https://m7uf4laravel-production.up.railway.app/api/usuarios/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.ok) {
      setUsuarios(prev => prev.filter(u => u.id !== id))
      setMessage('🗑️ Usuario eliminado correctamente')
    } else {
      setMessage('❌ Error al eliminar usuario')
    }
  }

  const handleEdit = async (id: number, field: keyof Usuario, value: string) => {
    const res = await fetch(`https://m7uf4laravel-production.up.railway.app/api/usuarios/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ [field]: value }),
    })

    if (res.ok) {
      setUsuarios(prev =>
        prev.map(u =>
          u.id === id ? { ...u, [field]: value } : u
        )
      )
      setMessage('✅ Usuario actualizado')
    } else {
      setMessage('❌ Error al actualizar usuario')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>
      {message && <p className="mb-4 text-center text-sm text-gray-600">{message}</p>}
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Rol</th>
              <th className="p-2 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.id}</td>
                <td className="p-2">
                  <input
                    defaultValue={user.name}
                    onBlur={e => handleEdit(user.id, 'name', e.target.value)}
                    className="border px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    defaultValue={user.email}
                    onBlur={e => handleEdit(user.id, 'email', e.target.value)}
                    className="border px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <select
                    defaultValue={user.role}
                    onChange={e => handleEdit(user.id, 'role', e.target.value)}
                    className="border px-2 py-1"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="p-2 text-right">
                  <button
                    onClick={() => handleDelete(user.id)}
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
