import { API_URL_REGISTRO_PRESENZE } from "./costantiApi"
import { ServerCall } from "./ServerCall"
import { Presenza } from "../models/Presenza"

export class PresenzeService{
    static getPresenze(targetId: number, isDocente: boolean, page: number){
        const tipo = isDocente ? "D" : "S"
        return ServerCall.get(API_URL_REGISTRO_PRESENZE + "/getPresenze/" + tipo + "/" + targetId + "/" + page)
    }

    static editPresenza(id: number, body: Presenza){
        return ServerCall.put(API_URL_REGISTRO_PRESENZE + "/editPresenza/" + id, body)
    }

    static getPresenzeDaConfermare(idGestore: number){            
        return ServerCall.get(API_URL_REGISTRO_PRESENZE + "/nonConfermate/" + idGestore)
    }

    static confermaPresenze(idPresenze: number[]){
        return ServerCall.put(API_URL_REGISTRO_PRESENZE + "/conferma", idPresenze)
    }

    static rifiutaPresenza(idPresenza: number){
        return ServerCall.put(API_URL_REGISTRO_PRESENZE + "/rifiuta/" + idPresenza, {})
    }
}