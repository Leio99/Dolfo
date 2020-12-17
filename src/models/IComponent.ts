export interface IComponentList{
    readonly [x: string]: IComponent
}

export interface IComponent{
    readonly component?: any,
    readonly pageTitle?: string,
    readonly permission?: () => void,
    readonly hideMenu?: boolean
    readonly parentKey?: string
}