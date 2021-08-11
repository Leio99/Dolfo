import React from "react"
import { CheckBox } from "./form/CheckBox"
import { Option } from "./form/Option"
import { RadioButton } from "./form/RadioButton"
import Select from "./form/Select"
import { TextInput } from "./form/TextInput"
import TimePicker from "./form/TimePicker"
import Button from "./layout/Button"
import { Dialog } from "./layout/Dialog"
import { CheckCircleIcon, CheckIcon, CloseIcon } from "./layout/Icon"
import { NotificationMsg } from "./layout/NotificationMsg"
import { MessageBox } from "./layout/MessageBox"
import { Switch } from "./form/Switch"
import { Tabs, Tab } from "./layout/Tabs"
import { Accordion } from "./layout/Accordion"
import { Progress } from "./layout/Progress"
import { SlideShow, Slide } from "./layout/SlideShow"
import DatePicker from "./form/DatePicker"
import { Icon } from "./layout/Icon"
import { SideMenu, MenuItem, SubMenu } from "./layout/SideMenu"
import { Stepper, Step } from "./layout/Stepper"
import { Uploader } from "./form/Uploader"
import { initializeTooltips } from "./layout/Tooltip"
import { TestTree } from "./TestTree"
import { Status } from "./layout/Status"
import { Table } from "./layout/Table"
import { Timeline, TimelineItem } from "./layout/Timeline"
import { TestMD } from "./TestMD"
import { Card, CardActions } from "./layout/Card"
import { BreadCrumb, BreadCrumbItem } from "./layout/BreadCrumb"
import { Alert } from "./layout/Alert"

interface IState{
    readonly visibleDialog: boolean
    readonly loading: boolean
    readonly checked: boolean
    readonly checkedSwitch: boolean
    readonly percent: number
    readonly showMenu: boolean
    readonly currentStep: number
}

export class TestLayout extends React.PureComponent<any, IState>{
    constructor(){
        super(undefined)

        this.state = {
            visibleDialog: false,
            loading: false,
            checked: false,
            checkedSwitch: false,
            percent: 0,
            showMenu: false,
            currentStep: 0
        }
    }

    componentDidMount = (): void => {
        initializeTooltips()
        
        let percent = this.state.percent

        const interval = setInterval(() => {
            if(percent === 100)
                clearInterval(interval)
            else{
                percent++

                this.setState({ percent: percent })
            }
        }, 100)
    }

    toggleDialog = (): void => this.setState({ visibleDialog: !this.state.visibleDialog })

    toggleSwitch = (): void => {
        this.setState({
            checkedSwitch: !this.state.checkedSwitch,
            loading: true
        })

        setTimeout(() => this.setState({ loading: false }), 2000)
    }

    check = (): void => this.setState({ checked: !this.state.checked })

    toggleMenu = (): void => this.setState({ showMenu: !this.state.showMenu })

    nextStep = (): void => {
        this.setState({
            loading: true
        })

        setTimeout(() => this.setState({ 
            currentStep: this.state.currentStep + 1,
            loading: false 
        }), 2000)
    }

