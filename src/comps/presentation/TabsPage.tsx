import React from "react"
import { Icon } from "../layout/Icon"
import { Tab, Tabs } from "../layout/Tabs"
import { goToApiBlock } from "../MenuContent"
import { ResultCode, WhenToUse, Usage, Apis } from "./Layouts"

export class TabsPage extends React.Component{
    render = (): React.ReactNode => <>
        <WhenToUse>When you want to render some tabs.</WhenToUse>
        <Usage />

        <ResultCode
            title="Example"
            result={<Tabs>
                <Tab title="I am the first tab">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!
                </Tab>
                <Tab title={<><Icon iconKey="home-alt" /> I have an icon</>}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, commodi voluptates neque ad aspernatur at iste aut, vitae ab, eveniet quos. Adipisci, eligendi. Quisquam commodi voluptatem aperiam, aut aliquid nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. In molestiae, vero voluptates ex inventore quam autem id amet expedita corporis ipsum dolorum laboriosam eum necessitatibus aperiam illum corrupti et neque?
                </Tab>
            </Tabs>}
            code={'<Tabs>\n\t<Tab title="I am the first tab">\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!\n\t</Tab>\n\t<Tab title={<><Icon iconKey="home-alt" /> I have an icon</>}>\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Modi, commodi voluptates neque ad aspernatur at iste aut, vitae ab, eveniet quos. Adipisci, eligendi. Quisquam commodi voluptatem aperiam, aut aliquid nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. In molestiae, vero voluptates ex inventore quam autem id amet expedita corporis ipsum dolorum laboriosam eum necessitatibus aperiam illum corrupti et neque?\n\t</Tab>\n</Tabs>'}
        />

        <ResultCode
            title="Vertical"
            result={<Tabs vertical>
                <Tab title="I am the first tab">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!
                </Tab>
                <Tab title={<><Icon iconKey="home-alt" /> I have an icon</>}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, commodi voluptates neque ad aspernatur at iste aut, vitae ab, eveniet quos. Adipisci, eligendi. Quisquam commodi voluptatem aperiam, aut aliquid nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. In molestiae, vero voluptates ex inventore quam autem id amet expedita corporis ipsum dolorum laboriosam eum necessitatibus aperiam illum corrupti et neque?
                </Tab>
            </Tabs>}
            code={'<Tabs vertical>\n\t<Tab title="I am the first tab">\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!\n\t</Tab>\n\t<Tab title={<><Icon iconKey="home-alt" /> I have an icon</>}>\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Modi, commodi voluptates neque ad aspernatur at iste aut, vitae ab, eveniet quos. Adipisci, eligendi. Quisquam commodi voluptatem aperiam, aut aliquid nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. In molestiae, vero voluptates ex inventore quam autem id amet expedita corporis ipsum dolorum laboriosam eum necessitatibus aperiam illum corrupti et neque?\n\t</Tab>\n</Tabs>'}
        />

        <ResultCode
            title="Tab-styled"
            result={<Tabs tabStyle>
                <Tab title="I am the first tab">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!
                </Tab>
                <Tab title={<><Icon iconKey="home-alt" /> I have an icon</>}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, commodi voluptates neque ad aspernatur at iste aut, vitae ab, eveniet quos. Adipisci, eligendi. Quisquam commodi voluptatem aperiam, aut aliquid nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. In molestiae, vero voluptates ex inventore quam autem id amet expedita corporis ipsum dolorum laboriosam eum necessitatibus aperiam illum corrupti et neque?
                </Tab>
            </Tabs>}
            code={'<Tabs tabStyle>\n\t<Tab title="I am the first tab">\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!\n\t</Tab>\n\t<Tab title={<><Icon iconKey="home-alt" /> I have an icon</>}>\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Modi, commodi voluptates neque ad aspernatur at iste aut, vitae ab, eveniet quos. Adipisci, eligendi. Quisquam commodi voluptatem aperiam, aut aliquid nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. In molestiae, vero voluptates ex inventore quam autem id amet expedita corporis ipsum dolorum laboriosam eum necessitatibus aperiam illum corrupti et neque?\n\t</Tab>\n</Tabs>'}
        />

        <ResultCode
            title="Disabled"
            result={<Tabs>
                <Tab title="I am the first tab">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!
                </Tab>
                <Tab isDefault disabled title={<><Icon iconKey="home-alt" /> I am disabled</>}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, commodi voluptates neque ad aspernatur at iste aut, vitae ab, eveniet quos. Adipisci, eligendi. Quisquam commodi voluptatem aperiam, aut aliquid nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. In molestiae, vero voluptates ex inventore quam autem id amet expedita corporis ipsum dolorum laboriosam eum necessitatibus aperiam illum corrupti et neque?
                </Tab>
            </Tabs>}
            code={'<Tabs>\n\t<Tab title="I am the first tab">\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quam, officiis qui ut ipsam, voluptatum eius in saepe consequatur consectetur fugit perspiciatis ad doloribus placeat accusantium, omnis numquam cupiditate illo obcaecati!\n\t</Tab>\n\t<Tab disabled title={<><Icon iconKey="home-alt" /> I am disabled</>}>\n\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Modi, commodi voluptates neque ad aspernatur at iste aut, vitae ab, eveniet quos. Adipisci, eligendi. Quisquam commodi voluptatem aperiam, aut aliquid nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. In molestiae, vero voluptates ex inventore quam autem id amet expedita corporis ipsum dolorum laboriosam eum necessitatibus aperiam illum corrupti et neque?\n\t</Tab>\n</Tabs>'}
        />

        <Apis data={[
            {
                name: "Element children",
                desc: "The single tabs.",
                type: "Tab",
                required: true,
                onDoubleClick: () => goToApiBlock("#tabProps"),
                rowStyle: { backgroundColor: "var(--hoverblue)" }
            },
            {
                name: "vertical",
                desc: "Determines whether the tabs should be shown vertically.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "tabStyle",
                desc: "Changes the tabs style.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "style",
                desc: "Additional style for the tabs wrapper.",
                type: "CSSProperties",
                required: false,
                default: "null"
            },
            {
                name: "className",
                desc: "Additional className for the tabs wrapper.",
                type: "string",
                required: false,
                default: "null"
            },
            {
                name: "onChangeTab",
                desc: "Function triggered when clicking the tab.",
                type: "function",
                required: false,
                default: "null",
                fnParams: "Tab index (number)"
            }
        ]} />

        <Apis id="tabProps" title="Tab properties" data={[
            {
                name: "title",
                desc: "The title of the tab.",
                type: "string or ReactNode",
                required: true
            },
            {
                name: "isDefault",
                desc: "Determines whether the tab should be selected by default.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "disabled",
                desc: "Determines whether the tab should be disabled.",
                type: "boolean",
                required: false,
                default: "false"
            },
            {
                name: "style",
                desc: "Additional style for the tab.",
                type: "CSSProperties",
                required: false,
                default: "null"
            }
        ]} />
    </>
}