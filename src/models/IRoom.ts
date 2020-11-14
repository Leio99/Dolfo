export interface IRoom{
    readonly id: number
    readonly type: "sala" | "ufficio"
    readonly name: string
    readonly edificio: number
    readonly piano: number
    readonly maxPersone: number
    readonly accessori: string[]
}