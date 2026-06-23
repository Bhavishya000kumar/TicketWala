// CineVerse WebSocket Client Socket manager
// Prepared for real-time seat mapping synchronization (Socket.io)

import { ENV } from '../config/env';

// Placeholder client instance. 
// Swap with `import { io } from 'socket.io-client'` for production.
class MockSocketClient {
  constructor() {
    this.connected = false;
    this.listeners = {};
    this.url = ENV.API_BASE_URL.replace('/api', '');
  }

  connect() {
    console.log(`[WebSocket] Connecting to socket service at: ${this.url}`);
    this.connected = true;
    this.trigger('connect', null);
  }

  disconnect() {
    console.log('[WebSocket] Disconnected from socket service.');
    this.connected = false;
    this.trigger('disconnect', null);
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit(event, data) {
    console.log(`[WebSocket] Client EMIT -> Event: "${event}"`, data);
    // Simulate echo from backend for seat locks
    if (event === 'lockSeat') {
      setTimeout(() => {
        this.trigger('seatStatusChanged', {
          seatId: data.seatId,
          showtimeId: data.showtimeId,
          status: 'locked',
          lockedBy: data.userId || 'anonymous'
        });
      }, 500);
    }
  }

  trigger(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
}

export const socket = new MockSocketClient();
export default socket;
