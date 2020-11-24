import { API_URL_REGISTRO } from "../commons/consts/costantiApi"
import { ServerCall } from "./ServerCall"

export class CoordinatoriService{
    static tryLogin(body: any){
        return ServerCall.post(API_URL_REGISTRO + "/coordinatori/logincoordinatore", body)
    }

    static recuperoPassword(email: string){
        return ServerCall.post(API_URL_REGISTRO + "/coordinatori/recuperocoordinatori", { email })
    }

    static cambioPassword(body: any){
        return ServerCall.post(API_URL_REGISTRO + "/coordinatori/cambiopassword", body)
    }
}