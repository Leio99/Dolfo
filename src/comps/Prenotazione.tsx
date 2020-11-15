import React from "react"
import { IBuilding } from "../models/IBuilding"
import { IDay } from "../models/IDay"
import { IRoom } from "../models/IRoom"
import { BuildingService } from "../services/BuildingService"
import { EventsService } from "../services/EventsService"
import { TextInput } from "./form/TextInput"
import { Calendar } from "./Calendar"
import { decodeMonth, zeroBefore } from "../commons/utility"
import Select from "./form/Select"
import { Option } from "./form/Option"
import TimePicker from "./form/TimePicker"
import { CheckIcon, CloseIcon, LoadingIcon } from "./layout/Icon"
import { Button } from "./layout/Button"
import { Dialog } from "./layout/Dialog"

export interface IProps { }
export interface IState {
    readonly clickIndex: number
    readonly buildings: IBuilding[]
    readonly roomId: number
    readonly rooms: IRoom[]
    readonly loadingBuildings: boolean
    readonly loadingRooms: boolean
    readonly events: IDay[]
    readonly sending: boolean
    readonly nominativo: string
    readonly date: string
    readonly startTime: string
    readonly endTime: string
}

export class Prenotazione extends React.PureComponent<IProps, IState>{
    constructor(props: IProps) {
        super(props)

        this.state = {
            clickIndex: null,
            buildings: null,
            roomId: -1,
            rooms: null,
            loadingBuildings: false,
            loadingRooms: false,
            events: null,
            sending: false,
            startTime: zeroBefore(new Date().getHours()) + ":" + zeroBefore(new Date().getMinutes()),
            endTime: zeroBefore(new Date().getHours()) + ":" + zeroBefore(new Date().getMinutes()),
            nominativo: "",
            date: ""
        }
    }

    componentDidMount = () => this.loadEvents()

    loadEvents = () => {
        EventsService.getAllEvents().then(response => {
            this.setState({
                events: response.data as IDay[]
            })
        })
    }

    selectDay = (clickIndex: number) => {
        this.setState({
            clickIndex,
            buildings: null,
            roomId: 0,
            loadingBuildings: true,
            rooms: null,
            date:  new Date().getFullYear() + "-" + zeroBefore(new Date().getMonth() + 1) + "-" + zeroBefore(clickIndex),
        })

        BuildingService.getAllBuildings().then(response => {
            this.setState({
                loadingBuildings: false,
                buildings: response.data as IBuilding[]
            }, clickIndex !== null ? this.scrollToPopup : null)
        })
    }

    scrollToPopup = () => {
        const popup = document.getElementById("form-container"),
        top = popup.offsetTop - 100

        window.scrollTo({ top, behavior: 'smooth' })
    }

    changeBuilding = (value: any) => {
        let buildingIndex = Number(value)

        this.setState({
            roomId: 0,
            loadingRooms: true,
            nominativo: "",
            startTime: zeroBefore(new Date().getHours()) + ":" + zeroBefore(new Date().getMinutes()),
            endTime: zeroBefore(new Date().getHours()) + ":" + zeroBefore(new Date().getMinutes()),
            rooms: null
        })

        BuildingService.getBuildingRooms(buildingIndex).then(response => {
            this.setState({
                loadingRooms: false,
                rooms: response.data as IRoom[]
            }, this.scrollToPopup)
        })
    }

    sendPrenotazione = () => {
        const state = this.state

        if(state.nominativo.trim() === ""){
            Dialog.infoDialog({ type: "error", content: "Inserisci un nominativo!" })
            return
        }

        this.toggleLoading()

        EventsService.postEvent({
            data: state.date,
            oraInizio: state.startTime,
            oraFine: state.endTime,
            nominativo: state.nominativo,
            idSpazio: state.roomId,
            idDipendente: 1
        }).then((result: any) => {
            if(result.data.type === "error"){
                Dialog.infoDialog({
                    type: "error",
                    content: result.data.message as string
                })
            }else if(result.data.type === "success"){
                Dialog.infoDialog({
                    type: "success",
                    content: "Prenotazione effettuata con successo."
                })

                this.loadEvents()
                this.toggleLoading()
            }
        }).catch((err: any) => {
            Dialog.infoDialog({
                type: "error",
                content: "C'è stato un errore!"
            })
            this.toggleLoading()
        })
    }

