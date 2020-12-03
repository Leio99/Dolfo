export class ComponentsPaths{
    static SITE_BASE = "/"
    static PATH_COORDINATORI = ComponentsPaths.SITE_BASE + "coordinatori"
    static PATH_COORDINATORI_LOGIN = ComponentsPaths.PATH_COORDINATORI + "/login"
    static PATH_COORDINATORI_HOME = ComponentsPaths.PATH_COORDINATORI + "/home"
    static PATH_COORDINATORI_LISTA_STUDENTI = ComponentsPaths.PATH_COORDINATORI + "/studenti"
    static PATH_COORDINATORI_ADD_STUDENTE = ComponentsPaths.PATH_COORDINATORI + "/studenti/new"
    static PATH_COORDINATORI_EDIT_BASE = ComponentsPaths.PATH_COORDINATORI + "/studenti/edit"
    static PATH_COORDINATORI_EDIT_STUDENTE = ComponentsPaths.PATH_COORDINATORI_EDIT_BASE + "/:id"
    static PATH_COORDINATORI_DETAILS_STUDENTE = ComponentsPaths.PATH_COORDINATORI + "/studenti/:id"
    static PATH_COORDINATORI_IMPORT_STUDENTI = ComponentsPaths.PATH_COORDINATORI + "/studenti/import"
    static PATH_COORDINATORI_LISTA_MATERIE = ComponentsPaths.PATH_COORDINATORI + "/materie"
}