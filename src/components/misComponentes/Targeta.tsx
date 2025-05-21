"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useContador } from "@/app/context/ContadorContext"

interface TargetaProps {
    nombre: string
    url: string
    girada: boolean
    emparejada: boolean
    onClick: () => void
}

const Targeta = ({ nombre, url, emparejada = false, girada, onClick }: TargetaProps) => {

    const [clicks, setClicks] = useState(0)
    const { incrementarContador } = useContador()

    const mirarClicks = () => {

        if(emparejada){
            return
        }

        setClicks(prev => prev + 1)
        incrementarContador()
        onClick()
    }

    return (
        <>
            <Card onClick={mirarClicks} className={`cursor-pointer transition-all duration-300 ${girada ? 'bg-white' : 'bg-blue-500'}`}>
                <CardTitle>{nombre}</CardTitle>
                <CardContent>
                    {
                        girada ? (
                            <div>
                                <img src={url} alt={`Imagen de ${nombre}`} />
                                <p>Clicks: {clicks}</p>
                            </div>
                        ) : (
                            <div>
                                <img src="https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg" alt={`Imagen de ${nombre}`} />
                                <p>Clicks: {clicks}</p>
                            </div>
                        )
                    }
                </CardContent>
            </Card>
        </>
    )

}

export default Targeta;