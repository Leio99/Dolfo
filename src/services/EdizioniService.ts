import { API_URL_REGISTRO_EDIZIONI } from "./costantiApi"
import { ServerCall } from "./ServerCall"
import { Edizione } from "../models/Edizione"

export class EdizioniService{
    static getByGestore(idGestore: number){            
        return ServerCall.get(API_URL_REGISTRO_EDIZIONI + "/getByGestore/" + idGestore)
    }

    static addEdizione(idGestore: number, body: Edizione){
        return ServerCall.post(API_URL_REGISTRO_EDIZIONI + "/addEdizione/" + idGestore, body)
    }

    static editEdizione(idEdizione: number, body: Edizione){
        return ServerCall.put(API_URL_REGISTRO_EDIZIONI + "/editEdizione/" + idEdizione, body)
    }

    static switchStage(idGestore: number){
        return ServerCall.put(API_URL_REGISTRO_EDIZIONI + "/switchStage/" + idGestore, {})
    }

    static cambiaStatoStage(idGestore: number){
        return ServerCall.put(API_URL_REGISTRO_EDIZIONI + "/switchStageValue/" + idGestore, {})
    }

    static getIdCalendario(idGestore: number){
        return ServerCall.get(API_URL_REGISTRO_EDIZIONI + "/getIdCalendario/" + idGestore)
    }

    static editIdCalendario(idGestore: number, body: { idCalendario: string }){
        return ServerCall.put(API_URL_REGISTRO_EDIZIONI + "/editIdCalendario/" + idGestore, body)
    }
}