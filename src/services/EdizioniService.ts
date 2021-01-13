import { API_URL_REGISTRO_EDIZIONI } from "../commons/consts/costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"

export class EdizioniService{
    static getByGestore(idGestore: number){            
        return ServerCall.get(API_URL_REGISTRO_EDIZIONI + "/getByGestore/" + idGestore)
    }

    static addEdizione(idGestore: number, body: any){
		if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()

        return ServerCall.post(API_URL_REGISTRO_EDIZIONI + "/addEdizione/" + idGestore, body)
    }

    static editEdizione(idEdizione: number, body: any){
		if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()

        return ServerCall.put(API_URL_REGISTRO_EDIZIONI + "/editEdizione/" + idEdizione, body)
    }

    static switchStage(idGestore: number){
		if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()

        return ServerCall.put(API_URL_REGISTRO_EDIZIONI + "/switchStage/" + idGestore, {})
    }

    static cambiaStatoStage(idGestore: number){
		if(!ComponentsPermissions.getLoginGestore(false))
            return ServerCall.emptyCallResult()

        return ServerCall.put(API_URL_REGISTRO_EDIZIONI + "/switchStageValue/" + idGestore, {})
    }
}