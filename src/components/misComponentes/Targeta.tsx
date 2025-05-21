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
        <div className="relative w-[150px] h-[150px]">
            <div className="absolute -top-2 -right-2 z-10 bg-black/80 text-white w-8 h-8 
                          rounded-full flex items-center justify-center text-s font-bold">
                {clicks}
            </div>
            <Card 
                onClick={mirarClicks}
                className={`
                    relative w-full h-full 
                    transition-transform duration-500 ease-in-out
                    shadow hover:shadow-lg cursor-pointer
                    [transform-style:preserve-3d]
                    ${girada ? '[transform:rotateY(180deg)]' : ''}
                `}
            >
                {/* Cara frontal */}
                <CardContent className={`
                    absolute inset-0 p-0
                    [backface-visibility:hidden]
                    rounded-xl overflow-hidden
                    bg-card
                    ${emparejada ? 'border-2 border-green-500' : 'border-2 border-black'}
                    [transform:rotateY(180deg)]
                `}>
                    <img 
                        src={url} 
                        alt={`Carta de memoria`}
                        className="w-full h-full object-contain" 
                    />
                </CardContent>

                {/* Cara trasera */}
                <CardContent className={`
                    absolute inset-0 p-0
                    [backface-visibility:hidden]
                    rounded-xl overflow-hidden
                    bg-muted border
                    flex items-center justify-center
                `}>
                    <img 
                        src="https://ucarecdn.com/5cf6ac7c-31a3-461e-8011-2e05eea0420e/-/preview/360x640/" 
                        alt="Reverso de carta"
                        className="w-100 h-100 object-contain" 
                    />
                </CardContent>
            </Card>
        </div>
    )

}

export default Targeta;