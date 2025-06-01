'use client'

import { useState } from 'react'
import TargetasCrud from "../../components/misComponentes/TargetasCrud"
import UsuariosCrud from '../../components/misComponentes/UsuariosCrud'
import PartidasCrud from "../../components/misComponentes/PartidasCrud"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'targetas' | 'usuarios' | 'partidas'>('targetas')

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>

        {/* Botones de tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('targetas')}
            className={`px-4 py-2 rounded ${activeTab === 'targetas' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            📇 Targetas
          </button>
          <button
            onClick={() => setActiveTab('usuarios')}
            className={`px-4 py-2 rounded ${activeTab === 'usuarios' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            👤 Usuarios
          </button>
          <button
            onClick={() => setActiveTab('partidas')}
            className={`px-4 py-2 rounded ${activeTab === 'partidas' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            🎯 Partidas
          </button>
        </div>

        {/* Contenido dinámico */}
        {activeTab === 'targetas' && <TargetasCrud />}
        {activeTab === 'usuarios' && <UsuariosCrud />}
        {activeTab === 'partidas' && <PartidasCrud />}
      </div>
    </>
  )
}
