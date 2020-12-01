import { ListaStudenti } from "./coordinatori/ListaStudenti"
import { TestLayout } from "../TestLayout"
import { IComponentList } from "../../models/IComponent"
import { ComponentsPaths } from "./ComponentsPaths"
import { ComponentsPermissions } from "./ComponentsPermissions"
import { LoginCoordinatore } from "./coordinatori/LoginCoordinatore"
import { HomeCoordinatore } from "./coordinatori/HomeCoordinatore"
import { AddStudente } from "./coordinatori/AddStudente"
import { ImportaStudenti } from "./coordinatori/ImportaStudenti"
import { history } from "../Navigator"
import { DettaglioStudente } from "./coordinatori/DettaglioStudente"

export const Components: IComponentList = {
    [ComponentsPaths.PATH_COORDINATORI]: {
        hideMenu: true,
        permission: ComponentsPermissions.checkEmptyPathCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI + "/"]: {
        hideMenu: true,
        permission: ComponentsPermissions.checkEmptyPathCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI_LOGIN]: {
        hideMenu: true,
        component: LoginCoordinatore,
        permission: ComponentsPermissions.checkLoginCoordinatore
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
    [ComponentsPaths.PATH_COORDINATORI_IMPORT_STUDENTI]: {
        component: ImportaStudenti,
        pageTitle: "Importa studenti",
        permission: ComponentsPermissions.checkPermissionCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI_DETAILS_STUDENTE]: {
        component: DettaglioStudente,
        pageTitle: "Dettaglio studente",
        permission: ComponentsPermissions.checkPermissionCoordinatore
    },
    [ComponentsPaths.SITE_BASE + "layout"]: {
        component: TestLayout,
        pageTitle: "Layout di test"
    },
    [ComponentsPaths.SITE_BASE]: {
        pageTitle: "Layout di test",
        permission: () => history.push(ComponentsPaths.SITE_BASE + "layout")
    }
}