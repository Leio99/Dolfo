import { API_URL_REGISTRO_MATERIE } from "../commons/consts/costantiApi"
import { ComponentsPermissions } from "../comps/features/ComponentsPermissions"
import { ServerCall } from "./ServerCall"

export class MaterieService{
    static getMaterie(idCorso: string){
        if(!ComponentsPermissions.getLoginCoordinatore(false))
            return ServerCall.emptyCallResult()
		
        return ServerCall.get(API_URL_REGISTRO_MATERIE + "/getmateriebycorso/" + idCorso)
    }

    static addMateria(idCorso: string, nomeMateria: string){
        const login = ComponentsPermissions.getLoginCoordinatore(),
		params = {
            authCoordinatore: {
                idCoordinatore: login.idCoordinatore,
                password: login.password
            },
            materia: {
                nome: nomeMateria
            }
        }

        return ServerCall.post(API_URL_REGISTRO_MATERIE + "/" + idCorso, params)
    }

    static editMateria(idMateria: number, nomeMateria: string){
        const login = ComponentsPermissions.getLoginCoordinatore(),
		params = {
            authCoordinatore: {
                idCoordinatore: login.idCoordinatore,
                password: login.password
            },
            materia: {
                idMateria,
                nome: nomeMateria
            }
        }

        return ServerCall.put(API_URL_REGISTRO_MATERIE + "/" + idMateria, params)
    }
}