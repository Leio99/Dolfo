import _ from "lodash";
import React from "react";
import { Table } from "../layout/table/Table";
import { Constants } from "../shared/Constants";

export class StartupPage extends React.Component{
    render = (): React.ReactNode => <>
        <h2>&rarr; Step 1</h2>
        <div className="component-preview">
            <h6>Install dolfo:</h6>
            <div className="component-showing code">npm install dolfo</div>
        </div>

        <h2>&rarr; Step 2</h2>
        <div className="component-preview">
            <h6>You need to import the main stylesheet in your SCSS file, by adding this line:</h6>
            <div className="component-showing code">@import "~dolfo/comps/shared/styles/dolfo";</div>
        </div>

        <h4 style={{ textAlign: "center" }}>OR</h4>

        <div className="component-preview">
            <h6>You can import it in your index file like this:</h6>
            <div className="component-showing code">import "../node_modules/dolfo/comps/shared/styles/_dolfo.scss"</div>
        </div>

        <h2>&rarr; Step 3</h2>
        <p>Import and use a component from <strong>dolfo</strong> package.</p>

        <h2 style={{ marginTop: 20 }}>&rarr; Configure constants</h2>
        <p>Inside Dolfo there are different constants that are used by default (i.e.: the tooltip for the closing button of the dialogs is "Chiudi" by default).</p>
        <p>You can customize the constants by adding the <strong>DOLFO_LANGUAGE_CONFIG</strong> variable to the window object in your index.html, like this:</p>

        <div className="component-preview">
            <div className="component-showing code">
                &lt;script&gt;<br />
                    &nbsp;&nbsp;(window as any).DOLFO_LANGUAGE_CONFIG = &#123;&#125; <br/>
                &lt;/script&gt;
            </div>
        </div>
        <p>Or, you can define it at any time by changing the window variable value.</p>
        <br />

        <p>You can always access the constants by using the <em>Constants</em> object or by calling the <em>getConstant</em> method.</p>
        <br />

