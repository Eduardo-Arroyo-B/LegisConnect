import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const PropuestasUsuario = () => {
    return (
        <section className="w-screen h-screen">
            <div className="flex justify-center items-center mt-10">Mis propuestas</div>
            <Card className="mt-10">
                <CardHeader>
                    <CardTitle>Mis propuestas</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </section>
    )
}

export default PropuestasUsuario