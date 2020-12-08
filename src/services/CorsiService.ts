import { API_URL_REGISTRO_CORSI } from "../commons/consts/costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"

export class CorsiService{
    static getCorsi(){
        if(!ComponentsPermissions.getLoginCoordinatore(false))
            return ServerCall.emptyCallResult()
		
        return ServerCall.get(API_URL_REGISTRO_CORSI)
    }
}