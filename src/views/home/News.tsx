import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Key, ReactElement, ReactNode, ReactPortal, useEffect, useState} from "react";

const News = () => {

    const [data, setData] = useState(null)

    // Funcion para pedir los datos
    const fetchData = async () => {

        const url = "https://api.spacexdata.com/v3/launches?limit=20"

        try {
            const response = await fetch(url)
            const data = await response.json()

            setData(data)
        } catch (error) {
            console.log("Ha ocurrido un error ", error)
        }
    }

    // Llama la funcion cuando se monta el componente
    useEffect(() => {
        fetchData()
    }, [])

    console.log(data)

    return (
        <>
            <section className="mt-10 mr-12 overflow-y-auto overflow-x-hidden h-4/5 fixed right-0 top-0 font-mono">
                <label className="flex justify-center mb-6 border rounded-full">Ultimas
                    Noticias</label>
                <div className="h-60 w-64">
                    {data ? (
                        // @ts-ignore
                        data.map((item: {
                            mission_name: string | number | boolean | ReactElement | Iterable<ReactNode> | ReactPortal | null | undefined;
                            launch_date_local: string | number | Date;
                            details: string;
                        }, index: Key | null | undefined) => (
                            <Card className="w-full h-full mb-8" key={index}>
                                <CardHeader>
                                    <CardTitle>{item.mission_name}</CardTitle>
                                    <CardDescription>Fecha de lanzamiento: {new Date(item.launch_date_local).toLocaleDateString("en-ES", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit"
                                    })}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{item.details?.length > 100
                                        ? item.details.substring(0,100) + "..." : "No hay datos disponibles"}</p>
                                </CardContent>
                            </Card>
                        ))
                    ) : "No hay noticias disponibles"}
                </div>
            </section>
        </>
    )
}

export default News