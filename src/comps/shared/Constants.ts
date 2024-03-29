export const Constants = {
    CANCEL_TEXT: "Annulla",
    OK_TEXT: "Ok",
    CONFIRM_TEXT: "Conferma",
    BACK_TEXT: "Indietro",
    BACK_TO_LIST: "Indietro",
    OPEN_DETAIL: "Dettaglio",
    INFO_TEXT: "Info",
    CLOSE_TEXT: "Chiudi",
    WARNING_TEXT: "Attenzione",
    ERROR_TEXT: "Errore",
    SUCCESS_TEXT: "Complimenti",
    CONFIRM_TITLE: "Attenzione",
    YES_TEXT: "Sì",
    NO_TEXT: "No",
    LOADING_TEXT: "Caricamento...",
    SEARCH_PLACEHOLDER: "Cerca",
    FILTER_TEXT: "Filtra",
    RESET_INPUT_TEXT: "Pulisci",
    SHOW_PASSWORD_TEXT: "Mostra",
    HIDE_PASSWORD_TEXT: "Nascondi",
    INCREASE_TEXT: "Aumenta",
    DECREASE_TEXT: "Riduci",
    PREV_TEXT: "Precedente",
    NEXT_TEXT: "Successivo",
    CHANGE_MONTH: "Cambia mese",
    CHANGE_YEAR: "Cambia anno",
    UPLOAD_FILE_LABEL: "Carica un file",
    UPLOAD_FILE_DROP_LABEL: "Carica o trascina un file",
    UPLOAD_FILE_ERROR_NOT_MULTIPLE: "Puoi caricare soltanto un file!",
    SELECTED_FILES_LABEL: "File selezionati:",
    UPLOAD_FILE_NOT_ACCEPTABLE: "Non puoi caricare questo tipo di file!",
    REQUIRED_FIELD: "Obbligatorio",
    NAVIGATE_BREADCRUMB: "Naviga",
    EXPORT_CSV_TEXT: "Esporta CSV",
    EXPORT_PDF_TEXT: "Esporta PDF",
    ORDER_COLUMNS: "Ordina per",
    CALENDAR_PREVIOUS_MONTH: "Mese precedente",
    CALENDAR_NEXT_MONTH: "Mese successivo",
    WEEK_DAYS: ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
    MONTHS: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
    EVENT_DETAIL_TOOLTIP: "Dettagli",
    CALENDAR_PIN_TODAY: "Oggi",
    CALENDAR_ERROR_UNABLE_TO_GET_EVENTS: "Non è stato possibile recuperare gli eventi del calendario.",
    CALENDAR_SELECT_CURRENT: "Mese e anno corrente",
    CALENDAR_SET_TEXT: "Imposta",
    CALENDAR_CHANGE_DATE: "Cambia data",
    CALENDAR_CHANGE: "Cambia",
    MONTH_NO_EVENTS: "Non ci sono eventi per questo mese.",
    SWIPE_ERROR_ONLY_TWO: "Devono esserci solo due Swipes (master e detail).",
    TREE_EXPAND_ALL_NODE: "Espandi nodo",
    TREE_COLLAPSE_ALL_NODE: "Collassa nodo",
    TREE_EXPAND_ALL_NODES: "Espandi tutti",
    TREE_COLLAPSE_ALL_NODES: "Collassa tutti",
    TREE_OPEN_NODE: "Apri nodo",
    TREE_CLOSE_NODE: "Chiudi nodo",
    TREE_TABLE_DESCRIPTION_LABEL: "Descrizione",
    TREE_TABLE_ACTIONS_LABEL: "Azioni",
    TABLE_NO_RESULTS: "Nessun risultato",
    EXPAND_TEXT: "Espandi",
    COLLAPSE_TEXT: "Collassa",
    COPIED_TO_CLIPBOARD: "Copiato negli appunti!",
    SWITCH_TO_CARD_LAYOUT: "Mostra come scheda",
    SWITCH_TO_GRID_LAYOUT: "Mostra come griglia",
    TRANSFER_FILTER_TEXT: "Filtra lista",
    TRANSFER_TEXT: "Sposta",
    TRANSFER_ALL_TEXT: "Sposta tutti",
    TRANSFER_NO_ITEMS: "Nessun elemento",
    AUTOCOMPLETE_EXLUDE_KEYS: ["Alt", "Control", "Tab", "Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Shift","CapsLock", "ContextMenu", "Meta", "Escape"],
    COLUMN_ORDER: "Ordina",
    ORDER_ASCENDING: "Ascendente",
    ORDER_DESCENDING: "Discendente",
    STRING_NOT_DEFINED_OPTION: "Opzione non definita",
    PAGINATION_FIRST_PAGE: "Prima pagina",
    PAGINATION_PAGE: "Pagina",
    PAGINATION_PAGES: "Pagine",
    PAGINATION_LAST_PAGE: "Ultima pagina"
}

/** Function used to get a global constant
 * @type Function
 * @param key The key of the constant to get
 * @returns string (constant value)
 */
export const getConstant = (key: keyof typeof Constants) => {
    const findConfig = (window as any).DOLFO_LANGUAGE_CONFIG

    return findConfig?.[key] || Constants[key]
}