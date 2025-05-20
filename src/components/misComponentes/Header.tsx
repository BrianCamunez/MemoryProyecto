import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  return (
    <header className="w-full border-b bg-white">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
          MemoryProyect
        </Link>
        {/* Menú para pantallas medianas y grandes */}
        <div className="hidden md:flex gap-2">
          <Button variant="link" asChild>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/registro">Registro</Link>
          </Button>
        </div>
        {/* Dropdown para móviles */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Abrir menú">
                {/* Icono SVG de menú */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/registro">Registro</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}

export default Header