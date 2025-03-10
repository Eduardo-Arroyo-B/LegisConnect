import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { toast } from "sonner";


const createProposals = () => {
    const [data, setData] = useState({
        title: "",
        content: "",
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = "https://api-legisconnect-production.up.railway.app/proposals/createProposal"

        try {
            const response = await fetch(url, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            const dataResponse = await response.json()

            if (response.ok) {
                toast( "Mensaje",{
                    description: dataResponse.message
                })
            } else {
                toast("Error",{
                    description: dataResponse.errores?.length > 0 ? (
                            <ul>
                                {dataResponse.errores.map((e, index) => (
                                    <li key={index}>{e.msg}</li>
                                ))}
                            </ul>
                        ) :
                        <ul>
                            <li>{dataResponse.message}</li>
                        </ul>,
                    action: {
                        label: "Cerrar",
                        onClick: () => console.log("cerrar toast")
                    }
                })
            }

            console.log(dataResponse)
            setData({
                title: "",
                content: ""
            })
        } catch (error) {
            console.log("Ha ocurrido un error: ", error.message)
        }
    }

    console.log(data)

    return(
        <>
            <section className="h-screen w-screen">
                <label className="flex justify-center items-center mt-20">Crea tu propuesta</label>
                <div className="flex justify-center items-center">
                    <form className="mt-20 h-96 w-96" onSubmit={handleSubmit}>
                        <Card className="h-full w-full border-[#996ea1]">
                            <CardHeader>
                                <CardTitle>Titulo de la propuesta:</CardTitle>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Escribir el titulo"
                                    onChange={handleChange}
                                    value={data.title}
                                    className="border-solid border rounded-lg border-[#996ea1]"
                                />
                            </CardHeader>
                            <CardContent className="h-3/5">
                                <p>Contenido de la propuesta:</p>
                                <textarea
                                    name="content"
                                    placeholder="Escriba la propuesta aqui..."
                                    onChange={handleChange}
                                    value={data.content}
                                    className="border-solid border rounded-lg border-[#996ea1] w-full h-full"
                                />
                            </CardContent>
                            <Button type="submit" className="mt-2 ml-6">Subir Propuesta</Button>
                        </Card>
                    </form>
                </div>
            </section>
        </>
    )
}

export default createProposals;