export interface anilloCMDB {
    id: string;
    nombre?: string;
    region?: string;
    arregloEquipos: equipo[];
    arregloEnlaces: enlace[];
  }
  
  export interface equipo {
    id: string;
    region?: string;
    nombreAnillo?: string;
    color?: ColorEquipo;
    nombre: string;
    tipo: string;
    ip: string;
    imagen: string;
    length: string;
    labelDisplay?: string;
    name?: string;
  }

  export interface enlace {
    id: string;
    nombre: string;
    region?: string;
    color?:string;
    source: string;
    target: string 
  }


  export enum ColorEquipo {
    Router = "#EB5353",
    Switch = "#F9D923",
    Olt = "#36AE7C",
    Proovedor = "#EC994B",
    POP = "#143F6B",
    Default = "#AB46D2",
  }

  export enum ImagenEquipo {
    Router = "./icons/router_black_blue.png",
    Switch = "./icons/switch_blue.png",
    Olt ="./icons/olt_black.png",
    Proovedor = "./icons/proveedor.png",
    POP = "./icons/server-control.png",
    Default = "./icons/uknow.png",
  }