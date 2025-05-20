"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/misComponentes/Header"

const Registro = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    })
    const [message, setMessage] = useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('https://m7uf4laravel-production.up.railway.app/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                setMessage('¡Registro exitoso!')
                setFormData({ name: "", email: "", password: "", role: "user" })
            } else {
                setMessage(data.message || 'Error en el registro')
            }
        } catch (error) {
            if (error instanceof Error) {
                setMessage(`Error al conectar con el servidor: ${error.message}`)
            } else {
                setMessage('Error al conectar con el servidor')
            }
        }
    }

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Registro</CardTitle>
                        <CardDescription>Crea una nueva cuenta</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {message && (
                            <div className={`mb-4 p-3 rounded ${message.includes('exitoso')
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                                }`}>
                                {message}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="tu@email.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="********"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Registrar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Registro