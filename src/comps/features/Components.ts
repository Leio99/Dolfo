import { ListaStudenti } from "./coordinatori/ListaStudenti"
import { TestLayout } from "../TestLayout"
import { IComponentList } from "../../models/IComponent"
import { ComponentsPaths } from "./ComponentsPaths"
import { ComponentsPermissions } from "./ComponentsPermissions"
import { LoginCoordinatore } from "./coordinatori/LoginCoordinatore"
import { HomeCoordinatore } from "./coordinatori/HomeCoordinatore"
import { AddStudente } from "./coordinatori/AddStudente"

export const Components: IComponentList = {
    [ComponentsPaths.PATH_COORDINATORI]: {
        component: null,
        pageTitle: null,
        hideMenu: true,
        permission: ComponentsPermissions.checkEmptyPathCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI + "/"]: {
        component: null,
        pageTitle: null,
        hideMenu: true,
        permission: ComponentsPermissions.checkEmptyPathCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI_LOGIN]: {
        component: LoginCoordinatore,
        pageTitle: null,
        permission: ComponentsPermissions.checkLoginCoordinatore,
        hideMenu: true
    },
    [ComponentsPaths.PATH_COORDINATORI_HOME]: {
        component: HomeCoordinatore,
        pageTitle: "Homepage",
        permission: ComponentsPermissions.checkPermissionCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI_ADD_STUDENTE]: {
        component: AddStudente,
        pageTitle: "Nuovo studente",
        permission: ComponentsPermissions.checkPermissionCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI_LISTA_STUDENTI]: {
        component: ListaStudenti,
        pageTitle: "Studenti del corso",
        permission: ComponentsPermissions.checkPermissionCoordinatore
    },
    "/layout": {
        component: TestLayout,
        pageTitle: "Layout di test"
    }
}