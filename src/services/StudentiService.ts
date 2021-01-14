import { API_URL_REGISTRO_STUDENTI } from "../commons/consts/costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"

export class StudentiService{
    static getStudentiEdizione(idGestore: number){
		if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()
		
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getByGestore/" + idGestore)
    }

    static getStatoStage(idGestore: number){
		if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()
		
		return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getStageValue/" + idGestore)
    }

    static archiviaStudenti(body: any){
		if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()
		
		return ServerCall.put(API_URL_REGISTRO_STUDENTI + "/archivia", body)
    }

    static getStudente(id: string){
        if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()

        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/" + id)
    }

    static getOreStudente(id: string){
        if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()
        
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getOre/" + id)
    }

    static getTotaleOre(idEdizione: string){
        if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()
        
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getOreTotali/" + idEdizione)
    }

    static getOreStage(id: number){
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getOreStage/" + id)
    }

    static getTotaleOreStage(id: number){
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getTotaleOreStage/" + id)
    }

    static addStudenti(idGestore: number, body: any){
        return ServerCall.post(API_URL_REGISTRO_STUDENTI + "/" + idGestore, body)
    }

    static editStudente(idStudente: number, body: any){
        return ServerCall.put(API_URL_REGISTRO_STUDENTI + "/" + idStudente, body)
    }
}