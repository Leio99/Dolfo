import { goTo } from "../../commons/utility"
import { ComponentsPaths } from "./ComponentsPaths"
import { SessionGestore } from "../../models/SessionGestore"

export class ComponentsPermissions{
    static checkPermissionGestore = () => {
        const session = ComponentsPermissions.getLoginGestore(false)

        if(!session) setTimeout(() => goTo(ComponentsPaths.PATH_GESTORI_LOGIN))
    }

    static checkLoginGestore = () => {
        const session = ComponentsPermissions.getLoginGestore(false)

        if(session) setTimeout(() => goTo(ComponentsPaths.PATH_GESTORI_HOME))
    }

    static checkEmptyPathGestore = () => {
        const session = ComponentsPermissions.getLoginGestore(false)

        if(session) setTimeout(() => goTo(ComponentsPaths.PATH_GESTORI_HOME))
        else setTimeout(() => goTo(ComponentsPaths.PATH_GESTORI_LOGIN))
    }

    static getLoginGestore = (nullable = true): SessionGestore => {
        if(nullable)
            return JSON.parse(sessionStorage.getItem("sessionGestore")) || {}

        return JSON.parse(sessionStorage.getItem("sessionGestore"))
    }

    static destroySessionGestore = () => {
        sessionStorage.removeItem("sessionGestore")
        ComponentsPermissions.checkPermissionGestore()
    }
}