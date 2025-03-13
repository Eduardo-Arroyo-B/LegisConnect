import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Legislacion from "../../assets/Legislacion.png"
import {useEffect, useState} from "react"
import {Heart} from "lucide-react"
import News from "@/views/home/News.tsx"
import useUserAuth from "@/helpers/userAuth.tsx"

const Home = () => {
    // Valida la el token de la session
    useUserAuth()

    // Estado de likes
    const [likes, setLikes] = useState({})
    const [liked, setLiked] = useState({})

    // Manejar el like
    const handleLike = (id: string | number) => {
        setLikes((prev) => ({
            ...prev,
            // @ts-ignore
            [id]: liked[id] ? prev[id] - 1 : (prev[id] || 0) + 1,
        }));
        setLiked((prev) => ({
            ...prev,
            // @ts-ignore
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

    // Llama la funcion cuando el componente se Monta
    useEffect(() => {
        fetchData()
    }, [])

    // Filtrar publicaciones aprobadas
    // @ts-ignore
    const publicadas = datos?.traerPropuestas.filter(p => p.Status === "PUBLICADO")


    return(
        <>
            <section className="w-screen h-screen">
                <div className="w-[33rem] h-[30rem]">
                    {/*// @ts-ignore*/}
                    {datos && datos.traerPropuestas ? (
                        // @ts-ignore
                        publicadas.map((item, index) => (
                            <Card key={index} className="w-full h-full ml-[25rem] mt-10 flex flex-col border-[#996ea1]">
                                <CardHeader>
                                    <CardTitle>{item.title}</CardTitle>
                                </CardHeader>
                                <CardDescription className="ml-6">{new Date(item.createdAt).toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                })}</CardDescription>
                                <CardContent className="flex-grow">
                                    <p>{item.content.substring(0,100) + "..."}</p>
                                    <img src={Legislacion} alt="Imagen de legislacion" className="mt-6"/>
                                </CardContent>
                                <CardFooter>
                                    <Heart
                                        // @ts-ignore
                                        className={`w-6 h-6 ${liked[item.id] ? "text-red-500 fill-red-500" : "text-gray-500"}`}
                                        onClick={() => handleLike(item.id)}
                                    />
                                    {/*// @ts-ignore*/}
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