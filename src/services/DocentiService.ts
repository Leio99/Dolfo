import { API_URL_REGISTRO_DOCENTI } from "./costantiApi"
import { ServerCall } from "./ServerCall"
import { Docente } from "../models/Docente"

export class DocentiService{
    static getDocente(idDocente: string){		
        return ServerCall.get(API_URL_REGISTRO_DOCENTI + "/" + idDocente)
    }

    static getDocenti(idEnte: number){		
        return ServerCall.get(API_URL_REGISTRO_DOCENTI + "/getByEnte/" + idEnte)
    }

    static addDocente(idEnte: number, body: Docente[]){
        return ServerCall.post(API_URL_REGISTRO_DOCENTI + "/" + idEnte, body)
    }

    static editDocente(idDocente: number, body: Docente){
        return ServerCall.put(API_URL_REGISTRO_DOCENTI + "/" + idDocente, body)
    }

    static ritiraReintegraDocente(idDocente: number){
        return ServerCall.put(API_URL_REGISTRO_DOCENTI + "/ritiraReintegra/" + idDocente, {})
    }
}