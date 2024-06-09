import EventManager from "../src/EventManager";
import type { IEventListener } from "../src/types";

describe("EventManager", () => {
  let eventManager: EventManager;

  beforeEach(() => {
    eventManager = new EventManager();
  });

  it("registers an event listener", () => {
    const eventName = "testEvent";
    const callback: IEventListener<[string]> = jest.fn();
    eventManager.on(eventName, callback);

    expect(eventManager["listeners"][eventName]).toHaveLength(1);
    expect(eventManager["listeners"][eventName][0]).toBe(callback);
  });

  it("removes an event listener", () => {
    const eventName = "testEvent";
    const callback: IEventListener<[string]> = jest.fn();
    eventManager.on(eventName, callback);

    eventManager.off(eventName, callback);

    expect(eventManager["listeners"][eventName]).toEqual([]);
  });

  it("does nothing if the event listener is not registered", () => {
    const eventName = "testEvent";
    const callback: IEventListener<[string]> = jest.fn();
    eventManager.on(eventName, callback);

    eventManager.off(eventName, jest.fn());

    expect(eventManager["listeners"][eventName]).toEqual([callback]);
  });

  it("removes the correct event listener if multiple listeners are registered", () => {
    const eventName = "testEvent";
    const callback1: IEventListener<[string]> = jest.fn();
    const callback2: IEventListener<[string]> = jest.fn();
    eventManager.on(eventName, callback1);
    eventManager.on(eventName, callback2);

    eventManager.off(eventName, callback1);

    expect(eventManager["listeners"][eventName]).toEqual([callback2]);
  });

  it("removes all event listeners for an event", () => {
    const eventName = "testEvent";
    const callback1: IEventListener<[string]> = jest.fn();
    const callback2: IEventListener<[string]> = jest.fn();
    eventManager.on(eventName, callback1);
    eventManager.on(eventName, callback2);

    eventManager.off(eventName, callback1);
    eventManager.off(eventName, callback2);

    expect(eventManager["listeners"][eventName]).toEqual([]);
  });
});
