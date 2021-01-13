import { API_URL_REGISTRO_DOCENTI } from "../commons/consts/costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"

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

    static editDocente(idDocente: string, body: any){
        const login = ComponentsPermissions.getLoginGestore(),
        params = {
            authCoordinatore: {
                idCoordinatore: login.idCoordinatore,
                password: login.password
            },
            docente: body
        }

        return ServerCall.put(API_URL_REGISTRO_DOCENTI + "/" + idDocente, params)
    }
}