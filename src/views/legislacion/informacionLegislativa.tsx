import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";

const informacionLegislativa = () => {
    const [data, setData] = useState(null)

    // Funcion para pedir los datos
    const fetchData = async () => {

        const url = `https://api-legisconnect-production.up.railway.app/legislacion/proyecto`;

        try {
            const response = await fetch(url)
            const data = await response.json()

            setData(data)
        } catch (error) {
            console.log("Ha ocurrido un error: ", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    console.log(data)


    return (
        <section className="w-screen h-screen font-mono">
            <div className="flex justify-center items-center mt-10">Legislacion</div>
            {/*// @ts-ignore*/}
            {data && data.length > 0 ? (
                // @ts-ignore
                data.map((item, index) => (
                    <a href={item.appURL} target="_blank" key={index}>
                        <Card key={index} className="mt-6 mr-6">
                            <CardHeader>
                                <CardTitle>{item.tipoProyecto}</CardTitle>
                                <CardDescription>{item.fechaIngresoExpediente}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{item.acapite.substring(0,100) + "..."}</p>
                            </CardContent>
                            <CardFooter>
                                <p>Estado: {item.descripcionEtapa}</p>
                            </CardFooter>
                        </Card>
                    </a>
                ))
            ): "No hay contenido disponible"}
        </section>
    )
}

export default informacionLegislativa