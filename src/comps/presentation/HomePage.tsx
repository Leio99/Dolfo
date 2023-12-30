import React from "react"

export class HomePage extends React.Component{
    render = () => <>
        <p>This is a simple website to show the <strong>Dolfo components</strong>, developed by me.</p>
        <p>Use the side menu to navigate.</p>
        In each page, you will find:
        <ul>
            <li>What the component is used for</li>
            <li>How to use it</li>
            <li>Its appearance</li>
            <li>The props the component can take</li>
        </ul>

        <h3 className="page-title">External dependencies</h3>
        <ul>
            <li>FontAwesome PRO</li>
            <li>React onClickOutside</li>
            <li>Google gapi</li>
            <li>Lodash library</li>
            <li>SASS</li>
        </ul>
    </>
}