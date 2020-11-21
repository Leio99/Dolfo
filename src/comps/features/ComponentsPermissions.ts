import { history } from "../Navigator"
import { ComponentsPaths } from "./ComponentsPaths"

export class ComponentsPermissions{
    static checkPermissionCoordinatore = () => {
        const session = sessionStorage.getItem("sessionCoordinatore")

        if(!session) history.push(ComponentsPaths.PATH_COORDINATORI_LOGIN)
    }

    static checkLoginCoordinatore = () => {
        const session = sessionStorage.getItem("sessionCoordinatore")

        if(session) history.push(ComponentsPaths.PATH_COORDINATORI_HOME)
    }

    static checkEmptyPathCoordinatore = () => {
        const session = sessionStorage.getItem("sessionCoordinatore")

        if(session) history.push(ComponentsPaths.PATH_COORDINATORI_HOME)
        else history.push(ComponentsPaths.PATH_COORDINATORI_LOGIN)
    }
}