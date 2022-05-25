const urlServerCMDB = "http://10.180.251.131:8080"
import { anilloCMDB } from '../models/infoCMDB'

//"http://10.71.35.127:8080/pdrservice/anillos/listAnillos"
//http://10.180.251.131/

export default {
    async getAnilllosCMDB() {
        var anillos = await fetch(`${urlServerCMDB}/pdrservice/anillos/listAnillos`);
        var jsonResponse = await anillos.json();
        return jsonResponse;
    },
    async getDetalleAnilllo(idAnillo: string) {
        try {
            let urlWS = "http://10.71.35.127:8080/pdrservice/anillos/infoAnilloFull/" + idAnillo;
            var anillos = await fetch(urlWS);
            var jsonResponse = await anillos.json();
            return jsonResponse;
        } catch (error) {
            console.log("CMDB API - getDetalleAnilllo: ", error)
            return "Error al consultar el WS"
        }
    },
    async consultaMultiplesAnillos(arreglo: anilloCMDB[]) {
        try {
            let responseAnillos:any = [];
            for await (let anillo of arreglo) {
                let urlWS = `${urlServerCMDB}/anillos-component/anillos/detalle/${anillo.id}`;
                let peticion = await fetch(urlWS);
                var jsonResponse = await peticion.json();
                anillo.arregloEnlaces = jsonResponse.arrayConexionesEdges
                anillo.arregloEquipos = jsonResponse.arrayDispositivosNodes
                responseAnillos.push(anillo)
                //console.log("responseAnillos: ", responseAnillos)
            }
            return responseAnillos
        } catch (error) {
            console.log("consultaMultiplesAnillos error: ", error)
            return [];
        }
    },
}