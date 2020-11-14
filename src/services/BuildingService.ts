import Axios from "axios"
import { API_URL } from "../commons/consts/costantiApi"

export class BuildingService{
    static getAllBuildings(){
        return Axios.get(API_URL + "?buildings")
    }

    static getBuildingRooms(buildingIndex: number){
        return Axios.get(API_URL + "?rooms&building=" + buildingIndex)
    }
}