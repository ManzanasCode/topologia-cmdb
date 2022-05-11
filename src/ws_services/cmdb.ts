const urlServerCMDB = "http://10.71.35.127:8080"

//"http://10.71.35.127:8080/pdrservice/anillos/listAnillos"
export default {
    async getAnilllosCMDB() {
        var anillos = await fetch(`${urlServerCMDB}/pdrservice/anillos/listAnillos`);
        var jsonResponse = await anillos.json();
        return jsonResponse;
    },
    async getDetalleAnilllo(idAnillo:string) {
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
}