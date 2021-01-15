import { Tabellable } from "./Tabellable"

export interface Presenza extends Tabellable{
    readonly id: number
    readonly idUtente: number
    readonly data: string
    readonly oraEntrata: string
    readonly oraUscita: string
    readonly lezione: string
    readonly confermata: boolean
    readonly rifiutata: boolean
    readonly tipoUtente: "S" | "D"
}