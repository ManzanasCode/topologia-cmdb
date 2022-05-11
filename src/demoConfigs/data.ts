import { Nodes, Edges,} from "v-network-graph"

const nodes: Nodes = {
    "node1": {
      "id": "0x202f8bb06d11804c882ef3e612b16699",
      "nombre": "CUERN1-CUE131214-X8-CA",
      "tipo": "Router",
      "ip": "10.180.9.9",
      "imagen": "ROUTER.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x202f8bb06d11804c882ef3e612b16699",
      "labelDisplay": "CUERN1-CUE131214-X8-CA\n10.180.9.9 "
    },
    "node2": {
      "id": "0xd7bd855fb744d641ba7f8d6a97c4aaff",
      "nombre": "MINA-CUAUHTEMOC-CUE147712-M14-CA",
      "tipo": "Router",
      "ip": "10.180.149.127",
      "imagen": "ROUTER.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0xd7bd855fb744d641ba7f8d6a97c4aaff",
      "labelDisplay": "MINA-CUAUHTEMOC-CUE147712-M14-CA\n10.180.149.127 "
    },
    "node3": {
      "id": "0x41e6c69e7e27d742a9bd3ab35735f8b6",
      "nombre": "CENTE-MORS-CUER-0016-M14",
      "tipo": "Router",
      "ip": "10.180.9.103",
      "imagen": "ROUTER.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x41e6c69e7e27d742a9bd3ab35735f8b6",
      "labelDisplay": "CENTE-MORS-CUER-0016-M14\n10.180.9.103 "
    },
    "node4": {
      "id": "0xcf577152141e0647a49a6873b3597d46",
      "nombre": "PALMIR-CUE133115-M14-CA",
      "tipo": "Router",
      "ip": "10.180.149.129",
      "imagen": "ROUTER.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0xcf577152141e0647a49a6873b3597d46",
      "labelDisplay": "PALMIR-CUE133115-M14-CA\n10.180.149.129 "
    },
    "node5": {
      "id": "0xa3473703072a934f9439a29858069ab2",
      "nombre": "CHILPA-MEX86418-X3-CA",
      "tipo": "Router",
      "ip": "10.180.207.23",
      "imagen": "ROUTER.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0xa3473703072a934f9439a29858069ab2",
      "labelDisplay": "CHILPA-MEX86418-X3-CA\n10.180.207.23 "
    },
    "node6": {
      "id": "0x3328dfdccf8f624aa666d61fb4a2aad6",
      "nombre": "SANLOR-MEX131395-X8A-CA-B",
      "tipo": "Router",
      "ip": "10.180.9.3",
      "imagen": "ROUTER.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x3328dfdccf8f624aa666d61fb4a2aad6",
      "labelDisplay": "SANLOR-MEX131395-X8A-CA-B\n10.180.9.3 "
    },
    "node7": {
      "id": "0xdc3693921b6bfc4e8484352563c6daff",
      "nombre": "CUERIII-MORS-CUER-0002-CA-M14",
      "tipo": "Router",
      "ip": "10.180.9.213",
      "imagen": "ROUTER.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0xdc3693921b6bfc4e8484352563c6daff",
      "labelDisplay": "CUERIII-MORS-CUER-0002-CA-M14\n10.180.9.213 "
    },
    "node8": {
      "id": "0x0d0b694ad507594dbf521a9559bebece",
      "nombre": "ZODIAC-MORS-CUER-0004-CA-M14",
      "tipo": "Router",
      "ip": "10.180.9.211",
      "imagen": "ROUTER.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x0d0b694ad507594dbf521a9559bebece",
      "labelDisplay": "ZODIAC-MORS-CUER-0004-CA-M14\n10.180.9.211 "
    },
    "node9": {
      "id": "0x703fd672a1911d498664046b61047e4e",
      "nombre": "CAPUFE-MORS-CUER-0003-M14-CA",
      "tipo": "Router",
      "ip": "10.180.9.209",
      "imagen": "ROUTER.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x703fd672a1911d498664046b61047e4e",
      "labelDisplay": "CAPUFE-MORS-CUER-0003-M14-CA\n10.180.9.209 "
    },
    "node10": {
      "id": "0x4a1b48516847404f83ca2ecc0a854bf5",
      "nombre": "CUERN1-CUE131214-S93-A",
      "tipo": "Switch",
      "ip": "10.180.209.101",
      "imagen": "SWITCH.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x4a1b48516847404f83ca2ecc0a854bf5",
      "labelDisplay": "CUERN1-CUE131214-S93-A\n10.180.209.101 "
    },
    "node11": {
      "id": "0x3535e5e732e8da47acf7c0281e143169",
      "nombre": "ENTRE-MILPAS-CUE143849-M14-CA",
      "tipo": "Router",
      "ip": "10.180.149.125",
      "imagen": "ROUTER.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x3535e5e732e8da47acf7c0281e143169",
      "labelDisplay": "ENTRE-MILPAS-CUE143849-M14-CA\n10.180.149.125 "
    },
    "node12": {
      "id": "0x6c7b6d70885a3241ad7fc5aee3827168",
      "nombre": "CORE-TLALNE-MEX9226-X16A-CA",
      "tipo": "Router",
      "ip": "10.180.9.127",
      "imagen": "ROUTER.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x6c7b6d70885a3241ad7fc5aee3827168",
      "labelDisplay": "CORE-TLALNE-MEX9226-X16A-CA\n10.180.9.127 "
    },
    "node13": {
      "id": "0x975e71e0e86c1d48a0143e7c8b3ef755",
      "nombre": "SUMIYA-CUE131875-M14-CA",
      "tipo": "Router",
      "ip": "10.180.149.131",
      "imagen": "ROUTER.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x975e71e0e86c1d48a0143e7c8b3ef755",
      "labelDisplay": "SUMIYA-CUE131875-M14-CA\n10.180.149.131 "
    },
    "node14": {
      "id": "0x8b86b7b25f540148920a012982e6bc38",
      "nombre": "CHILPA-SSSSS-S63-A",
      "tipo": "Switch",
      "ip": "10.180.207.66",
      "imagen": "SWITCH.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x8b86b7b25f540148920a012982e6bc38",
      "labelDisplay": "CHILPA-SSSSS-S63-A\n10.180.207.66 "
    },
    "node15": {
      "id": "0xaf814efaf6138a4495fc69502b3262fd",
      "nombre": "CUERNAVACA",
      "tipo": "OLT",
      "ip": "10.180.19.5",
      "imagen": "OLT.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0xaf814efaf6138a4495fc69502b3262fd",
      "labelDisplay": "CUERNAVACA\n10.180.19.5 "
    },
    "node16": {
      "id": "0xdb0898bed418b54087d5d61d8eddb006",
      "nombre": "MINA_CUAUHTEMOC_CVA",
      "tipo": "OLT",
      "ip": "10.180.19.14",
      "imagen": "OLT.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0xdb0898bed418b54087d5d61d8eddb006",
      "labelDisplay": "MINA_CUAUHTEMOC_CVA\n10.180.19.14 "
    },
    "node17": {
      "id": "0x6b5c2f4623ccbe40aef7ecf80961478b",
      "nombre": "CENTENARIO_CVA",
      "tipo": "OLT",
      "ip": "10.180.19.211",
      "imagen": "OLT.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x6b5c2f4623ccbe40aef7ecf80961478b",
      "labelDisplay": "CENTENARIO_CVA\n10.180.19.211 "
    },
    "node18": {
      "id": "0x672ca7e4dcdd414ba9065ada179b8482",
      "nombre": "SAN_JOSE_CUMBRES_CVA",
      "tipo": "OLT",
      "ip": "10.180.19.9",
      "imagen": "OLT.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x672ca7e4dcdd414ba9065ada179b8482",
      "labelDisplay": "SAN_JOSE_CUMBRES_CVA\n10.180.19.9 "
    },
    "node19": {
      "id": "0x2bb93ae9640c274ca066b28884d45648",
      "nombre": "CUERNAVACA_TP_3",
      "tipo": "OLT",
      "ip": "10.180.19.7",
      "imagen": "OLT.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x2bb93ae9640c274ca066b28884d45648",
      "labelDisplay": "CUERNAVACA_TP_3\n10.180.19.7 "
    },
    "node20": {
      "id": "0x38e160f0494a4e43b06802c7b4fa191e",
      "nombre": "TEJALPA_CVA",
      "tipo": "OLT",
      "ip": "10.180.19.11",
      "imagen": "OLT.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x38e160f0494a4e43b06802c7b4fa191e",
      "labelDisplay": "TEJALPA_CVA\n10.180.19.11 "
    },
    "node21": {
      "id": "0x37cb38cbd836b349bf1865e4d1a4ac47",
      "nombre": "CAPUFE_CVC",
      "tipo": "OLT",
      "ip": "10.180.19.6",
      "imagen": "OLT.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0x37cb38cbd836b349bf1865e4d1a4ac47",
      "labelDisplay": "CAPUFE_CVC\n10.180.19.6 "
    },
    "node22": {
      "id": "0xeeaee93e5a293f459e5c806eae458547",
      "nombre": "ENTRE_MILPAS_CVA",
      "tipo": "OLT",
      "ip": "10.180.19.13",
      "imagen": "OLT.jpg",
      "length": "EDGE_LENGTH_MAIN",
      "name": "0xeeaee93e5a293f459e5c806eae458547",
      "labelDisplay": "ENTRE_MILPAS_CVA\n10.180.19.13 "
    }
  }

