export interface IComponentList{
    [x: string]: IComponent
}

export interface IComponent{
    component: any,
    pageTitle: string,
    permission?: () => void,
    hideMenu?: boolean
}