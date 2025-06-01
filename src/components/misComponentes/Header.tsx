"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const [estaLogeado, setestaLogeado] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setestaLogeado(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setestaLogeado(false)
    window.location.href = "/"
  }

  return (
    <header className="w-full border-b bg-white">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
          MemoryProyect
        </Link>

        <div className="hidden md:flex gap-2">
          {estaLogeado ? (
            <>
              <Button variant="link" asChild>
                <Link href="/partidas">Mis Partidas</Link>
              </Button>
              <Button variant="link" asChild>
                <Link href="/juego">Jugar</Link>
              </Button>
               <Button variant="link" asChild>
                <Link href="/crud">CRUD</Link>
              </Button>
              <Button variant="link" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button variant="link" asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button variant="link" asChild>
                <Link href="/registro">Registro</Link>
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Abrir menú">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {estaLogeado ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/partidas">Mis Partidas</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/juego">Jugar</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Cerrar Sesión
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Iniciar Sesión</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/registro">Registro</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}

export default Header