const edges: Edges = {
    "edge1": {
      "source": "node1",
      "target": "node10"
    },
    "edge2": {
      "source": "node1",
      "target": "node5"
    },
    "edge3": {
      "source": "node1",
      "target": "node6"
    },
    "edge4": {
      "source": "node1",
      "target": "node12"
    },
    "edge5": {
      "source": "node2",
      "target": "node11"
    },
    "edge6": {
      "source": "node3",
      "target": "node1"
    },
    "edge7": {
      "source": "node4",
      "target": "node2"
    },
    "edge8": {
      "source": "node4",
      "target": "node13"
    },
    "edge9": {
      "source": "node5",
      "target": "node1"
    },
    "edge10": {
      "source": "node5",
      "target": "node14"
    },
    "edge11": {
      "source": "node6",
      "target": "node1"
    },
    "edge12": {
      "source": "node7",
      "target": "node1"
    },
    "edge13": {
      "source": "node7",
      "target": "node8"
    },
    "edge14": {
      "source": "node8",
      "target": "node13"
    },
    "edge15": {
      "source": "node9",
      "target": "node3"
    },
    "edge16": {
      "source": "node9",
      "target": "node11"
    },
    "edge17": {
      "source": "node10",
      "target": "node15"
    },
    "edge18": {
      "source": "node2",
      "target": "node16"
    },
    "edge19": {
      "source": "node3",
      "target": "node17"
    },
    "edge20": {
      "source": "node4",
      "target": "node18"
    },
    "edge21": {
      "source": "node7",
      "target": "node19"
    },
    "edge22": {
      "source": "node8",
      "target": "node20"
    },
    "edge23": {
      "source": "node9",
      "target": "node21"
    },
    "edge24": {
      "source": "node11",
      "target": "node22"
    }
  }

  


export default {
  nodes,
  edges,
}