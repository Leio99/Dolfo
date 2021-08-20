import { CheckboxPage } from "./CheckboxPage"
import { DatepickerPage } from "./DatepickerPage"
import { RadiobuttonPage } from "./RadiobuttonPage"
import { SwitchPage } from "./SwitchPage"
import { SelectPage } from "./SelectPage"
import { TextinputPage } from "./TextinputPage"
import { TimepickerPage } from "./TimepickerPage"
import { UploaderPage } from "./UploaderPage"
import { AccordionPage } from "./AccordionPage"
import { AlertPage } from "./AlertPage"
import { AvatarPage } from "./AvatarPage"
import { BreadcrumbPage } from "./BreadcrumbPage"
import { ButtonsPage } from "./ButtonsPage"
import { CardPage } from "./CardPage"
import { DialogPage } from "./DialogPage"
import { FullpageLoaderPage } from "./FullpageLoaderPage"
import { HeaderPage } from "./HeaderPage"
import { IconPage } from "./IconPage"
import { MasterdetailPage } from "./MasterdetailPage"
import { TablePage } from "./TablePage"
import { SidemenuPage } from "./SidemenuPage"
import { MessageboxPage } from "./MessageboxPage"
import { NotificationPage } from "./NotificationPage"
import { ProgressPage } from "./ProgressPage"
import { SlideshowPage } from "./SlideshowPage"
import { StatustagsPage } from "./StatustagsPage"
import { StepperPage } from "./StepperPage"
import { SwiperPage } from "./SwiperPage"
import { TreeviewPage } from "./TreeviewPage"
import { TooltipPage } from "./TooltipPage"
import { TabsPage } from "./TabsPage"
import { TimelinePage } from "./TimelinePage"
import { CalendarPage } from "./CalendarPage"

export const MenuItems = [
    { link: "form/checkbox", children: "Checkbox", section: "form", component: CheckboxPage, icon: "check-square" },
    { link: "form/datepicker", children: "Date picker", section: "form", component: DatepickerPage, icon: "calendar-day" },
    { link: "form/radio", children: "Radio button", section: "form", component: RadiobuttonPage, icon: "dot-circle" },
    { link: "form/select", children: "Select", section: "form", component: SelectPage, icon: "hand-pointer" },
    { link: "form/switch", children: "Switch", section: "form", component: SwitchPage, icon: "toggle-on" },
    { link: "form/textinputs", children: "Text input", section: "form", component: TextinputPage, icon: "keyboard" },
    { link: "form/timepicker", children: "Time picker", section: "form", component: TimepickerPage, icon: "clock" },
    { link: "form/uploader", children: "Uploader", section: "form", component: UploaderPage, icon: "arrow-to-top" },
    { link: "layout/accordion", children: "Accordion", section: "layout", component: AccordionPage, icon: "compress" },
    { link: "layout/alerts", children: "Alerts", section: "layout", component: AlertPage, icon: "comment-alt-exclamation" },
    { link: "layout/avatar", children: "Avatar", section: "layout", component: AvatarPage, icon: "user-circle" },
    { link: "layout/breadcrumb", children: "Breadcrumb", section: "layout", component: BreadcrumbPage, icon: "location-arrow" },
    { link: "layout/buttons", children: "Buttons", section: "layout", component: ButtonsPage, icon: "mouse" },
    { link: "layout/calendar", children: "Calendar", section: "layout", component: CalendarPage, icon: "calendar-alt" },
    { link: "layout/card", children: "Card", section: "layout", component: CardPage, icon: "id-card" },
    { link: "layout/dialog", children: "Dialog", section: "layout", component: DialogPage, icon: "window" },
    { link: "layout/fullpageloader", children: "Fullpage loader", section: "layout", component: FullpageLoaderPage, icon: "spinner" },
    { link: "layout/header", children: "Header", section: "layout", component: HeaderPage, icon: "heading" },
    { link: "layout/icons", children: "Icon", section: "layout", component: IconPage, icon: "icons" },
    { link: "layout/masterdetail", children: "Master-Detail", section: "layout", component: MasterdetailPage, icon: "external-link" },
    { link: "layout/messages", children: "Message box", section: "layout", component: MessageboxPage, icon: "sticky-note" },
    { link: "layout/notifications", children: "Notifications", section: "layout", component: NotificationPage, icon: "bell" },
    { link: "layout/progress", children: "Progress", section: "layout", component: ProgressPage, icon: "tasks-alt" },
    { link: "layout/sidemenu", children: "Side menu", section: "layout", component: SidemenuPage, icon: "bars" },
    { link: "layout/slideshow", children: "Slideshow", section: "layout", component: SlideshowPage, icon: "images" },
    { link: "layout/status", children: "Status tags", section: "layout", component: StatustagsPage, icon: "tags" },
    { link: "layout/stepper", children: "Stepper", section: "layout", component: StepperPage, icon: "shoe-prints" },
    { link: "layout/swiper", children: "Swiper", section: "layout", component: SwiperPage, icon: "sliders-h" },
    { link: "layout/table", children: "Table", section: "layout", component: TablePage, icon: "table" },
    { link: "layout/tabs", children: "Tabs", section: "layout", component: TabsPage, icon: "tv-alt" },
    { link: "layout/timeline", children: "Timeline", section: "layout", component: TimelinePage, icon: "hourglass-start" },
    { link: "layout/tooltips", children: "Tooltips", section: "layout", component: TooltipPage, icon: "comment-alt-dots" },
    { link: "layout/tree", children: "Tree view", section: "layout", component: TreeviewPage, icon: "folder-tree" }
]