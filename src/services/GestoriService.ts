import { API_URL_REGISTRO_GESTORI } from "../commons/consts/costantiApi"
import { ServerCall } from "./ServerCall"

export class GestoriService{
    static tryLogin(body: any){
        return ServerCall.post(API_URL_REGISTRO_GESTORI + "/login", body)
    }

    static getLastEdizione(idGestore: number){
        return ServerCall.get(API_URL_REGISTRO_GESTORI + "/getLastEdizione/" + idGestore)
    }

    static changeEdizione(idGestore: number, idEdizione: number){
        return ServerCall.post(API_URL_REGISTRO_GESTORI + "/changeEdizione/" + idGestore, { idEdizione })
    }
}