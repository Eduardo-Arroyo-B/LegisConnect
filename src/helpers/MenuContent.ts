import iconHome from "../assets/house-solid.svg"
import iconPencil from "../assets/pencil-solid.svg"
import iconSettings from "../assets/gear-solid.svg"

const menuItems = [
    {
        title: "Inicio",
        path: "/home",
        icon: iconHome
    },
    {
        title: "Crear Propuesta",
        path: "/proposals",
        icon: iconPencil
    },
    {
        title: "Cerrar Session",
        path: "/",
        icon: iconSettings
    }
]

export default menuItems