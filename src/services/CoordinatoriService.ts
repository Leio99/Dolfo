import { API_URL_REGISTRO_COORDINATORI } from "../commons/consts/costantiApi"
import { ServerCall } from "./ServerCall"

export class CoordinatoriService{
    static tryLogin(body: any){
        return ServerCall.post(API_URL_REGISTRO_COORDINATORI + "/logincoordinatore", body)
    }

    static recuperoPassword(email: string){
        return ServerCall.post(API_URL_REGISTRO_COORDINATORI + "/recuperocoordinatori", { email })
    }

    static cambioPassword(body: any){
        return ServerCall.post(API_URL_REGISTRO_COORDINATORI + "/cambiopassword", body)
    }
}