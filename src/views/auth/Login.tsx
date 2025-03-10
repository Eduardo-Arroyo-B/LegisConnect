import { Button } from "@/components/ui/button.tsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs.tsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


const Login = () => {

    // Asignacion de variables para useNavigate ( funcion para navegar entre rutas )
    const navigate = useNavigate();

    // Estado original de los datos para crear cuenta
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        repetir_password: ""
    })

    console.log(formData)

    // Guarda los cambios de cada input y los escribe en su respectivo campo
    // @ts-ignore
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Envia los datos al backend
    // @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Identificar que boton de submit fue presionado
        const submit = document.getElementById("submit")
        const action = submit?.getAttribute("name")


        // Utiliza un if dependiendo de cual boton se presiono
        if (action === "iniciarSession") {

            const url = "https://api-legisconnect-production.up.railway.app/users/auth"

            const response = await fetch(url, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            })

            const data = await response.json()

            console.log(data)

            if (response.ok) {
                console.log("Datos correctos, Iniciando Session")

                navigate("/home")
            } else {
                console.log("Datos incorrectos")

                toast("Error",{
                    description: data.errores?.length > 0 ? (
                        <ul>
                            {/*// @ts-ignore*/}
                            {data.errores.map((e, index) => (
                                <li key={index}>{e.msg}</li>
                            ))}
                        </ul>
                    ) :
                        <ul>
                            <li>{data.message}</li>
                        </ul>,
                    action: {
                        label: "Cerrar",
                        onClick: () => console.log("cerrar toast")
                    }
                })
            }


        } else if (action === "crearCuenta") {

            const url = "https://api-legisconnect-production.up.railway.app/users/createUser"

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            const data = await response.json()
            // @ts-ignore
            console.log(data.errores.map((e) => e.msg))

            // Alerta de la respuesta si es correcta o no
            if (response.ok) {
                console.log("Cuenta creada exitosamente")

                toast( "Cerrar",{
                    description: "Cuenta creada exitosamente, Inicia Session",
                    action: {
                        label: "Cerrar",
                        onClick: () => console.log("cerrar toast")
                    }
                })

                // Limpiar campos
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    repetir_password: ""
                })
            } else {
                console.log("A ocurrido un error")

                toast("Error",{
                    // @ts-ignore
                    description: data.errores.map((e, index) => (
                        <ul key={index}>
                            <li key={index}>{e.msg}</li>
                        </ul>
                    )),
                    action: {
                        label: "Cerrar",
                        onClick: () => console.log("cerrar toast")
                    }
                })
            }
        }
    }

    return(
        <form className="w-screen h-screen flex justify-center items-center" onSubmit={handleSubmit}>
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Iniciar Session</TabsTrigger>
                    <TabsTrigger value="createAccount">Crear Cuenta</TabsTrigger>
                </TabsList>

                {/*Formulario para iniciar session*/}
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cuenta</CardTitle>
                            <CardDescription>
                                Ingresa tus datos para iniciar session
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Correo</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="correo@correo.com"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Contraseña</Label>
                                <Input
                                    id="username"
                                    type="password"
                                    placeholder="password123"
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button id="submit" type="submit" name="iniciarSession">Iniciar Session</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/*Formulario de registro*/}
                <TabsContent value="createAccount">
                    <Card>
                        <CardHeader>
                            <CardTitle>Crea tu cuenta</CardTitle>
                            <CardDescription>
                                ¿No tienes cuenta? ¡Crea una!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Nombre</Label>
                                <Input id="current"
                                       type="text"
                                       name="name"
                                       placeholder="Nombre"
                                       value={formData.name}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">Correo</Label>
                                <Input id="new"
                                       type="text"
                                       name="email"
                                       placeholder="Correo@correo.com"
                                       value={formData.email}
                                       onChange={handleChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new2">Contraseña</Label>
                                <Input id="new2"
                                       type="password"
                                       name="password"
                                       placeholder="Password123"
                                       value={formData.password}
                                       onChange={handleChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new3">Repetir contraseña</Label>
                                <Input id="new3"
                                       type="password"
                                       name="repetir_password"
                                       placeholder="Password123"
                                       value={formData.repetir_password} onChange={handleChange} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button id="submit" type="submit" name="crearCuenta">Crear Cuenta</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </form>
    )
}

export default Login