    render = (): JSX.Element => {
        const {
            loading,
            checkedSwitch,
            checked,
            percent,
            visibleDialog,
            showMenu,
            currentStep
        } = this.state

        return <div style={{ marginTop: 15, padding: 50 }}>
            <Tabs>
                <Tab title={<span>
                    <Icon iconKey="mouse-pointer" type="far" /> Buttons
                </span>} style={{ height: "80vh" }}>
                    <Button btnColor="red" className="mr-2">Red</Button>
                    <Button btnColor="blue" className="mr-2">Blue</Button>
                    <Button btnColor="darkblue" className="mr-2">Dark Blue</Button>
                    <Button btnColor="green" className="mr-2">Green</Button>
                    <Button btnColor="orange" className="mr-2">Orange</Button>
                    <Button btnColor="black" className="mr-2">Black</Button>
                    <Button btnColor="grey" className="mr-2">Grey</Button>
                    <Button btnColor="white">White</Button>
                    <div className="mb-2"></div>
                    <Button btnColor="red" textBtn className="mr-2">Text button</Button>
                    <Button btnColor="darkblue" textBtn className="mr-2"><CloseIcon /> Text button with icon</Button>
                    <Button btnColor="darkblue" smallBtn className="mr-2">Small button</Button>
                    <Button btnColor="darkblue" className="mr-2"><CheckIcon /> Button with icon</Button>
                    <Button btnColor="darkblue" loading className="mr-2">Loading</Button>
                    <Button btnColor="darkblue" bigBtn>Big button</Button>

                    <Button fullSize btnColor="darkblue" className="mt-2">Full size button</Button>

                    <Button fullSize btnColor="red" className="mt-2 mr-2" type="popup" options={[
                        { text: "First option", onClick: () => alert("Cliccato") },
                        { text: "Second option", onClick: () => console.log("cliccato 2") }
                    ]} popupPosition="top">
                        Popup button
                    </Button>

                    <Button fullSize btnColor="darkblue" className="mt-2 mr-2" type="popup" options={[
                        { text: <span>
                            <Icon iconKey="magic" color="var(--darkblue)" /> Do magic
                        </span>, onClick: () => alert("Cliccato") },
                        { text: "Second option", onClick: () => console.log("cliccato 2") },
                    ]}>
                        Popup button
                    </Button>

                    <Button fullSize btnColor="darkblue" className="mt-2 mr-2" type="popup" options={[
                        { text: <span>
                            <Icon iconKey="magic" color="var(--darkblue)" /> Do magic
                        </span>, onClick: () => alert("Cliccato") },
                        { text: "Second option", onClick: () => console.log("cliccato 2") },
                    ]} iconPopup>
                        <Icon iconKey="magic" />
                    </Button>

                    <Button btnColor="green" circleBtn>
                        <Icon iconKey="users" />
                    </Button>
                </Tab>

                <Tab title={<span>
                    <Icon iconKey="bell" type="far" /> Notifications
                </span>}>
                    <Button onClick={() => {
                        NotificationMsg.show("Top center!")
                    }} btnColor="green" smallBtn className="mr-2">
                        Basic notification
                    </Button>
                    <Button onClick={() => {
                        NotificationMsg.show({
                            message: "Top right!",
                            position: "top-right"
                        })
                    }} btnColor="green" smallBtn className="mr-2">
                        Top Right
                    </Button>
                    <Button onClick={() => {
                        NotificationMsg.show({
                            message: "Top left!",
                            position: "top-left"
                        })
                    }} btnColor="green" smallBtn className="mr-2">
                        Top Left
                    </Button>
                    <Button onClick={() => {
                        NotificationMsg.show({
                            message: "Bottom right!",
                            position: "bottom-right"
                        })
                    }} btnColor="green" smallBtn className="mr-2">
                        Bottom Right
                    </Button>
                    <Button onClick={() => {
                        NotificationMsg.show({
                            message: "Bottom left!",
                            position: "bottom-left"
                        })
                    }} btnColor="green" smallBtn className="mr-2">
                        Bottom left
                    </Button>
                    <Button onClick={() => {
                        NotificationMsg.show({
                            message: "Bottom center!",
                            position: "centered-bottom"
                        })
                    }} btnColor="green" smallBtn className="mr-2">
                        Bottom center
                    </Button>
                    <Button onClick={() => {
                        const not = NotificationMsg.showLoading("Loading...")

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
                    <Button onClick={() => {
                        NotificationMsg.show({
                            message: "Click me!",
                            dismissOnClick: true
                        })
                    }} btnColor="green" smallBtn className="mr-2">
                        Close on click
                    </Button>
                </Tab>

                <Tab title={<span>
                    <Icon iconKey="keyboard" type="far" /> Forms
                </span>}>
                    <Tabs vertical>
                        <Tab title="Text inputs">
                            <TextInput label="Simple" />
                            <TextInput label="Password" type="password" />
                            <TextInput label="Password toggle" type="password" togglePassword />
                            <TextInput label="E-mail" type="email" />
                            <TextInput label="Number" type="number" />
                            <TextInput label="Textarea expandable" type="textarea" expandTextarea />
                        </Tab>
                        
                        <Tab title="Select">
                            <Select label="Select">
                                {
                                    [1,2,3].map(o => {
                                        return <Option value={o} label={"Option " + o} />
                                    })
                                }
                            </Select>
                            <Select label="Multi-select" multiple>
                                {
                                    [1,2,3].map(o => {
                                        return <Option value={o} label={"Option " + o} />
                                    })
                                }
                            </Select>
                            <Select label="Search select" canSearch>
                                {
                                    [1,2,3].map(o => {
                                        return <Option value={o} label={"Option " + o} />
                                    })
                                }
                            </Select>
                            <Select label="Loading select" loading>
                                {
                                    [1,2,3].map(o => {
                                        return <Option value={o} label={"Option " + o} />
                                    })
                                }
                            </Select>
                        </Tab>

                        <Tab title="Pickers">
                            <DatePicker label="Datepicker" />
                            <DatePicker label="Date and time picker" selectTime />
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

                        <Tab title="Uploader">
                            <Uploader label="Simple uploader" />
                            <Uploader dropArea multiple />
                        </Tab>
                    </Tabs>
                </Tab>

                <Tab title={<span>
                    <Icon iconKey="window-alt" type="far" /> Dialogs
                </span>}>
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
                    }} btnColor="darkblue" className="mr-2">Close on mask click</Button>

                    <Button onClick={() => {
                        const dialog = Dialog.loadingDialog("Caricamento...")

                        setTimeout(() => dialog.close(), 2000)
                    }} btnColor="darkblue" className="mr-2">Loading dialog</Button>

                    <Button onClick={this.toggleDialog} btnColor="darkblue" className="mr-2">Dialog with form</Button>

                    <Dialog title="I'm a form dialog" visible={visibleDialog} customFooter={[
                        <Button btnColor="red" smallBtn textBtn onClick={this.toggleDialog}>Cancel</Button>,
                        <Button btnColor="green" loading={loading} smallBtn onClick={this.toggleSwitch}>Complete</Button>
                    ]} onClose={this.toggleDialog}>
                        <form>
                            <TextInput label="Username" icon={{ iconKey: "user" }} />
                            <TextInput type="password" label="Password" />
                            <TextInput type="email" label="E-mail" />
                            <DatePicker label="Date of birth" />
                            <RadioButton controlName="gender">
                                <Option value="M" label="Male" />
                                <Option value="F" label="Female" />
                            </RadioButton>

                            <CheckBox label="I accept the Terms of Service" />
                        </form>
                    </Dialog>
                    
                    <Button onClick={() => {
                        Dialog.openDialog({
                            overflows: true,
                            title: "My content is long",
                            content: <>
                                {
                                    [1,2,3,4,5,6].map(_ => <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>)
                                }
                            </>,
                            width: "500px"
                        })
                    }} btnColor="darkblue" className="mr-2">Long content dialog</Button>
                </Tab>

                <Tab title={<span>
                    <Icon iconKey="arrows-alt-v" type="far" /> Accordion
                </span>}>
                    <Accordion title="First" opened={checkedSwitch}>
                        Hello, I am the first accordion
                        <Accordion title="First" opened={checkedSwitch}>
                            Hello, I am the first accordion
                        </Accordion>
                        <Accordion title="Second">
                            Hello, I am the second accordion
                        </Accordion>
                    </Accordion>
                    <Accordion title="Second">
                        Hello, I am the second accordion
                    </Accordion>
                </Tab>

                <Tab title={<span>
                    <Icon iconKey="spinner" type="far" /> Progress
                </span>}>
                    <Progress percent={60} color="red" />
                    <Progress percent={percent} color="darkblue" loading={percent !== 100} loadingText="Loading..." />
                    <Progress percent={80} circular color="orange" />
                </Tab>

                <Tab title={<span>
                    <Icon iconKey="film" type="far" /> Slideshow
                </span>}>
                    <SlideShow automatic>
                        <Slide imageUrl="https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero.jpg"></Slide>
                        <Slide>
                            <h1>I am the second slide</h1>
                            Hello!
                        </Slide>
                        <Slide imageUrl="https://blog.prezi.com/wp-content/uploads/2019/03/jason-leung-479251-unsplash.jpg">
                            <h1>I am the third one</h1>
                        </Slide>
                    </SlideShow>
                </Tab>

                <Tab title={<span>
                    <Icon iconKey="shoe-prints" type="far" /> Stepper
                </span>}>
                    <Stepper currentStep={currentStep}>
                        <Step title="First step" loading={loading}>
                            Step 1

                            <Button onClick={this.nextStep}>Next</Button>
                        </Step>
                        <Step title="Second step" loading={loading}>
                            Step 2

                            <Button onClick={this.nextStep}>Next</Button>
                        </Step>
                        <Step title="Loading" loading={loading}>
                            Step 3

                            <Button onClick={this.nextStep}>Next</Button>
                        </Step>
                        <Step icon={{ iconKey: "check" }} title="Completed">
                            Step 4
                        </Step>
                    </Stepper>
                </Tab>
                <Tab title={<span>
                    <Icon iconKey="database" type="far" /> Data
                </span>}>
                    <Tabs vertical>
                        <Tab title={<span>
                            <Icon iconKey="table" type="far" /> Table
                        </span>}>
                            <Table columns={[
                                { field: "name", label: "Name" },
                                { field: "surname", label: "Surname" },
                                { field: "age", label: "Age", align: "right" },
                                { field: "birth", label: "Date of birth", type: "date", align: "center" },
                            ]} data={[
                                { name: "Jack", surname: "Douglas", age: 41, birth: "1980-5-18", onDoubleClick: () => alert("You clicked me!") },
                                { name: "Andre", surname: "Robinson", age: 34, birth: "1987-2-22", rowStyle: { color: "blue" } },
                                { name: "Paul", surname: "Amesty", age: 50, birth: "1971-4-1" }
                            ]} />
                        </Tab>
                        <Tab title={<span>
                            <Icon iconKey="folder-tree" type="far" /> Tree view
                        </span>}>
                            <TestTree />
                        </Tab>
                        <Tab title={<span>
                            <Icon iconKey="window-restore" type="far" /> Master-Detail
                        </span>}>
                            <TestMD />
                        </Tab>
                    </Tabs>
                </Tab>
                <Tab title={<span>
                    <Icon iconKey="tags" type="far" /> Status tags
                </span>}>
                    <Status type="success" className="mr-2">Success</Status>
                    <Status type="error" className="mr-2">Error</Status>
                    <Status type="warning" className="mr-2">Warning</Status>
                    <Status type="info" className="mr-2">Info</Status>
                    <Status type="pending" className="mr-2">Pending</Status>
                    <Status type="success" hideIcon className="mr-2">
                        <Icon iconKey="briefcase" /> Custom icon
                    </Status>
                    <Status type="error" hideIcon className="mr-2">Red without icon</Status>
                </Tab>

                <Tab title={<span>
                    <Icon iconKey="code-branch" type="far" /> Timeline
                </span>}>
                    <Timeline>
                        <TimelineItem>
                            <h2>Our birth</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, sapiente quod corrupti illo voluptates tempora cumque animi necessitatibus praesentium, eveniet ipsam laboriosam a veritatis ex eum alias! Laboriosam, neque voluptatum.
                            </p>
                        </TimelineItem>
                        <TimelineItem position="right" pinColor="var(--orange)">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium nobis odio totam velit voluptatum! Repudiandae perspiciatis laboriosam quisquam. Nulla voluptates amet excepturi similique sit voluptatum qui? Atque eaque deleniti autem.</TimelineItem>
                        <TimelineItem position="right" pinColor="var(--red)">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium nobis odio totam velit voluptatum! Repudiandae perspiciatis laboriosam quisquam. Nulla voluptates amet excepturi similique sit voluptatum qui? Atque eaque deleniti autem.</TimelineItem>
                        <TimelineItem position="left" pinColor="var(--green)">
                            <h2>Early development</h2>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium nobis odio totam velit voluptatum! Repudiandae perspiciatis laboriosam quisquam. Nulla voluptates amet excepturi similique sit voluptatum qui? Atque eaque deleniti autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, ipsum harum sunt libero facilis quod! Consequatur illum, ducimus ex, ad aperiam, eligendi deserunt ea minus nihil corporis cum nisi dignissimos. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, iste. Minus minima placeat qui, doloribus animi iure suscipit dolorum. Nulla, sint expedita. Numquam hic consectetur fugiat soluta! Totam, et rem.
                            </p>
                        </TimelineItem>
                    </Timeline>
                </Tab>

                <Tab title={<span>
                    <Icon iconKey="bullhorn" type="far" /> Alerts
                </span>}>
                    <Alert closable>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, suscipit velit. Libero delectus nam illo et assumenda recusandae laboriosam quibusdam officiis consectetur! Quisquam voluptatibus veniam, officiis blanditiis at beatae ut.
                    </Alert>
                    <Alert closable type="success" className="mt-2">
                        <strong>
                            <CheckCircleIcon /> You did it!
                        </strong>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, suscipit velit. Libero delectus nam illo et assumenda recusandae laboriosam quibusdam officiis consectetur! Quisquam voluptatibus veniam, officiis blanditiis at beatae ut.</p>
                    </Alert>
                    <Alert closable type="error" className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, suscipit velit. Libero delectus nam illo et assumenda recusandae laboriosam quibusdam officiis consectetur! Quisquam voluptatibus veniam, officiis blanditiis at beatae ut.</Alert>
                    <Alert closable type="warning" className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, suscipit velit. Libero delectus nam illo et assumenda recusandae laboriosam quibusdam officiis consectetur! Quisquam voluptatibus veniam, officiis blanditiis at beatae ut.</Alert>
                    <Alert closable type="info" className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, suscipit velit. Libero delectus nam illo et assumenda recusandae laboriosam quibusdam officiis consectetur! Quisquam voluptatibus veniam, officiis blanditiis at beatae ut.</Alert>
                </Tab>

                <Tab title={<span>
                    <Icon iconKey="coins" type="far" /> Other
                </span>}>
                    <BreadCrumb style={{ marginBottom: 20 }}>
                        <BreadCrumbItem onClick={() => alert("Navigate")}>Home</BreadCrumbItem>
                        <BreadCrumbItem onClick={() => alert("Navigate")}>Second</BreadCrumbItem>
                        <BreadCrumbItem>Third</BreadCrumbItem>
                    </BreadCrumb>

                    <Card title="Card with title">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quae illo vitae incidunt aperiam ea doloribus, praesentium odit ex saepe porro tenetur culpa tempora ad, iure unde eveniet sed exercitationem?
                    </Card>
                    <Card style={{ marginBottom: 20 }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam eum corrupti vel sit minima facilis laboriosam quisquam esse. Soluta quas ipsam quia dicta blanditiis ipsum debitis accusamus facere. Officia, adipisci!

                        <CardActions style={{ marginTop: 10 }}>
                            <Button btnColor="blue" textBtn tooltip="Some action here">
                                <Icon iconKey="mouse-pointer" large />
                            </Button>
                        </CardActions>
                    </Card>

                    <Button onClick={() => {
                        MessageBox.show({
                            title: "Message",
                            content: "A message can be placed at: top-left, top-right, bottom-left, bottom-right. It disappears after 4 seconds (you can change the delay, obv), or it can be closed by the X icon on the top-right corner.",
                            hideDelay: 4000
                        })
                    }} btnColor="green" smallBtn className="mr-2">
                        Message
                    </Button>
                    <Button onClick={this.toggleMenu} btnColor="red" smallBtn className="mr-2">
                        Menu
                    </Button>
                </Tab>
            </Tabs>
            
            <SideMenu opened={showMenu} onToggle={this.toggleMenu}>
                <MenuItem>
                    <Icon iconKey="home" type="far" /> I'm just a simple item
                </MenuItem>

                <SubMenu text={<span>
                    <Icon iconKey="mouse" type="far" /> Some items
                </span>}>
                    <MenuItem>Sub item</MenuItem>
                    <MenuItem>Sub item 2</MenuItem>
                </SubMenu>
                <SubMenu text="Other items">
                    <MenuItem>Sub item 3</MenuItem>
                    <MenuItem>Sub item 4</MenuItem>
                    <SubMenu text="Other other items">
                        <SubMenu text="Other other other items">
                            <MenuItem selected>Sub sub item</MenuItem>
                            <MenuItem>Sub sub item 2</MenuItem>
                        </SubMenu>
                        <MenuItem selected>Sub item 5</MenuItem>
                        <MenuItem>Sub item 6</MenuItem>
                    </SubMenu>
                </SubMenu>

                <MenuItem>I am the last one</MenuItem>
            </SideMenu>
        </div>
    }
}