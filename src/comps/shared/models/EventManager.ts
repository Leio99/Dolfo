/** Allows to manage events in a better way
 * @constructor eventType (the type of event you want to manage)
 * @constructor callBack (the function that will be called when the event happens)
 * @constructor observe (the element that will be observed; by default it's window)
 */
export class EventManager<E extends Event = Event>{
  private callBack: (e: Event) => void
  private observe: HTMLElement | Window = window
  private eventType: string
  private _activateOnLoad = false
  private _options = null

  constructor(eventType: string, callBack: (e: E) => void, observe?: Window | HTMLElement) {
    this.eventType = eventType
    this.callBack = (e: Event) => callBack(e as E)
    
    if(observe)
      this.observe = observe
  }

  /** Fires the event when the "register" method is called
   * @returns this
   */
  activateOnRegister = (): this => {
    this._activateOnLoad = true
    return this
  }

  /** Allows to add options to the event
   * @param options boolean or EventListenerOptions
   * @returns this
   */
  addOptions = (options: boolean | EventListenerOptions): this => {
    this._options = options
    return this
  }

  /** Registers the event; usually called on component mount
   * @returns this
   */
  register = (): this => {
    if(this._activateOnLoad)
      this.callBack(new Event("load") as E)

    this.observe.addEventListener(this.eventType, this.callBack, this._options)
    return this
  }

  /** Unregisters the event; usually called on component unmount
   * @returns this
   */
  unregister = (): void => this.observe.removeEventListener(this.eventType, this.callBack, this._options)
}

/** Adds an EventManager instance to a list
 * @param list EventManager[]
 * @param newElement EventManager
 */
export const addToRegister = <T extends Event>(list: EventManager<T>[], newElement: EventManager<T>) => list.push(newElement.register())

/** Given a list of EventManager, unregisters all its events
 * @param list EventManager[]
 */
export const unregisterAll = <T extends Event>(list: EventManager<T>[]): void => list.forEach(e => e.unregister())