import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {useEffect, useState} from "react"
import {Heart} from "lucide-react"
import News from "@/views/home/News.tsx"
import useUserAuth from "@/helpers/userAuth.tsx";

const Home = () => {
    // Valida la el token de la session
    useUserAuth()

    // Estado de likes
    const [likes, setLikes] = useState({})
    const [liked, setLiked] = useState({})

    // Manejar el like
    const handleLike = (id) => {
        setLikes((prev) => ({
            ...prev,
            [id]: liked[id] ? prev[id] - 1 : (prev[id] || 0) + 1,
        }));
        setLiked((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const [datos, setDatos] = useState(null)

    const url = "https://api-legisconnect-production.up.railway.app/proposals/getProposals"

    // Funcion para traer los datos de los propuestas
    const fetchData = async () => {

        try {
            const response = await fetch(url)
            const data = await response.json()

            setDatos(data)
        } catch (error) {
            console.error("Ha ocurrido un error: ", error)
        }
    }

    // Llama la funcion cuando el componente se monta
    useEffect(() => {
        fetchData()
    }, [])

    // Filtrar publicaciones aprobadas
    // @ts-ignore
    const publicadas = datos?.traerPropuestas.filter(p => p.Status === "PUBLICADO")

    console.log(publicadas)

    return(
        <>
            <section className="w-screen h-screen">
                <div className="w-[33rem] h-96">
                    {datos && datos.traerPropuestas ? (
                        publicadas.map((item, index) => (
                            <Card key={index} className="w-full h-full ml-[25rem] mt-10 flex flex-col">
                                <CardHeader>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>Datos</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p>{item.content}</p>
                                </CardContent>
                                <CardFooter>
                                    <Heart
                                        className={`w-6 h-6 ${liked[item.id] ? "text-red-500 fill-red-500" : "text-gray-500"}`}
                                        onClick={() => handleLike(item.id)}
                                    />
                                    <span className="ml-2">{likes[item.id] || 0}</span>
                                </CardFooter>
                            </Card>
                        ))
                    ): "No hay propuestas disponibles"}
                </div>
            </section>
            <section>
                <News/>
            </section>
        </>
    )
}

export default Home