import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const News = () => {

    return (
        <>
            <section className="mt-10 mr-12">
                <label className="flex justify-center mb-6 border rounded-full border-[#996ea1] bg-[#d0a2d8]">Ultimas Noticia</label>
                <div className="h-60 w-64 ">
                    <Card className="w-full h-full">
                        <CardHeader>
                            <CardTitle>Titulo noticia</CardTitle>
                            <CardDescription>Fecha</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Contenido noticia</p>
                        </CardContent>
                        <CardFooter>
                            <p>Footer contenido</p>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </>
    )
}

export default News