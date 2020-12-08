import { API_URL_REGISTRO_DOCENTI } from "../commons/consts/costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"

export class DocentiService{
    static getDocente(idDocente: string){
        if(!ComponentsPermissions.getLoginCoordinatore(false))
            return ServerCall.emptyCallResult()
		
        return ServerCall.get(API_URL_REGISTRO_DOCENTI + "/getdocentibyid/" + idDocente)
    }
}