import { anilloCMDB, equipo, enlace, ColorEquipo, ImagenEquipo } from '../models/infoCMDB'

export default {

    parseURL(urlParams: string): string {
        console.log("urlParams: ", urlParams)
        try {
            return JSON.parse(urlParams)
        } catch (error) {
            console.log("validaURL ", error)
            return "";
            //throw new Error("URL mal estructurada")
        }
    },
    validaURL(urlParams: string): anilloCMDB[] {
        console.log("urlParams: ", urlParams)
        try {
            return JSON.parse(urlParams)
        } catch (error) {
            console.log("validaURL ", error)
            return [];
            //throw new Error("URL mal estructurada")
        }
    },
    cleanEquiposAndMarkCoincidences(arregloEquipos: equipo[]) {

        console.log("TOTAL EQUIPOS: ", arregloEquipos.length)
        
        arregloEquipos.forEach((nodo: equipo, idxNodo, self) => {

            if (nodo.containsLinkRed && nodo.tipo == "Router") {
                
                let totalCoincidences = self.filter((n, i)=>{
                    if(nodo.id== n.id && nodo.ip== n.ip) return n
                })
                
                nodo.numCoincidences = totalCoincidences.length
                
            }
        })

        let equipos = []
        equipos = arregloEquipos.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id && t.nombre === value.nombre
            ))
        )
        return equipos
    },
    cleanEnlaces(arregloEnlaces: enlace[]) {
        let enlaces = []
        enlaces = arregloEnlaces.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.source === value.source && t.target === value.target
            ))
        )
        return enlaces
    },

    parseToRenderGraph(arregloAnillos: anilloCMDB[]) {
        let arregloEquipos: any = []
        let arregloEnlaces: any = []


        arregloAnillos.forEach((anillo: anilloCMDB, idxAnillo: number) => {
            
            let groupNumber = idxAnillo + 1

            anillo.arregloEquipos.forEach((nodo: equipo) => {
                nodo.group = groupNumber
                nodo.name = nodo.id
                nodo.region = anillo.region
                nodo.nombreAnillo = anillo.nombre
                nodo.color =
                    (nodo.tipo.toLocaleLowerCase() == 'router') ? ColorEquipo.Router :
                        (nodo.tipo.toLocaleLowerCase() == 'switch') ? ColorEquipo.Switch :
                            (nodo.tipo.toLocaleLowerCase() == 'olt') ? ColorEquipo.Olt :
                                (nodo.tipo.toLocaleLowerCase() == 'proveedor') ? ColorEquipo.Proovedor :
                                    ColorEquipo.Default;

                nodo.imagen = (nodo.tipo.toLocaleLowerCase() == 'router') ? ImagenEquipo.Router :
                    (nodo.tipo.toLocaleLowerCase() == 'switch') ? ImagenEquipo.Switch :
                        (nodo.tipo.toLocaleLowerCase() == 'olt') ? ImagenEquipo.Olt :
                            (nodo.tipo.toLocaleLowerCase() == 'proveedor') ? ImagenEquipo.Proovedor : ImagenEquipo.Default


            })

            anillo.arregloEnlaces.forEach((enlace, idx, array) => {
                enlace.color = (enlace.color == undefined) ? '#2064ff' : '#EB5353'
                let reverseLink = { source: enlace.target, target: enlace.source }
                let findReverseLink = array.find((e) => {
                    return JSON.stringify(reverseLink) === JSON.stringify({ source: e.source, target: e.target })
                })
                enlace.isDoubleLink = (findReverseLink != undefined) ? true : false
                return enlace
            })

            anillo.arregloEquipos.forEach((nodo: equipo) => {
                let nodoRojo = anillo.arregloEnlaces.find((enlace, idxEnlace) => {
                    if ((enlace.source == nodo.id || enlace.target == nodo.id) && enlace.color == '#EB5353') return enlace
                })
                nodo.containsLinkRed = (nodoRojo != undefined) ? true : false
            })
            
            anillo.arregloEquipos.forEach(nodo => arregloEquipos.push(nodo))
            anillo.arregloEnlaces.forEach(enlace => arregloEnlaces.push(enlace))
        })



        return { arregloGlobal: arregloAnillos, arregloEquipos: arregloEquipos, arregloEnlaces: arregloEnlaces }
    },

}