    toggleLoading = () => this.setState({ sending: !this.state.sending })

    setRoomId = (roomId: number) => this.setState({ roomId }, this.scrollToPopup)

    changeNominativo = (value: string) => this.setState({ nominativo: value })

    changeStartTime = (value: string) => this.setState({ startTime: value })

    changeEndTime = (value: string) => this.setState({ endTime: value })

    render = (): JSX.Element => {
        const {
            clickIndex,
            roomId,
            rooms,
            buildings,
            loadingRooms,
            loadingBuildings,
            startTime,
            endTime,
            sending,
            events,
        } = this.state,
        loading = <LoadingIcon style={{ fontSize: 60 }} spinning />

        return <div className="container-fluid p-4">
            <div className="row mx-0">
                <div className={"col-12" + (clickIndex ? " col-lg-6" : "") + " pr-lg-0"}>
                    <h3 className="col-12 text-center">Calendario prenotazioni</h3>

                    <Calendar events={events} clickOnDay={this.selectDay} />
                </div>

                <div id="form-container" className="col swipe-col ml-lg-4">
                    {
                        clickIndex && buildings && !loadingBuildings ? <div>
                            <h4>
                                <Button className="float-right ml-3 mb-3" onClick={() => this.selectDay(null)} textBtn>
                                    <CloseIcon />
                                </Button>
                                Effettua una prenotazione per il {clickIndex} {decodeMonth(new Date().getMonth())}
                        </h4>

                            <div className="form-group">
                                <Select onChange={this.changeBuilding} label="Edificio" icon={{ key: "building" }}>
                                    <Option value={0} label="---" />
                                    {
                                        buildings.map(b => {
                                            return <Option value={b.id} label={b.name} />
                                        })
                                    }
                                </Select>
                            </div>

                            {
                                !loadingRooms && rooms ? <div className="row mt-2" id="results-list">
                                    {
                                        rooms.map(room => {
                                            return <div className="col-6 col-md-4 p-1">
                                                <div className={"border rounded p-2 result" + (roomId === room.id ? " selected" : "")} onClick={() => this.setRoomId(room.id)}>
                                                    <h5>{room.name}</h5>
                                                    <p className="mb-0">Edificio: {room.edificio}</p>
                                                    <p className="mb-0">Piano: {room.piano}</p>
                                                    <p className="mb-0 text-truncate">{room.type === "ufficio" ? "Scrivanie" : "Persone massime"}: {room.maxPersone}</p>
                                                    <p className="mb-0 text-truncate">
                                                        Accessori: {room.accessori.length ? room.accessori.join(", ") : "Nessuno"}
                                                    </p>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div> : !rooms && loadingRooms ? <div className="text-center">
                                    {loading}
                                </div> : null
                            }

                            {
                                roomId !== 0 && <form id="compila-form">
                                    <div className="form-group row mx-0 mb-0">
                                        <div className="col pl-0">
                                            <TimePicker label="Orario inizio" onChange={this.changeStartTime} defaultValue={startTime} />
                                        </div>
                                        <div className="col pr-0">
                                            <TimePicker label="Orario fine" onChange={this.changeEndTime} defaultValue={endTime} />
                                        </div>
                                    </div>

                                    <TextInput label="Nominativo" onChange={this.changeNominativo} required />

                                    <Button bigBtn fullSize className="text-uppercase btn-green mt-2" loading={sending} onClick={this.sendPrenotazione}>
                                        {!sending && <CheckIcon />} Prenota
                                    </Button>
                                </form>
                            }
                        </div> : clickIndex ? <div className="text-center col swipe-col ml-lg-4">
                            {loading}
                        </div> : null
                    }
                </div>
            </div>
        </div>
    }
}
