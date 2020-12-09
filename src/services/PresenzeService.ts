import { API_URL_REGISTRO, API_URL_REGISTRO_PRESENZE, API_URL_REGISTRO_PRESENZE_DOCENTE, API_URL_REGISTRO_STUDENTI } from "../commons/consts/costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"

export class PresenzeService{
    static getPresenzeStudente(id: number){
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getdetailedpresences/" + id)
    }

    static getPresenzeDocente(idDocente: number, idCorso: number){
        return ServerCall.get(API_URL_REGISTRO + "/lezioni/getlezionidocente/" + idDocente + "/" + idCorso)
    }

    static editPresenza(id: number, body: any){
        const login = ComponentsPermissions.getLoginCoordinatore(),
		params = {
            authCoordinatore: {
                idCoordinatore: login.idCoordinatore,
                password: login.password
            },
            ...body
        }

        return ServerCall.put(API_URL_REGISTRO_PRESENZE + "/" + id, params)
    }

    static getPresenzeDaConfermare(){
        if(!ComponentsPermissions.getLoginCoordinatore(false))
            return ServerCall.emptyCallResult()
            
        return ServerCall.get("http://mygraphic.altervista.org/esame/?presenze")
    }

    static confermaPresenza(idPresenza: number){
        return ServerCall.put("http://mygraphic.altervista.org/esame/?presenze&conferma", { idPresenza })
    }

    static confermaPresenze(idPresenze: number[]){
        return ServerCall.put("http://mygraphic.altervista.org/esame/?presenze&confermaAll", { idPresenze })
    }

    static rifiutaPresenza(idPresenza: number){
        return ServerCall.put("http://mygraphic.altervista.org/esame/?presenze&rifiuta", { idPresenza })
    }
}