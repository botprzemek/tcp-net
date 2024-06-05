class EventBus {
    private listeners: { [event: string]: Array<(data?: any) => void> } = {};
  
    on(event: string, listener: (data?: any) => void): void {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(listener);
    }
  
    off(event: string, listener: (data?: any) => void): void {
      if (!this.listeners[event]) return;
      this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    }
  
    emit(event: string, data?: any): void {
      if (!this.listeners[event]) return;
      this.listeners[event].forEach(listener => listener(data));
    }
  }