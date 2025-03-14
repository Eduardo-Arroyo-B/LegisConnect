import iconHome from "../assets/house-solid.svg"
import iconPencil from "../assets/pencil-solid.svg"
import iconSettings from "../assets/gear-solid.svg"
import iconDocument from "../assets/file-solid.svg"
import iconInfo from "../assets/circle-info-solid.svg"

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
        title: "Visualizacion Propuestas",
        path: "/userProposals",
        icon: iconDocument
    },
    {
        title: "Informacion Legislativa",
        path: "/informacionLegislativa",
        icon: iconInfo
    },
    {
        title: "Informacion Parlamentaria",
        path: "/informacionParlamentario",
        icon: iconInfo
    },
    {
        title: "Cerrar Session",
        path: "/",
        icon: iconSettings
    }
]

export default menuItems