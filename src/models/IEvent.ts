import { IBuilding } from "./IBuilding";
import { IRoom } from "./IRoom";

export interface IEvent{
    readonly eventId: number
    readonly name: string
    readonly startTime: string
    readonly endTime: string
    readonly user: string
    readonly location: IBuilding
    readonly space: IRoom
}