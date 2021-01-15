import { API_URL_REGISTRO_CORSI } from "./costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"

export class CorsiService{
    static getCorsi(){
        if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()
		
        return ServerCall.get(API_URL_REGISTRO_CORSI)
    }

    static getCorso(idCorso: number){
        if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()
		
        return ServerCall.get(API_URL_REGISTRO_CORSI + "/" + idCorso)
    }
}