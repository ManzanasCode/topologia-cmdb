import { anilloCMDB, equipo, enlace, ColorEquipo, ImagenEquipo } from '../models/infoCMDB'

export default {

    parseURL(urlParams: string): anilloCMDB[] {
        console.log("urlParams: ", urlParams)
        try {
            return JSON.parse(urlParams)
        } catch (error) {
            console.log("validaURL ", error)
            return [];
            //throw new Error("URL mal estructurada")
        }
    },
    parseToRenderGraph(arregloAnillos: anilloCMDB[]) {
        let arregloEquipos: any = []
        let arregloEnlaces: any = []

        arregloAnillos.forEach((anillo: anilloCMDB) => {

            anillo.arregloEquipos.map((nodo: equipo) => {
                nodo.name = nodo.id
                nodo.region = anillo.region
                nodo.nombreAnillo = anillo.nombre
                nodo.color  =
                    (nodo.tipo.toLocaleLowerCase() == 'router') ? ColorEquipo.Router : 
                    (nodo.tipo.toLocaleLowerCase() == 'switch') ? ColorEquipo.Switch :
                    (nodo.tipo.toLocaleLowerCase() == 'olt') ? ColorEquipo.Olt : 
                    (nodo.tipo.toLocaleLowerCase() == 'proveedor') ? ColorEquipo.Proovedor : 
                    ColorEquipo.Default;

                nodo.imagen  =
                    (nodo.tipo.toLocaleLowerCase() == 'router') ? ImagenEquipo.Router : 
                    (nodo.tipo.toLocaleLowerCase() == 'switch') ? ImagenEquipo.Switch :
                    (nodo.tipo.toLocaleLowerCase() == 'olt') ? ImagenEquipo.Olt : 
                    (nodo.tipo.toLocaleLowerCase() == 'proveedor') ? ImagenEquipo.Proovedor : 
                    ImagenEquipo.Default
            })

            anillo.arregloEnlaces.map((enlace: any) => {
                enlace.color = (enlace.color == undefined) ? '#73777B' : '#EB5353'
            })

            anillo.arregloEquipos.forEach(nodo => arregloEquipos.push(nodo))
            anillo.arregloEnlaces.forEach(enlace => arregloEnlaces.push(enlace))

        })



        return { ...arregloAnillos, arregloEquipos: arregloEquipos, arregloEnlaces: arregloEnlaces }
    }
}