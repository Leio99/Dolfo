import React from "react"
import Button from "../layout/Button"
import { Card, CardActions } from "../layout/Card"
import { Icon } from "../layout/Icon"
import { goToApiBlock } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class CardPage extends React.Component{
    render = (): JSX.Element => <>
        <WhenToUse>When you want to render a card component.</WhenToUse>
        <Usage />

        <ResultCode
            title="Simple card"
            result={<Card>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur possimus, ad accusantium velit voluptatibus id eius at corporis debitis, unde eligendi laborum commodi. Esse rerum iusto nesciunt culpa quibusdam corporis.</Card>}
            code={'<Card>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur possimus, ad accusantium velit voluptatibus id eius at corporis debitis, unde eligendi laborum commodi. Esse rerum iusto nesciunt culpa quibusdam corporis.</Card>'}
        />

        <ResultCode
            title="Title"
            result={<Card title="I am the title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur possimus, ad accusantium velit voluptatibus id eius at corporis debitis, unde eligendi laborum commodi. Esse rerum iusto nesciunt culpa quibusdam corporis.</Card>}
            code={'<Card title="I am the title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur possimus, ad accusantium velit voluptatibus id eius at corporis debitis, unde eligendi laborum commodi. Esse rerum iusto nesciunt culpa quibusdam corporis.</Card>'}
        />

        <ResultCode
            title="Tab layout"
            result={<Card title="I have tab layout" layout="tab">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur possimus, ad accusantium velit voluptatibus id eius at corporis debitis, unde eligendi laborum commodi. Esse rerum iusto nesciunt culpa quibusdam corporis.</Card>}
            code={'<Card title="I have tab layout" layout="tab">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur possimus, ad accusantium velit voluptatibus id eius at corporis debitis, unde eligendi laborum commodi. Esse rerum iusto nesciunt culpa quibusdam corporis.</Card>'}
        />

        <ResultCode
            title="Actions"
            result={<Card title="I have actions">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur possimus, ad accusantium velit voluptatibus id eius at corporis debitis, unde eligendi laborum commodi. Esse rerum iusto nesciunt culpa quibusdam corporis.

                <CardActions>
                    <Button btnColor="blue" onClick={() => alert("Clicked an action")} type="text">
                        <Icon iconKey="tachometer" large />
                    </Button>
                </CardActions>
            </Card>}
            code={'<Card title="I have actions">\n\tLorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur possimus, ad accusantium velit voluptatibus id eius at corporis debitis, unde eligendi laborum commodi. Esse rerum iusto nesciunt culpa quibusdam corporis.\n\t<CardActions>\n\t\t<Button btnColor="blue" onClick={() => alert("Clicked an action")} type="text">\n\t\t\t<Icon iconKey="tachometer" large />\n\t\t</Button>\n\t</CardActions>\n</Card>'}
        />

        <Apis data={[
            {
                name: "title",
                desc: "The title of the card.",
                type: "string or JSX",
                required: false,
                default: "null (title not shown)"
            },
            {
                name: "style",
                desc: "Additional card style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional card className.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "layout",
                desc: "Determines the type of layout of the card.",
                type: "string (tab, flat)",
                required: false,
                default: "flat"
            },
            {
                name: "Card actions children",
                desc: "Actions placed at the bottom of the card.",
                type: "string",
                required: false,
                default: "null (no actions)",
                onDoubleClick: () => goToApiBlock("#cardActionProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            }
        ]} />

        <Apis id="cardActionProps" title="Card action properties" data={[
            {
                name: "style",
                desc: "Additional card actions section style.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional card actions section className.",
                type: "string",
                required: false,
                default: "null"
            }
        ]} />
    </>
}