import { anilloCMDB, equipo, enlace } from '../models/infoCMDB'

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
    parseToRenderGraph(arregloAnillos: anilloCMDB[]){

        let arregloEquipos:any = []
        let arregloEnlaces:any =[]
        
        arregloAnillos.forEach((anillo: anilloCMDB)=> {
           anillo.arregloEquipos.map((nodo:any)=>{
                nodo.name = nodo.id
                nodo.labelDisplay = `${nodo.nombre}\n${nodo.ip} `
            })
            let parseEnlace:any = anillo.arregloEnlaces.map((enlace:any, index:number)=> {
                let findSource:any = anillo.arregloEquipos.find((nodo:equipo)=>nodo.id == enlace.source)
                let sourcePosition = anillo.arregloEquipos.indexOf(findSource)
                let findTarget:any = anillo.arregloEquipos.find((nodo:equipo)=>nodo.id == enlace.target)
                let targetPosition = anillo.arregloEquipos.indexOf(findTarget)
                let color = (enlace.color == undefined) ? '': 'red'
                return { source: `node${sourcePosition+1}`, target: `node${targetPosition+1}`, color:color}
              })
              anillo.arregloEnlaces = parseEnlace

              anillo.arregloEquipos.forEach(nodo=> arregloEquipos.push(nodo))
              anillo.arregloEnlaces.forEach(enlace=> arregloEnlaces.push(enlace))
        })

        let objectoEquipos = Object.assign({}, arregloEquipos);
        let objectoEnlaces = Object.assign({}, arregloEnlaces);

        return {...arregloAnillos, objectoEquipos: objectoEquipos, objectoEnlaces: objectoEnlaces}
    }
}