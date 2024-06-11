import type { IEventListener, ILooseObject, TEvents } from "./types";

export default class EventManager<TPredefinedEvents extends string = TEvents> {
  private listeners: Record<string, IEventListener<any>[]> = {};

  on<T extends any[]>(
    eventName: TPredefinedEvents,
    callback: IEventListener<T>,
  ): void {
    if (!(this.listeners as ILooseObject)[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }
  off<T extends any[]>(
    eventName: TPredefinedEvents,
    callback: IEventListener<T>,
  ): void {
    const eventListeners = this.listeners[eventName];
    if (eventListeners.length) {
      const index = eventListeners.indexOf(callback);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
  trigger<T extends any[]>(eventName: TPredefinedEvents, ...args: T): void {
    if ((this.listeners as ILooseObject)[eventName]) {
      for (const listener of this.listeners[eventName]) {
        listener(...args);
      }
    }
  }
}
