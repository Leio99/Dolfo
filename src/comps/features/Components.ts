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
import { DettaglioDocente } from "./coordinatori/DettaglioDocente"
import { ErrorPage } from "./ErrorPage"

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
        Component: LoginCoordinatore,
        permission: ComponentsPermissions.checkLoginCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI_HOME]: {
        Component: HomeCoordinatore,
        pageTitle: "Homepage",
        permission: ComponentsPermissions.checkPermissionCoordinatore
    },
    [ComponentsPaths.PATH_COORDINATORI_ADD_STUDENTE]: {
        Component: AddStudente,
        pageTitle: "Nuovo studente",
        permission: ComponentsPermissions.checkPermissionCoordinatore,
        parentKey: ComponentsPaths.PATH_COORDINATORI_LISTA_STUDENTI
    },
    [ComponentsPaths.PATH_COORDINATORI_LISTA_STUDENTI]: {
        Component: ListaStudenti,
        pageTitle: "Studenti del corso",
        permission: ComponentsPermissions.checkPermissionCoordinatore,
        parentKey: ComponentsPaths.PATH_COORDINATORI_HOME
    },
    [ComponentsPaths.PATH_COORDINATORI_IMPORT_STUDENTI]: {
        Component: ImportaStudenti,
        pageTitle: "Importa studenti",
        permission: ComponentsPermissions.checkPermissionCoordinatore,
        parentKey: ComponentsPaths.PATH_COORDINATORI_ADD_STUDENTE
    },
    [ComponentsPaths.PATH_COORDINATORI_DETAILS_STUDENTE]: {
        Component: DettaglioStudente,
        pageTitle: "Dettaglio studente",
        permission: ComponentsPermissions.checkPermissionCoordinatore,
        parentKey: ComponentsPaths.PATH_COORDINATORI_LISTA_STUDENTI
    },
    [ComponentsPaths.PATH_COORDINATORI_EDIT_STUDENTE]: {
        Component: EditStudente,
        pageTitle: "Modifica studente",
        permission: ComponentsPermissions.checkPermissionCoordinatore,
        parentKey: ComponentsPaths.PATH_COORDINATORI_LISTA_STUDENTI
    },
    [ComponentsPaths.PATH_COORDINATORI_LISTA_DOCENTI]: {
        Component: ListaDocenti,
        pageTitle: "Tutti i docenti",
        permission: ComponentsPermissions.checkPermissionCoordinatore,
        parentKey: ComponentsPaths.PATH_COORDINATORI_HOME
    },
    [ComponentsPaths.PATH_COORDINATORI_ADD_DOCENTE]: {
        Component: AddDocente,
        pageTitle: "Nuovo docente",
        permission: ComponentsPermissions.checkPermissionCoordinatore,
        parentKey: ComponentsPaths.PATH_COORDINATORI_LISTA_DOCENTI
    },
    [ComponentsPaths.PATH_COORDINATORI_EDIT_DOCENTE]: {
        Component: EditDocente,
        pageTitle: "Modifica docente",
        permission: ComponentsPermissions.checkPermissionCoordinatore,
        parentKey: ComponentsPaths.PATH_COORDINATORI_LISTA_DOCENTI
    },
    [ComponentsPaths.PATH_COORDINATORI_DETAILS_DOCENTE]: {
        Component: DettaglioDocente,
        pageTitle: "Dettaglio docente",
        permission: ComponentsPermissions.checkPermissionCoordinatore,
        parentKey: ComponentsPaths.PATH_COORDINATORI_LISTA_DOCENTI
    },
    [ComponentsPaths.PATH_COORDINATORI_LISTA_MATERIE]: {
        Component: ListaMaterie,
        pageTitle: "Materie del corso",
        permission: ComponentsPermissions.checkPermissionCoordinatore,
        parentKey: ComponentsPaths.PATH_COORDINATORI_HOME
    },
    [ComponentsPaths.SITE_BASE + "layout"]: {
        Component: TestLayout,
        pageTitle: "Layout di test"
    },
    [ComponentsPaths.SITE_BASE]: {
        pageTitle: "Layout di test",
        permission: () => goTo(ComponentsPaths.SITE_BASE + "layout")
    },
    [ComponentsPaths.ERROR_404_PATH]: {
        hideMenu: true,
        Component: ErrorPage
    }
}