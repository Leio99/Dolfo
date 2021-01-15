import { API_URL_REGISTRO_STUDENTI } from "./costantiApi"
import { ServerCall } from "./ServerCall"
import { Studente } from "../models/Studente"

export class StudentiService{
    static getStudentiEdizione(idGestore: number){		
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getByGestore/" + idGestore)
    }

    static getStatoStage(idGestore: number){		
		return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getStageValue/" + idGestore)
    }

    static archiviaStudenti(body: number[]){		
		return ServerCall.put(API_URL_REGISTRO_STUDENTI + "/archivia", body)
    }

    static getStudente(id: string){
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/" + id)
    }

    static getOreStudente(id: string){        
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getOre/" + id)
    }

    static getTotaleOre(idEdizione: number){        
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getOreTotali/" + idEdizione)
    }

    static getOreStage(id: number){
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getOreStage/" + id)
    }

    static getTotaleOreStage(id: number){
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getTotaleOreStage/" + id)
    }

    static addStudenti(idGestore: number, body: Studente[]){
        return ServerCall.post(API_URL_REGISTRO_STUDENTI + "/" + idGestore, body)
    }

    static editStudente(idStudente: number, body: Studente){
        return ServerCall.put(API_URL_REGISTRO_STUDENTI + "/" + idStudente, body)
    }
}