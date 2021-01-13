import { API_URL_REGISTRO_GESTORI } from "../commons/consts/costantiApi"
import { ServerCall } from "./ServerCall"

export class CoordinatoriService{
    static tryLogin(body: any){
        return ServerCall.post(API_URL_REGISTRO_GESTORI + "/logincoordinatore", body)
    }

    static recuperoPassword(email: string){
        return ServerCall.post(API_URL_REGISTRO_GESTORI + "/recuperocoordinatori", { email })
    }

    static cambioPassword(body: any){
        return ServerCall.post(API_URL_REGISTRO_GESTORI + "/cambiopassword", body)
    }
}