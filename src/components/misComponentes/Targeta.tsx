"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useContador } from "@/app/context/ContadorContext"

interface TargetaProps {
    nombre: string;
    url: string;
}

const Targeta = ({ nombre, url }: TargetaProps) =>{

    const [clicks, setClicks] = useState(0)
    const { incrementarContador } = useContador()

    const mirarClicks = () => {
        setClicks(prev => prev + 1)
        incrementarContador()
    }

    return(
        <>
            <Card onClick={mirarClicks}>
                <CardTitle>{nombre}</CardTitle>
                <CardContent>
                    <img src={url} alt={`Imagen de ${nombre}`} />
                    <p>Clicks: {clicks}</p>
                </CardContent>
            </Card>
        </>
    )

}

export default Targeta;