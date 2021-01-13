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

    static getPresenzeStudente(idStudente: number){
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getPresenze/" + idStudente)
    }

    static editStudente(idStudente: string, body: any){
        const login = ComponentsPermissions.getLoginGestore(),
		params = {
            authCoordinatore: {
                idCoordinatore: login.idCoordinatore,
                password: login.password
            },
            studente: body
        }

        return ServerCall.put(API_URL_REGISTRO_STUDENTI + "/" + idStudente, params)
    }
}