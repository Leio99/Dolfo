export interface IComponentList{
    readonly [x: string]: IComponent
}

export interface IComponent{
    readonly Component?: any,
    readonly pageTitle?: string,
    readonly permission?: () => void,
    readonly hideMenu?: boolean
    readonly parentKey?: string
}