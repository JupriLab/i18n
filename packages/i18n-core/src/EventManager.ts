import type { IEventListener, ILooseObject } from "./types";

export default class EventManager {
  private listeners: Record<string, IEventListener<any>[]> = {};

  on<T extends any[]>(eventName: string, callback: IEventListener<T>): void {
    if (!(this.listeners as ILooseObject)[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }
  trigger<T extends any[]>(eventName: string, ...args: T): void {
    if ((this.listeners as ILooseObject)[eventName]) {
      for (const listener of this.listeners[eventName]) {
        listener(...args);
      }
    }
  }
}
