import { API_URL_REGISTRO_STUDENTI, API_URL_REGISTRO_CORSI } from "../commons/consts/costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"

export class StudentiService{
    static getStudentiCorso(idCorso: number){
		if(isNaN(idCorso)) return ServerCall.emptyCallResult()
		
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/" + idCorso)
    }

    static getStatoStage(idCorso: number, anno: number){
		if(isNaN(idCorso) || isNaN(anno)) return ServerCall.emptyCallResult()
		
		return ServerCall.get(API_URL_REGISTRO_CORSI + "/getstagevalue/" + idCorso + "/" + anno)
    }

    static cambiaStatoStage(anno: number){
        const login = ComponentsPermissions.getLoginCoordinatore(),
		params = {
            authCoordinatore: {
                idCoordinatore: login.idCoordinatore,
                password: login.password
            },
            anno
        }
        return ServerCall.post(API_URL_REGISTRO_CORSI + "/switchabilitastage", params)
    }

    static getStudente(id: string){
        if(!ComponentsPermissions.getLoginCoordinatore(false))
            return ServerCall.emptyCallResult()

        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getstudentibyid/" + id)
    }

    static getOreStudente(id: string){
        if(!ComponentsPermissions.getLoginCoordinatore(false))
            return ServerCall.emptyCallResult()
        
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/gettotaleorelezioni/" + id)
    }

    static getTotaleOre(id: string){
        if(!ComponentsPermissions.getLoginCoordinatore(false))
            return ServerCall.emptyCallResult()
        
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/gethoursamount/" + id)
    }

    static getOreStage(id: number){
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getorestage/" + id)
    }

    static editStudente(idStudente: string, body: any){
        const login = ComponentsPermissions.getLoginCoordinatore(),
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