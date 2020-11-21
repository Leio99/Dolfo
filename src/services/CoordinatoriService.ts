import Axios from "axios"
import { API_URL_REGISTRO } from "../commons/consts/costantiApi"

export class CoordinatoriService{
    static tryLogin(body: any){
        return Axios.post(API_URL_REGISTRO + "/coordinatori/logincoordinatore", body)
    }

    static recuperoPassword(email: string){
        return Axios.post(API_URL_REGISTRO + "/coordinatori/recuperocoordinatori", { email })
    }

    static cambioPassword(body: any){
        return Axios.post(API_URL_REGISTRO + "/coordinatori/cambiopassword", body)
    }
}