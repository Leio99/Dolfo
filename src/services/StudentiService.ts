import Axios from "axios"
import { API_URL_REGISTRO } from "../commons/consts/costantiApi"

export class StudentiService{
    static getStudentiCorso(idCorso: number){
        return Axios.get(API_URL_REGISTRO + "/studenti/" + idCorso)
    }
}