import { API_URL_REGISTRO_PRESENZE } from "./costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"
import { Presenza } from "../models/Presenza"

export class PresenzeService{
    static getPresenze(targetId: number, isDocente: boolean){
        const tipo = isDocente ? "D" : "S"
        return ServerCall.get(API_URL_REGISTRO_PRESENZE + "/getPresenze/" + tipo + "/" + targetId)
    }

    static editPresenza(id: number, body: Presenza){
        return ServerCall.put(API_URL_REGISTRO_PRESENZE + "/editPresenza/" + id, body)
    }

    static getPresenzeDaConfermare(){
        if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()
            
        return ServerCall.get("http://mygraphic.altervista.org/esame/?presenze")
    }

    static confermaPresenza(idPresenza: number){
        return ServerCall.put("http://mygraphic.altervista.org/esame/?presenze&conferma", { idPresenza })
    }

    static confermaPresenze(idPresenze: number[]){
        return ServerCall.put("http://mygraphic.altervista.org/esame/?presenze&confermaAll", { idPresenze })
    }

    static rifiutaPresenza(idPresenza: number){
        return ServerCall.put("http://mygraphic.altervista.org/esame/?presenze&rifiuta", { idPresenza })
    }
}