import { API_URL_REGISTRO_DOCENTI } from "./costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"
import { Docente } from "../models/Docente"

export class DocentiService{
    static getDocente(idDocente: string){
        if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()
		
        return ServerCall.get(API_URL_REGISTRO_DOCENTI + "/getdocentibyid/" + idDocente)
    }

    static getDocenti(){
        if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()
		
        return ServerCall.get(API_URL_REGISTRO_DOCENTI)
    }

    static editDocente(idDocente: string, body: Docente){
        return ServerCall.put(API_URL_REGISTRO_DOCENTI + "/" + idDocente, body)
    }
}