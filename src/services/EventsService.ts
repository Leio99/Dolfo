import Axios from "axios"
import { API_URL } from "../commons/consts/costantiApi"

export class EventsService{
    static getAllEvents(){
        return Axios.get(API_URL + "?events")
    }

    static postEvent(body: any){
        return Axios.post(API_URL + "?events&new", body)
    }
}