import { goTo } from "../../commons/utility"
import { ComponentsPaths } from "./ComponentsPaths"

export class ComponentsPermissions{
    static checkPermissionCoordinatore = () => {
        const session = ComponentsPermissions.getLoginCoordinatore(false)

        if(!session) setTimeout(() => goTo(ComponentsPaths.PATH_COORDINATORI_LOGIN))
    }

    static checkLoginCoordinatore = () => {
        const session = ComponentsPermissions.getLoginCoordinatore(false)

        if(session) setTimeout(() => goTo(ComponentsPaths.PATH_COORDINATORI_HOME))
    }

    static checkEmptyPathCoordinatore = () => {
        const session = ComponentsPermissions.getLoginCoordinatore(false)

        if(session) setTimeout(() => goTo(ComponentsPaths.PATH_COORDINATORI_HOME))
        else setTimeout(() => goTo(ComponentsPaths.PATH_COORDINATORI_LOGIN))
    }

    static getLoginCoordinatore = (nullable = true) => {
        if(nullable)
            return JSON.parse(sessionStorage.getItem("sessionCoordinatore")) || {}

        return JSON.parse(sessionStorage.getItem("sessionCoordinatore"))
    }
}