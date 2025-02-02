export class EventEmmiter {
  constructor() {
    this.listeners = {};
  }
  on(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }
  emit(eventName, payload = null) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((event) => {
        event(eventName, payload);
      });
    }
  }
}
