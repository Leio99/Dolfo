import React from "react"
import { CheckBox } from "./form/CheckBox"
import { Option } from "./form/Option"
import { RadioButton } from "./form/RadioButton"
import Select from "./form/Select"
import { TextInput } from "./form/TextInput"
import TimePicker from "./form/TimePicker"
import Button from "./layout/Button"
import { Dialog } from "./layout/Dialog"
import { CheckIcon, CloseIcon } from "./layout/Icon"
import { NotificationMsg } from "./layout/NotificationMsg"
import { MessageBox } from "./layout/MessageBox"
import { Switch } from "./form/Switch"
import { Tab } from "./layout/Tab"
import { Tabs } from "./layout/Tabs"
import { Accordion } from "./layout/Accordion"
import { Progress } from "./layout/Progress"
import { SlideShow } from "./layout/SlideShow"
import { Slide } from "./layout/Slide"
import DatePicker from "./form/DatePicker"

export interface IState{
    readonly visibleDialog: boolean
    readonly loading: boolean
    readonly checked: boolean
    readonly checkedSwitch: boolean
    readonly percent: number
}
export class TestLayout extends React.PureComponent<any, IState>{
    constructor(props: never){
        super(props)

        this.state = {
            visibleDialog: false,
            loading: false,
            checked: false,
            checkedSwitch: false,
            percent: 0
        }
    }

    componentDidMount = () => {
        let percent = this.state.percent,
        interval = setInterval(() => {
            if(percent === 100)
                clearInterval(interval)
            else{
                percent += 1

                this.setState({ percent: percent })
            }
        }, 100)
    }

    toggleDialog = () => this.setState({ visibleDialog: !this.state.visibleDialog })

    toggleSwitch = () => {
        this.setState({
            checkedSwitch: !this.state.checkedSwitch,
            loading: true
        })

        setTimeout(() => this.setState({ loading: false }), 2000)
    }

    check = () => this.setState({ checked: !this.state.checked })

