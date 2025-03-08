import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {useEffect, useState} from "react";

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
    },[])

    console.log(data)

    return (
        <>
            <section className="mt-10 mr-12">
                <label className="flex justify-center mb-6 border rounded-full border-[#996ea1] bg-[#d0a2d8]">Ultimas Noticias</label>
                <div className="h-60 w-64">
                    {data ? (
                        data.map((item, index) => (
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
                                    <p>Contenido noticia</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Footer contenido</p>
                                </CardFooter>
                            </Card>
                        ))
                    ) : "No hay noticias disponibles"}
                </div>
            </section>
        </>
    )
}

export default News