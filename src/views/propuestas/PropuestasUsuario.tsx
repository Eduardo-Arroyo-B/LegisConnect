import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {useEffect, useState} from "react";


const PropuestasUsuario = () => {
    const [data, setData] = useState(null)

    // Extraer Id usuario
    const userId = localStorage.getItem("userId")

    // Buscar las propuestas de un unico usuario
    const findProposalsUser = async () => {
        const url = `https://api-legisconnect-production.up.railway.app/proposals/getProposalsUser/${userId}`

        const response = await fetch(url)
        const data = await response.json()

        console.log(data)
        setData(data)
    }

    useEffect(() => {
        findProposalsUser()
        // aqui se hace la peticion al backend
    }, [])

    return (
        <section className="w-screen h-screen">
            <div className="flex justify-center items-center mt-10">Mis propuestas</div>
            {/*// @ts-ignore*/}
            {data && data.length > 0 ? (
                // @ts-ignore
                data.map((item, index) => (
                    <Card key={index} className="mt-6 mr-6">
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{new Date(item.createdAt).toLocaleDateString("es-ES", {
                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                            })}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Contenido: {item.content}</p>
                        </CardContent>
                        <CardFooter>
                            <p>Estado: {item.Status}</p>
                        </CardFooter>
                    </Card>
                ))
            ): "No hay propuestas creadas"}
        </section>
    )
}

export default PropuestasUsuario