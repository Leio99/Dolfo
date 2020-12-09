import { API_URL_REGISTRO, API_URL_REGISTRO_PRESENZE, API_URL_REGISTRO_STUDENTI, API_URL_REGISTRO_PRESENZE_DOCENTE } from "../commons/consts/costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"

export class PresenzeService{
    static getPresenzeStudente(id: number){
        return ServerCall.get(API_URL_REGISTRO_STUDENTI + "/getdetailedpresences/" + id)
    }

    static getPresenzeDocente(idDocente: number, idCorso: number){
        return ServerCall.get(API_URL_REGISTRO + "/lezioni/getlezionidocente/" + idDocente + "/" + idCorso)
    }

    static editPresenza(id: number, body: any, isDocente: boolean){
        const login = ComponentsPermissions.getLoginCoordinatore(),
		params = {
            authCoordinatore: {
                idCoordinatore: login.idCoordinatore,
                password: login.password
            },
            ...body
        },
        url = isDocente ? API_URL_REGISTRO_PRESENZE_DOCENTE : API_URL_REGISTRO_PRESENZE

        return ServerCall.put(url + "/" + id, params)
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