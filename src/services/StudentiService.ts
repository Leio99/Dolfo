import Axios from "axios"
import { API_URL_REGISTRO } from "../commons/consts/costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"

export class StudentiService{
    static getStudentiCorso(idCorso: number){
        return Axios.get(API_URL_REGISTRO + "/studenti/" + idCorso)
    }

    static getStatoStage(idCorso: number, anno: number){
        return Axios.get(API_URL_REGISTRO + "/corsi/getstagevalue/" + idCorso + "/" + anno)
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
        return Axios.post(API_URL_REGISTRO + "/corsi/switchabilitastage", params)
    }
}