        <h4>Available keys:</h4>
        <Table columns={[
            { field: "key", label: "Key", canSearch: true },
            { field: "description", label: "Description" },
            { field: "default", label: "Default value", canSearch: true }
        ]} data={_.orderBy(Object.keys(Constants)).map(key => {
            const value = Constants[key]
            let description: string

            switch(key as keyof typeof Constants){
                case "BACK_TEXT":
                    description = "Used to define the text of any 'back' button."
                    break
                case "AUTOCOMPLETE_EXLUDE_KEYS":
                    description = "Defines the keys that won't trigger the autocomplete when pressed."
                    break
                case "BACK_TO_LIST":
                    description = "Used to define the text of a 'back to list' button."
                    break
                case "CALENDAR_CHANGE":
                    description = "Used to define the title of the button that allows changing the date on the calendar."
                    break
                case "CALENDAR_CHANGE_DATE":
                    description = "Used to define the title of the dialog that allows changing the date on the calendar."
                    break
                case "CALENDAR_ERROR_UNABLE_TO_GET_EVENTS":
                    description = "Description of the error triggered when the calendar can't retrieve the google calendar events."
                    break
                case "CALENDAR_NEXT_MONTH":
                    description = "Used to define the text of the 'next month' button on the calendar."
                    break
                case "CALENDAR_PIN_TODAY":
                    description = "Used to define the title of the 'today' icon on the calendar."
                    break
                case "CALENDAR_PREVIOUS_MONTH":
                    description = "Used to define the text of the 'previous month' button on the calendar."
                    break
                case "CALENDAR_SELECT_CURRENT":
                    description = "Used to define the text of the button that allows selecting the current month and year on the calendar."
                    break
                case "CALENDAR_SET_TEXT":
                    description = "Used to define the text of the button of the dialog that allows chaning the date on the calendar."
                    break
                case "CANCEL_TEXT":
                    description = "Used to define the text of any 'cancel' button."
                    break
                case "CLOSE_TEXT":
                    description = "Used to define the text of any 'close' button."
                    break
                case "CHANGE_MONTH":
                    description = "Used to define the text of the button that allows changing the month on the datepicker."
                    break
                case "CHANGE_YEAR":
                    description = "Used to define the text of the button that allows changing the year on the datepicker."
                    break
                case "COLLAPSE_TEXT":
                    description = "Used to define the text of the collapse button on accordions."
                    break
                case "COLUMN_ORDER":
                    description = "Used to define the title of the button that allows ordering the columns of a table."
                    break
                case "CONFIRM_TEXT":
                    description = "Used to define the text of any 'confirm' button."
                    break
                case "CONFIRM_TITLE":
                    description = "Used to define the default title of the yes/no dialog."
                    break
                case "COPIED_TO_CLIPBOARD":
                    description = "Used to define the text of the 'copied to clipboard' notification."
                    break
                case "DECREASE_TEXT":
                    description = "Used to define the text of the 'decrease' button on numeric inputs."
                    break
                case "ERROR_TEXT":
                    description = "Used to define the default title of the info dialog when its type is 'error'."
                    break
                case "EVENT_DETAIL_TOOLTIP":
                    description = "Used to define the tooltip title when hovering an event on the calendar."
                    break
                case "EXPAND_TEXT":
                    description = "Used to define the text of the 'expand' button on accordions."
                    break
                case "EXPORT_CSV_TEXT":
                    description = "Used to define the tooltip title of the button that allows exporting a table in CSV format."
                    break
                case "EXPORT_PDF_TEXT":
                    description = "Used to define the tooltip title of the button that allows exporting a table in PDF format."
                    break
                case "FILTER_TEXT":
                    description = "Used for any placeholder in a filterable input."
                    break
                case "HIDE_PASSWORD_TEXT":
                    description = "Used to define the text of the 'hide password' button on password inputs."
                    break
                case "INCREASE_TEXT":
                    description = "Used to define the text of the 'increase' button on numeric inputs."
                    break
                case "INFO_TEXT":
                    description = "Used to define the default title of the info dialog when its type is 'info'."
                    break
                case "LOADING_TEXT":
                    description = "Used to define any loading text."
                    break
                case "MONTHS":
                    description = "An array of strings containing the names of the months, starting from January."
                    break
                case "MONTH_NO_EVENTS":
                    description = "Used to define the text that shows when there are no events on the calendar for the selected month (only shows on mobile)."
                    break
                case "NAVIGATE_BREADCRUMB":
                    description = "Used to define the tooltip of the breadcrumb navigation."
                    break
                case "NEXT_TEXT":
                    description = "Used to define the tooltip of the next button on the datepicker."
                    break
                case "NO_TEXT":
                    description = "Used to define the text of any 'no' button or for a boolean column on tables when the value is 'false'."
                    break
                case "OK_TEXT":
                    description = "Used to define any 'ok' button."
                    break
                case "OPEN_DETAIL":
                    description = "Used to define the text of the button that opens the swiper detail."
                    break
                case "ORDER_ASCENDING":
                    description = "Used to define the tooltip of the 'order ascending' button on tables."
                    break
                case "ORDER_COLUMNS":
                    description = "Used to define the tooltip of the 'order columns' button on tables."
                    break
                case "ORDER_DESCENDING":
                    description = "Used to define the tooltip of the 'order descending' button on tables."
                    break
                case "PAGINATION_FIRST_PAGE":
                    description = "Used to define the tooltip of the first page button on the pagination."
                    break
                case "PAGINATION_LAST_PAGE":
                    description = "Used to define the tooltip of the last page button on the pagination."
                    break
                case "PAGINATION_PAGE":
                    description = "Used to define the text of page buttons on the pagination collapsed buttons."
                    break
                case "PAGINATION_PAGES":
                    description = "Used to define the tooltip of the 'pages' collapsed button on the pagination."
                    break
                case "PREV_TEXT":
                    description = "Used to define the tooltip of the previous button on the datepicker."
                    break
                case "REQUIRED_FIELD":
                    description = "Used to define the tooltip of a 'required' field asterisk."
                    break
                case "RESET_INPUT_TEXT":
                    description = "Used to define the text of the 'reset input' button on form inputs."
                    break
                case "SEARCH_PLACEHOLDER":
                    description = "Used to define the placeholder of a searchable input."
                    break
                case "SELECTED_FILES_LABEL":
                    description = "Used to define the text of the 'selected files' label on uploader."
                    break
                case "SHOW_PASSWORD_TEXT":
                    description = "Used to define the text of the 'show password' button on password inputs."
                    break
                case "STRING_NOT_DEFINED_OPTION":
                    description = "Used to define the text of the 'not defined' option on select inputs."
                    break
                case "SUCCESS_TEXT":
                    description = "Used to define the default title of the info dialog when its type is 'success'."
                    break
                case "SWIPE_ERROR_ONLY_TWO":
                    description = "Used to define the error triggered when the swiper component has more than 2 children."
                    break
                case "SWITCH_TO_CARD_LAYOUT":
                    description = "Used to define the text of the 'switch to card layout' button on the table."
                    break
                case "SWITCH_TO_GRID_LAYOUT":
                    description = "Used to define the text of the 'switch to grid layout' button on the table."
                    break
                case "TABLE_NO_RESULTS":
                    description = "Used to define the text that shows when there are no results on the table."
                    break
                case "TRANSFER_ALL_TEXT":
                    description = "Used to define the tooltip of the button that allows transfering all the elements on a transfer component."
                    break
                case "TRANSFER_FILTER_TEXT":
                    description = "Used to define the placeholder of the transfer filter."
                    break
                case "TRANSFER_NO_ITEMS":
                    description = "Used to define the text that shows when there are no items on the transfer component."
                    break
                case "TRANSFER_TEXT":
                    description = "Used to define the tooltip of the button that allows transfering one element on the transfer component."
                    break
                case "TREE_CLOSE_NODE":
                    description = "Used to define the text of the 'close node' button on the treeviews."
                    break
                case "TREE_COLLAPSE_ALL_NODE":
                    description = "Used to define the text of the button that allows collapsing a single node completely on the treeviews."
                    break
                case "TREE_COLLAPSE_ALL_NODES":
                    description = "Used to define the text of the 'collapse all nodes' button on the treeviews."
                    break
                case "TREE_EXPAND_ALL_NODE":
                    description = "Used to define the text of the button that allows expanding a single node completely on the treeviews."
                    break
                case "TREE_EXPAND_ALL_NODES":
                    description = "Used to define the text of the 'expand all nodes' button on the treeviews."
                    break
                case "TREE_OPEN_NODE":
                    description = "Used to define the text of the button that allows opening a single node on the treeviews."
                    break
                case "TREE_TABLE_ACTIONS_LABEL":
                    description = "Used to define the label of the action column on tables."
                    break
                case "TREE_TABLE_DESCRIPTION_LABEL":
                    description = "Used to define the description column on treeviews."
                    break
                case "UPLOAD_FILE_DROP_LABEL":
                    description = "Used to define the text of the 'drop file here' label on the uploader."
                    break
                case "UPLOAD_FILE_ERROR_NOT_MULTIPLE":
                    description = "Used to define the error triggered when the uploader is not in multiple mode."
                    break
                case "UPLOAD_FILE_LABEL":
                    description = "Used to define the text of the 'upload file' label on the uploader."
                    break
                case "UPLOAD_FILE_NOT_ACCEPTABLE":
                    description = "Used to define the error triggered when the selected file is not allowed on the uploader."
                    break
                case "WARNING_TEXT":
                    description = "Used to define the default title of the info dialog when its type is 'warning'."
                    break
                case "WEEK_DAYS":
                    description = "An array of strings containing the names of the days of the week, starting from Monday."
                    break
                case "YES_TEXT":
                    description = "Used to define the text of the 'yes' button on yes/no dialogs."
                    break
            }

            return {
                key,
                description,
                default: _.isArray(value) ? JSON.stringify(value) : value
            }
        })} />
    </>
}