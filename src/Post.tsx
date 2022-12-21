import React from "react"
import { createRoot } from "react-dom/client"
import { TextInput } from "./comps/form/TextInput"
import { Avatar } from "./comps/layout/Avatar"
import Button from "./comps/layout/Button"
import { Card } from "./comps/layout/Card"
import { Icon } from "./comps/layout/Icon"
import { Tooltip } from "./comps/layout/Tooltip"
import avatarImage from "./comps/presentation/images/avatarImage.png"
import { IconKey } from "./comps/shared/models/IconModel"

interface PopupOption{
    readonly text: string
    readonly icon: IconKey
    readonly class?: string
    readonly onClick: () => void
}

export class Post extends React.Component{
    private popup: HTMLDivElement
    private checkClickOutside = (e: MouseEvent) => {
        if(this.popup && !this.popup.contains(e.target as Node) && document.body.contains(this.popup)){
            this.popup.remove()
            this.detatchClick()
        }else if(!this.popup)
            this.detatchClick()
    }

    attachClick = () => window.addEventListener("click", this.checkClickOutside)

    detatchClick = () => window.removeEventListener("click", this.checkClickOutside)

    componentWillUnmount = this.detatchClick
    
    openActions = (e: React.MouseEvent) => {
        if(!this.popup){
            const popup = document.createElement("div"),
            actions: PopupOption[] = [
                { text: "Condividi", onClick: () => {}, icon: "share-alt" },
                { text: "Modifica", onClick: () => {}, icon: "edit" },
                { text: "Elimina", onClick: () => {}, icon: "trash", class: "red" }
            ]
            
            popup.classList.add("actions-popup")

            actions.forEach(a => {
                const option = document.createElement("div"),
                root = createRoot(option)

                option.classList.add("popup-option")
                option.addEventListener("click", () => {
                    a.onClick()
                    document.body.click()
                })

                if(a.class)
                    option.classList.add(a.class)

                root.render(<>
                    <Icon iconKey={a.icon} type="far" /> {a.text}
                </>)

                popup.appendChild(option)
            })

            this.popup = popup
        }else if(document.body.contains(this.popup)){
            this.popup.remove()
            this.detatchClick()
            return
        }

        const target = e.target as HTMLElement,
        bound = target.getBoundingClientRect(),
        windowBound = document.body.getBoundingClientRect(),
        { top, left, width, height } = bound

        document.body.appendChild(this.popup)
        this.popup.style.right = windowBound.width - left - width + "px"
        this.popup.style.top = top + height + 5 + "px"
        setTimeout(() => this.attachClick())
    }
    
    render = () => <Card title={<div className="post-title">
        <Avatar imageSource={avatarImage} />
        <div className="user-info">
            <a className="link" href="#">
                Prova utente
            </a>
            <span className="user-name">
                @provaUtente.prova
            </span>
        </div>

        <Tooltip tooltip="Azioni">
            <Button btnColor="grey" type="text" onClick={this.openActions}>
                <Icon iconKey="ellipsis-h" large />
            </Button>
        </Tooltip>
    </div>}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et aperiam ipsam atque tenetur itaque enim maxime nesciunt tempore impedit dignissimos saepe explicabo, minus cupiditate. Necessitatibus sed voluptatibus quae molestias corrupti! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis sit, voluptas asperiores doloribus dicta inventore nihil illum nobis repudiandae quidem eligendi explicabo accusamus facere unde vel totam at! Laborum, iusto? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus sint rerum delectus unde laboriosam blanditiis, praesentium voluptas, animi eos error consectetur odit placeat magni esse incidunt! Quasi facilis id reprehenderit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, blanditiis? Suscipit, ullam, atque enim ratione reiciendis sunt temporibus officia obcaecati unde vel cumque magnam omnis, fuga quam perferendis possimus! Debitis!

        <div className="post-info">
            <span className="post-date">Il 18 novembre 2022</span>

            <div className="post-votes">
                <Tooltip tooltip="Upvote">
                    <Button type="text" btnColor="black">
                        <Icon iconKey="arrow-alt-up" large />
                    </Button>
                </Tooltip>
                <Tooltip tooltip="Downvote">
                    <Button type="text" btnColor="black">
                        <Icon iconKey="arrow-alt-down" large />
                    </Button>
                </Tooltip>
            </div>
        </div>

        <div className="post-separator"></div>

        <TextInput wrapperStyle={{ marginTop: 20 }} type="textarea" rows={5} expandTextarea />
    </Card>
}