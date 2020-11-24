import { API_URL_REGISTRO } from "../commons/consts/costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"

export class StudentiService{
    static getStudentiCorso(idCorso: number){
        return ServerCall.get(API_URL_REGISTRO + "/studenti/" + idCorso)
    }

    static getStatoStage(idCorso: number, anno: number){
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
}