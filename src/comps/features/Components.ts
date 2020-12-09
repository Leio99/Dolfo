import { ListaStudenti } from "./coordinatori/ListaStudenti"
import { TestLayout } from "../TestLayout"
import { IComponentList } from "../../models/IComponent"
import { ComponentsPaths } from "./ComponentsPaths"
import { ComponentsPermissions } from "./ComponentsPermissions"
import { LoginCoordinatore } from "./coordinatori/LoginCoordinatore"
import { HomeCoordinatore } from "./coordinatori/HomeCoordinatore"
import { AddStudente } from "./coordinatori/AddStudente"
import { EditStudente } from "./coordinatori/EditStudente"
import { ImportaStudenti } from "./coordinatori/ImportaStudenti"
import { DettaglioStudente } from "./coordinatori/DettaglioStudente"
import { ListaMaterie } from "./coordinatori/ListaMaterie"
import { goTo } from "../../commons/utility"
import { AddDocente } from "./coordinatori/AddDocente"
import { ListaDocenti } from "./coordinatori/ListaDocenti"
import { EditDocente } from "./coordinatori/EditDocente"

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
    [ComponentsPaths.PATH_COORDINATORI_EDIT_STUDENTE]: {
        component: EditStudente,
        pageTitle: "Modifica studente",
        permission: ComponentsPermissions.checkPermissionCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI_LISTA_DOCENTI]: {
        component: ListaDocenti,
        pageTitle: "Tutti i docenti",
        permission: ComponentsPermissions.checkPermissionCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI_ADD_DOCENTE]: {
        component: AddDocente,
        pageTitle: "Nuovo docente",
        permission: ComponentsPermissions.checkPermissionCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI_EDIT_DOCENTE]: {
        component: EditDocente,
        pageTitle: "Modifica docente",
        permission: ComponentsPermissions.checkPermissionCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI_LISTA_MATERIE]: {
        component: ListaMaterie,
        pageTitle: "Materie del corso",
        permission: ComponentsPermissions.checkPermissionCoordinatore
    },
    [ComponentsPaths.SITE_BASE + "layout"]: {
        component: TestLayout,
        pageTitle: "Layout di test"
    },
    [ComponentsPaths.SITE_BASE]: {
        pageTitle: "Layout di test",
        permission: () => goTo(ComponentsPaths.SITE_BASE + "layout")
    }
}