import { Tabellable } from "./Tabellable";

export interface PresenzaStage extends Tabellable{
    readonly id: number
    readonly idStudente: number
    readonly data: string
    readonly oraInizio: string
    readonly oraFine: string
    readonly descrizione: string
    readonly totaleRelativo: number | string
}