    render = () => {
        const {
            loading,
            checkedSwitch,
            checked,
            percent,
            visibleDialog,
        } = this.state

        return <div className="p-5">
            <div style={{ marginTop: 15 }}>
                <Tabs>
                <Tab title="Buttons">
                        <Button btnColor="red" className="mr-2">Red</Button>
                        <Button btnColor="blue" className="mr-2">Blue</Button>
                        <Button btnColor="green" className="mr-2">Green</Button>
                        <Button btnColor="orange" className="mr-2">Orange</Button>
                        <Button btnColor="black" className="mr-2">Black</Button>
                        <Button btnColor="grey" className="mr-2">Grey</Button>
                        <Button btnColor="white">White</Button>
                        <div className="mb-2"></div>
                        <Button btnColor="red" textBtn className="mr-2">Text button</Button>
                        <Button btnColor="blue" textBtn className="mr-2"><CloseIcon /> Text button with icon</Button>
                        <Button btnColor="blue" smallBtn className="mr-2">Small button</Button>
                        <Button btnColor="blue" className="mr-2"><CheckIcon /> Button with icon</Button>
                        <Button btnColor="blue" loading className="mr-2">Loading</Button>
                        <Button btnColor="blue" bigBtn>Big button</Button>

                        <Button fullSize btnColor="blue" className="mt-2">Full size button</Button>

                        <Button fullSize btnColor="red" className="mt-2 mr-2" type="popup" options={[
                            { text: "First option", onClick: () => alert("Cliccato") },
                            { text: "Second option", onClick: () => console.log("cliccato 2") }
                        ]}>
                            Popup button
                        </Button>

                        <Button fullSize btnColor="blue" className="mt-2" type="popup" options={[
                            { text: "First option", onClick: () => alert("Cliccato") },
                            { text: "Second option", onClick: () => console.log("cliccato 2") }
                        ]} popupPosition="bottom">
                            Popup button
                        </Button>
                    </Tab>

                    <Tab title="Notifications">
                        <Button onClick={() => {
                            NotificationMsg.show({
                                message: "In alto!"
                            })
                        }} btnColor="green" smallBtn className="mr-2">
                            Basic notification
                        </Button>
                        <Button onClick={() => {
                            NotificationMsg.show({
                                message: "In alto a destra!",
                                position: "top-right"
                            })
                        }} btnColor="green" smallBtn className="mr-2">
                            Top Right
                        </Button>
                        <Button onClick={() => {
                            NotificationMsg.show({
                                message: "In alto a sinistra!",
                                position: "top-left"
                            })
                        }} btnColor="green" smallBtn className="mr-2">
                            Top Left
                        </Button>
                        <Button onClick={() => {
                            NotificationMsg.show({
                                message: "In basso a destra!",
                                position: "bottom-right"
                            })
                        }} btnColor="green" smallBtn className="mr-2">
                            Bottom Right
                        </Button>
                        <Button onClick={() => {
                            NotificationMsg.show({
                                message: "In basso a sinistra!",
                                position: "bottom-left"
                            })
                        }} btnColor="green" smallBtn className="mr-2">
                            Bottom left
                        </Button>
                        <Button onClick={() => {
                            NotificationMsg.show({
                                message: "In basso al centro!",
                                position: "centered-bottom"
                            })
                        }} btnColor="green" smallBtn className="mr-2">
                            Bottom center
                        </Button>
                        <Button onClick={() => {
                            let not = NotificationMsg.showLoading("Caricamento...")

                            setTimeout(() => {
                                not.close()
                            }, 2000)
                        }} btnColor="green" smallBtn className="mr-2">
                            Loading
                        </Button>
                        <Button onClick={() => {
                            NotificationMsg.showSuccess("Success!")
                        }} btnColor="green" smallBtn className="mr-2">
                            Success
                        </Button>
                        <Button onClick={() => {
                            NotificationMsg.showError("Error!")
                        }} btnColor="red" smallBtn className="mr-2">
                            Error
                        </Button>
                        <Button onClick={() => {
                            NotificationMsg.showInfo("Information!")
                        }} btnColor="blue" smallBtn className="mr-2">
                            Info
                        </Button>
                        <Button onClick={() => {
                            NotificationMsg.showWarning("Warning!")
                        }} btnColor="orange" smallBtn className="mr-2">
                            Warning
                        </Button>
                    </Tab>

                    <Tab title="Forms">
                        <Tabs direction="vertical">
                            <Tab title="Text inputs">
                                <TextInput label="Simple" />
                                <TextInput label="Password" password />
                                <TextInput label="Password toggle" password togglePassword />
                                <TextInput label="E-mail" email />
                                <TextInput label="Number" number />
                                <TextInput label="Textarea expandable" isTextarea expandTextarea />
                            </Tab>
                            
                            <Tab title="Select">
                                <Select label="Select">
                                    {
                                        [1,2,3].map(o => {
                                            return <Option value={o} label={"Opzione " + o} />
                                        })
                                    }
                                </Select>
                                <Select label="Multi-select" multiple>
                                    {
                                        [1,2,3].map(o => {
                                            return <Option value={o} label={"Opzione " + o} />
                                        })
                                    }
                                </Select>
                            </Tab>

                            <Tab title="Pickers">
                                <DatePicker label="Datepicker" />
                                <TimePicker label="Timepicker" />
                            </Tab>

                            <Tab title="Checks" style={{ paddingLeft: 10 }}>
                                <CheckBox label="I'm a checkbox" className="mr-2" checked={checked} onChange={this.check} />
                                <RadioButton controlName="options">
                                    <Option value={0} label="First option" />
                                    <Option value={2} label="Second option" />
                                </RadioButton>

                                <Switch label="I'm a switch" onChange={this.toggleSwitch} checked={checkedSwitch} loading={loading} />
                            </Tab>
                        </Tabs>
                    </Tab>

                    <Tab title="Dialog">
                        <Button btnColor="black" onClick={() => {
                            Dialog.openDialog({
                                title: "Simple dialog",
                                content: "This is a simple dialog."
                            })
                        }} className="mr-2">Basic dialog</Button>

                        <Button onClick={() => {
                            Dialog.yesNoDialog(
                                "Warning",
                                "Do you confirm your decision?",
                                () => alert("Si")
                            )
                        }} btnColor="grey" className="mr-2">Yes/No dialog</Button>

                        <Button onClick={() => {
                            Dialog.infoDialog({
                                title: "Information!",
                                content: "This is an info dialog.",
                                type: "info"
                            })
                        }} btnColor="blue" className="mr-2">Info dialog</Button>

                        <Button onClick={() => {
                            Dialog.infoDialog({
                                title: "Error!",
                                content: "An error has occurred.",
                                type: "error"
                            })
                        }} btnColor="red" className="mr-2">Error dialog</Button>

                        <Button onClick={() => {
                            Dialog.infoDialog({
                                title: "Success!",
                                content: "Settings saved successfully.",
                                type: "success"
                            })
                        }} btnColor="green" className="mr-2">Success dialog</Button>
                        
                        <Button onClick={() => {
                            Dialog.infoDialog({
                                title: "Warning!",
                                content: "Deprecated method.",
                                type: "warning"
                            })
                        }} btnColor="orange" className="mr-2">Warning dialog</Button>

                        <Button onClick={() => {
                            Dialog.openDialog({
                                title: "I'm large!",
                                content: "This is a large dialog.",
                                width: "70%"
                            })
                        }} btnColor="black" className="mr-2">Extended dialog</Button>

                        <Button onClick={() => {
                            Dialog.openDialog({
                                title: "Click on mask to close",
                                content: "The mask is the transparent-black part outside the dialog.",
                                clickOutside: true
                            })
                        }} btnColor="blue" className="mr-2">Close on mask click</Button>

                        <Button onClick={() => {
                            let dialog = Dialog.loadingDialog("Caricamento...")

                            setTimeout(() => dialog.close(), 2000)
                        }} btnColor="blue" className="mr-2">Loading dialog</Button>

                        <Button onClick={this.toggleDialog} btnColor="blue" className="mr-2">Dialog with form</Button>

                        <Dialog title="I'm a form dialog" visible={visibleDialog} customFooter={[
                            <Button btnColor="red" smallBtn textBtn onClick={this.toggleDialog}>Cancel</Button>,
                            <Button btnColor="green" loading={loading} smallBtn onClick={this.toggleSwitch}>Complete</Button>
                        ]} onClose={this.toggleDialog}>
                            <form>
                                <TextInput label="Username" icon={{ type: "fa", key: "user" }} />
                                <TextInput password label="Password" />
                                <TextInput email label="E-mail" />
                                <DatePicker label="Date of birth" />
                                <RadioButton controlName="gender">
                                    <Option value="M" label="Male" />
                                    <Option value="F" label="Female" />
                                </RadioButton>

                                <CheckBox label="I accept the Terms of Service" />
                            </form>
                        </Dialog>
                    </Tab>

                    <Tab title="Accordion">
                        <Accordion title="First">
                            Hello, I am the first accordion
                        </Accordion>
                        <Accordion title="Second">
                            Hello, I am the second accordion
                        </Accordion>
                    </Tab>

                    <Tab title="Progress">
                        <Progress percent={60} color="red" />
                        <Progress percent={percent} color="blue" loading={percent !== 100} loadingText="Loading..." />
                        <Progress percent={80} circular color="orange" />
                    </Tab>

                    <Tab title="Slideshow">
                        <SlideShow automatic>
                            <Slide imageUrl="https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero.jpg"></Slide>
                            <Slide>
                                <h1>Sono la seconda slide</h1>
                                Ciaooo
                            </Slide>
                            <Slide imageUrl="https://blog.prezi.com/wp-content/uploads/2019/03/jason-leung-479251-unsplash.jpg">
                                <h1>Sono la terza</h1>
                            </Slide>
                        </SlideShow>
                    </Tab>

                    <Tab title="Messages">
                        <Button onClick={() => {
                            MessageBox.show({
                                title: "Message",
                                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis asperiores rerum velit aspernatur? Tempore, voluptas a quasi qui est repellat quod similique veritatis fuga eius explicabo nostrum adipisci, autem iusto?",
                                position: "bottom-left",
                                hideDelay: 4000
                            })
                        }} btnColor="green" smallBtn className="mr-2">
                            Basic message
                        </Button>
                    </Tab>
                </Tabs>
            </div>
        </div>
    }
}