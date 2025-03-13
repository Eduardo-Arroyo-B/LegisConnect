import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState} from "react";
import {toast} from "sonner";


const createProposals = () => {
    const [data, setData] = useState({
        title: "",
        content: "",
    })

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        const url = "https://api-legisconnect-production.up.railway.app/proposals/createProposal"

        try {
            const response = await fetch(url, {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            const dataResponse = await response.json()

            if (response.ok) {
                toast("Mensaje", {
                    description: dataResponse.message
                })
            } else {
                toast("Error", {
                    description: dataResponse.errores?.length > 0 ? (
                            <ul>
                                {dataResponse.errores.map((e: {
                                    msg: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                                }, index: Key | null | undefined) => (
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
            // @ts-ignore
            console.log("Ha ocurrido un error: ", error.message)
        }
    }

    console.log(data)

    return(
        <>
            <section className="h-screen w-screen">
                <label className="flex justify-center items-center mt-20 font-mono">Crea tu propuesta</label>
                <div className="flex justify-center items-center">
                    <form className="mt-20 h-96 w-96" onSubmit={handleSubmit}>
                        <Card className="h-full w-full">
                            <CardHeader>
                                <CardTitle className="font-mono">Titulo de la propuesta</CardTitle>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Escribir el titulo"
                                    onChange={handleChange}
                                    value={data.title}
                                    className="border-solid border rounded-lg p-1"
                                />
                            </CardHeader>
                            <CardContent className="h-3/5">
                                <p className="font-mono">Contenido de la propuesta</p>
                                <textarea
                                    name="content"
                                    placeholder="Escriba la propuesta aqui..."
                                    onChange={handleChange}
                                    value={data.content}
                                    className="border-solid border rounded-lg w-full h-full p-1"
                                />
                            </CardContent>
                            <Button type="submit" className="mt-2 ml-6 font-mono">Subir Propuesta</Button>
                        </Card>
                    </form>
                </div>
            </section>
        </>
    )
}

export default createProposals;