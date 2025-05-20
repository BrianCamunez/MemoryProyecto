import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface TargetaProps {
    nombre: string;
    url: string;
}

const Targeta = ({ nombre, url }: TargetaProps) =>{

    return(
        <>
            <Card>
                <CardTitle>{nombre}</CardTitle>
                <CardContent>
                    <img src={url} alt={`Imagen de ${nombre}`} />
                </CardContent>
            </Card>
        </>
    )

}

export default Targeta;