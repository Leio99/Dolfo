import { API_URL_REGISTRO } from "../commons/consts/costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"

export class StudentiService{
    static getStudentiCorso(idCorso: number){
		if(isNaN(idCorso)) return ServerCall.emptyCallResult()
		
        return ServerCall.get(API_URL_REGISTRO + "/studenti/" + idCorso)
    }

    static getStatoStage(idCorso: number, anno: number){
		if(isNaN(idCorso) || isNaN(anno)) return ServerCall.emptyCallResult()
		
		return ServerCall.get(API_URL_REGISTRO + "/corsi/getstagevalue/" + idCorso + "/" + anno)
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
        return ServerCall.post(API_URL_REGISTRO + "/corsi/switchabilitastage", params)
    }

    static getStudente(id: string){
        return ServerCall.get(API_URL_REGISTRO + "/studenti/getstudentibyid/" + id)
    }

    static getOreStudente(id: string){
        return ServerCall.get(API_URL_REGISTRO + "/studenti/gettotaleorelezioni/" + id)
    }

    static getTotaleOre(id: string){
        return ServerCall.get(API_URL_REGISTRO + "/studenti/gethoursamount/" + id)
    }

    static getPresenze(id: number){
        return ServerCall.get(API_URL_REGISTRO + "/studenti/getdetailedpresences/" + id)
    }

    static editPresenza(id: number, body: any){
        const login = ComponentsPermissions.getLoginCoordinatore(),
		params = {
            authCoordinatore: {
                idCoordinatore: login.idCoordinatore,
                password: login.password
            },
            ...body
        }

        return ServerCall.put(API_URL_REGISTRO + "/presenze/" + id, params)
    }
}