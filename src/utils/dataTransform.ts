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
    parseToRenderGraph(arregloAnillos: anilloCMDB[]) {
        let arregloEquipos: any = []
        let arregloEnlaces: any = []
        

        arregloAnillos.forEach((anillo: anilloCMDB, idxAnillo: number) => {

            anillo.arregloEquipos.map((nodo: equipo) => {
                nodo.group = idxAnillo+1
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
                enlace.color = (enlace.color == undefined) ? '#2064ff' : '#EB5353'
            })
            
            anillo.arregloEnlaces.map((enlace, idx, array)=>{
                let reverseLink = { source : enlace.target, target: enlace.source }
                let findReverseLink = array.find((e)=> {
                  return JSON.stringify(reverseLink)===JSON.stringify({ source : e.source, target: e.target })
                })
                enlace.isDoubleLink = (findReverseLink != undefined) ? true : false
                return enlace
              })
              
              //anillo.arregloEquipos.forEach(nodo => arregloEquipos.push(nodo))
            //anillo.arregloEnlaces.forEach(enlace => arregloEnlaces.push(enlace))
            
            /*
            arregloEquipos = anillo.arregloEquipos.filter((equipo)=>{
                let enlaceEncontrado = 
                anillo.arregloEnlaces.find((enlace) => {
                            return (enlace.source == equipo.id || enlace.target == equipo.id)
                });
              if (enlaceEncontrado != undefined) return {...equipo}
              
                //console.log(enlaceEncontrado);
            })
            */

            anillo.arregloEquipos.forEach((nodo) =>{ 
                //nodo.group = idxAnillo+1
                let enlaceEncontrado = 
                anillo.arregloEnlaces.find((enlace) => {
                            return (enlace.source == nodo.id || enlace.target == nodo.id)
                });
              if (enlaceEncontrado != undefined) arregloEquipos.push(nodo)

                //arregloEquipos.push(nodo)
            })
            anillo.arregloEnlaces.forEach(enlace => {

                
                arregloEnlaces.push(enlace)})

        })



        return { ...arregloAnillos, arregloEquipos: arregloEquipos, arregloEnlaces: arregloEnlaces }
    }
}