import React from "react"
import { MenuContentProps } from "../MenuContent"
import { IconKey } from "../shared/models/IconModel"
import { AccordionPage } from "./AccordionPage"
import { AlertPage } from "./AlertPage"
import { AutocompletePage } from "./AutocompletePage"
import { AvatarPage } from "./AvatarPage"
import { BreadcrumbPage } from "./BreadcrumbPage"
import { ButtonsPage } from "./ButtonsPage"
import { CalendarPage } from "./CalendarPage"
import { CardPage } from "./CardPage"
import { CarswiperPage } from "./CardswiperPage"
import { CheckboxPage } from "./CheckboxPage"
import { ContextMenuPage } from "./ContextmenuPage"
import { DatepickerPage } from "./DatepickerPage"
import { DialogPage } from "./DialogPage"
import { DisplayPage } from "./DisplayPage"
import { DropdownPage } from "./DropdownPage"
import { FullpageLoaderPage } from "./FullpageLoaderPage"
import { HeaderPage } from "./HeaderPage"
import { HomePage } from "./HomePage"
import { HorizontaldisplayerPage } from "./HorizontaldisplayerPage"
import { IconPage } from "./IconPage"
import { LabelPage } from "./LabelPage"
import { ListsidemenuPage } from "./ListsidemenuPage"
import { MasterdetailPage } from "./MasterdetailPage"
import { MessageboxPage } from "./MessageboxPage"
import { NotificationPage } from "./NotificationPage"
import { PaginationPage } from "./PaginationPage"
import { PininputPage } from "./PininputPage"
import { PopoverPage } from "./PopoverPage"
import { ProgressPage } from "./ProgressPage"
import { RadiobuttonPage } from "./RadiobuttonPage"
import { SelectPage } from "./SelectPage"
import { SelectablelistPage } from "./SelectablelistPage"
import { SidemenuPage } from "./SidemenuPage"
import { SlideshowPage } from "./SlideshowPage"
import { SpotlightPage } from "./SpotlightPage"
import { StartupPage } from "./StartupPage"
import { StatustagsPage } from "./StatustagsPage"
import { StepperPage } from "./StepperPage"
import { SwiperPage } from "./SwiperPage"
import { SwitchPage } from "./SwitchPage"
import { TablePage } from "./TablePage"
import { TabsPage } from "./TabsPage"
import { TextinputPage } from "./TextinputPage"
import { TimelinePage } from "./TimelinePage"
import { TimepickerPage } from "./TimepickerPage"
import { TooltipPage } from "./TooltipPage"
import { TransferlistPage } from "./TransferlistPage"
import { TreeviewPage } from "./TreeviewPage"
import { UpdatesPage } from "./UpdatesPage"
import { UploaderPage } from "./UploaderPage"

interface MenuItem{
    readonly link: string
    readonly title: string
    readonly section: "base" | "form" | "layout",
    readonly component: React.ComponentClass<MenuContentProps | any>
    readonly icon: IconKey
}

