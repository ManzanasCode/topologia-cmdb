export interface anilloCMDB {
    id: string;
    nombre?: string;
    region?: string;
    arregloEquipos: equipo[];
    arregloEnlaces: enlace[];
  }
  
  export interface equipo {
    id: string;
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
    region: string;
  }