export const MenuItems: MenuItem[] = [
    { link: "", title: "Home", section: "base", component: HomePage, icon: "info-square" },
    { link: "startup", title: "Getting started", section: "base", component: StartupPage, icon: "rocket" },
    { link: "updates", title: "Changelog", section: "base", component: UpdatesPage, icon: "history" },
    { link: "form/autocomplete", title: "Autocomplete", section: "form", component: AutocompletePage, icon: "typewriter" },
    { link: "form/checkbox", title: "Checkbox", section: "form", component: CheckboxPage, icon: "check-square" },
    { link: "form/datepicker", title: "Date picker", section: "form", component: DatepickerPage, icon: "calendar-day" },
    { link: "form/pin", title: "Pin input", section: "form", component: PininputPage, icon: "hashtag" },
    { link: "form/radio", title: "Radio button", section: "form", component: RadiobuttonPage, icon: "dot-circle" },
    { link: "form/select", title: "Select", section: "form", component: SelectPage, icon: "hand-pointer" },
    { link: "form/selectablelist", title: "Selectable list", section: "form", component: SelectablelistPage, icon: "tasks" },
    { link: "form/switch", title: "Switch", section: "form", component: SwitchPage, icon: "toggle-on" },
    { link: "form/textinputs", title: "Text input", section: "form", component: TextinputPage, icon: "keyboard" },
    { link: "form/timepicker", title: "Time picker", section: "form", component: TimepickerPage, icon: "clock" },
    { link: "form/transferlist", title: "Transfer list", section: "form", component: TransferlistPage, icon: "exchange" },
    { link: "form/uploader", title: "Uploader", section: "form", component: UploaderPage, icon: "arrow-to-top" },
    { link: "layout/accordion", title: "Accordion", section: "layout", component: AccordionPage, icon: "compress" },
    { link: "layout/alerts", title: "Alerts", section: "layout", component: AlertPage, icon: "comment-alt-exclamation" },
    { link: "layout/avatar", title: "Avatar", section: "layout", component: AvatarPage, icon: "user-circle" },
    { link: "layout/breadcrumb", title: "Breadcrumb", section: "layout", component: BreadcrumbPage, icon: "location-arrow" },
    { link: "layout/buttons", title: "Button", section: "layout", component: ButtonsPage, icon: "mouse" },
    { link: "layout/calendar", title: "Calendar", section: "layout", component: CalendarPage, icon: "calendar-alt" },
    { link: "layout/card", title: "Card", section: "layout", component: CardPage, icon: "id-card" },
    { link: "layout/cardswiper", title: "Card swiper", section: "layout", component: CarswiperPage, icon: "window-restore" },
    { link: "layout/contextmenu", title: "Context menu", section: "layout", component: ContextMenuPage, icon: "comment-dots" },
    { link: "layout/dialog", title: "Dialog", section: "layout", component: DialogPage, icon: "window" },
    { link: "layout/display", title: "Display", section: "layout", component: DisplayPage, icon: "tablet-android-alt" },
    { link: "layout/dropdown", title: "Dropdown", section: "layout", component: DropdownPage, icon: "caret-square-down" },
    { link: "layout/fullpageloader", title: "Fullpage loader", section: "layout", component: FullpageLoaderPage, icon: "spinner" },
    { link: "layout/header", title: "Header", section: "layout", component: HeaderPage, icon: "heading" },
    { link: "layout/horizontaldisplayer", title: "Horizontal display", section: "layout", component: HorizontaldisplayerPage, icon: "photo-video" },
    { link: "layout/icons", title: "Icon", section: "layout", component: IconPage, icon: "icons" },
    { link: "layout/label", title: "Label", section: "layout", component: LabelPage, icon: "marker" },
    { link: "layout/masterdetail", title: "Master-Detail", section: "layout", component: MasterdetailPage, icon: "external-link" },
    { link: "layout/messages", title: "Message box", section: "layout", component: MessageboxPage, icon: "sticky-note" },
    { link: "layout/notifications", title: "Notifications", section: "layout", component: NotificationPage, icon: "bell" },
    { link: "layout/pagination", title: "Pagination", section: "layout", component: PaginationPage, icon: "pager" },
    { link: "layout/popover", title: "Popover", section: "layout", component: PopoverPage, icon: "comment" },
    { link: "layout/progress", title: "Progress", section: "layout", component: ProgressPage, icon: "tasks-alt" },
    { link: "layout/sidemenu", title: "Side menu", section: "layout", component: SidemenuPage, icon: "bars" },
    { link: "layout/sidemenulist", title: "Side menu list", section: "layout", component: ListsidemenuPage, icon: "th-list" },
    { link: "layout/slideshow", title: "Slideshow", section: "layout", component: SlideshowPage, icon: "images" },
    { link: "layout/spotlight", title: "Spotlight", section: "layout", component: SpotlightPage, icon: "file-search" },
    { link: "layout/status", title: "Status tags", section: "layout", component: StatustagsPage, icon: "tags" },
    { link: "layout/stepper", title: "Stepper", section: "layout", component: StepperPage, icon: "shoe-prints" },
    { link: "layout/swiper", title: "Swiper", section: "layout", component: SwiperPage, icon: "sliders-h" },
    { link: "layout/table", title: "Table", section: "layout", component: TablePage, icon: "table" },
    { link: "layout/tabs", title: "Tabs", section: "layout", component: TabsPage, icon: "tv-alt" },
    { link: "layout/timeline", title: "Timeline", section: "layout", component: TimelinePage, icon: "hourglass-start" },
    { link: "layout/tooltips", title: "Tooltips", section: "layout", component: TooltipPage, icon: "comment-alt-dots" },
    { link: "layout/tree", title: "Tree view", section: "layout", component: TreeviewPage, icon: "folder-tree" }
]