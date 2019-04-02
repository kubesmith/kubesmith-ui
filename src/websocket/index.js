// external dependencies
import _ from 'lodash';

// internal dependencies
import config from '@/config';
import websocket from '@/state/mixins/websocket';

// constants

const defaultSettings = {
  url: `${config.WEBSOCKET_URL}/v1/ws`,
  automaticOpen: true,
  reconnectInterval: 1000,
  maxReconnectInterval: 30000,
  reconnectDecay: 1.5,
  timeoutInterval: 2000,
  maxReconnectAttempts: null,

  // possible values are 'blob' and 'arraybuffer'
  binaryType: 'blob',
};

// classes

class Websocket {
  constructor(store, options) {
    this.store = store;
    this.settings = _.extend({}, defaultSettings, options);
    this.internal = {};

    if (this.settings.automaticOpen === true) {
      this.open();
    }
  }

  open() {
    // update the store
    this.connecting = true;
    this.timedOut = false;
    this.internal.forcedClose = false;

    // create a new websocket
    this.ws = new WebSocket(this.settings.url);
    this.ws.binaryType = this.settings.binaryType;

    // setup events
    this.ws.onopen = this.onSocketOpen.bind(this);
    this.ws.onclose = this.onSocketClose.bind(this);
    this.ws.onmessage = this.onSocketMessage.bind(this);
    this.ws.onerror = this.onSocketError.bind(this);

    // setup a timer to close after the timeout interval
    this.openTimeoutTimer = setTimeout(this.timeoutSocket, this.settings.timeoutInterval);
  }

  timeoutSocket() {
    this.timedOut = true;
    this.ws.close();
  }

  send(action, payload) {
    if (this.ws) {
      this.ws.send(JSON.stringify({
        action,
        payload,
      }));
    }
  }

  refresh() {
    if (this.ws) {
      this.ws.close();
    }
  }

  close(code, reason) {
    let errorCode = code;

    if (typeof code === 'undefined') {
      errorCode = 1000;
    }

    this.internal.forcedClose = true;
    if (this.ws) {
      this.ws.close(errorCode, reason);
    }
  }

  onSocketOpen() {
    clearTimeout(this.openTimeoutTimer);
    this.reconnectAttempts = 0;
    this.connecting = false;
    this.connected = true;
  }

  onSocketClose() {
    clearTimeout(this.openTimeoutTimer);

    this.ws = null;
    this.connected = false;

    if (this.internal.forcedClose) {
      return;
    }

    let timeout = this.settings.reconnectInterval * (this.settings.reconnectDecay ** this.reconnectAttempts);
    if (timeout >= this.settings.maxReconnectInterval) {
      timeout = this.settings.maxReconnectInterval;
    }

    setTimeout(() => {
      this.reconnectAttempts += 1;

      if (this.settings.maxReconnectAttempts && this.reconnectAttempts > this.settings.maxReconnectAttempts) {
        return;
      }

      this.open();
    }, timeout);
  }

  onSocketMessage(event) {
    let data = {};

    try {
      data = JSON.parse(event.data);
      this.websocketMessage = data;
    } catch (err) {
      //
    }
  }

  onSocketError() {
    this.websocketError = true;
  }

  set connecting(isConnecting) {
    this.store.commit(websocket.keys.WEBSOCKET_CONNECTING, !!isConnecting);
  }

  get connecting() {
    return this.store.getters.websocketConnecting;
  }

  set connected(isConnected) {
    this.store.commit(websocket.keys.WEBSOCKET_CONNECTED, !!isConnected);
  }

  get connected() {
    return this.store.getters.websocketConnected;
  }

  set reconnectAttempts(attempts) {
    this.store.commit(websocket.keys.WEBSOCKET_RECONNECT_ATTEMPTS, attempts);
  }

  get reconnectAttempts() {
    return this.store.getters.websocketReconnectAttempts;
  }

  set websocketError(error) {
    this.store.commit(websocket.keys.WEBSOCKET_ERROR, error);
  }

  get websocketError() {
    return this.store.getters.websocketError;
  }

  set websocketMessage(event) {
    this.store.commit(websocket.keys.WEBSOCKET_MESSAGE, event);
  }

  get websocketMessage() {
    return this.store.getters.websocketMessage;
  }

  set timedOut(timedOut) {
    this.store.commit(websocket.keys.WEBSOCKET_TIMED_OUT, timedOut);
  }

  get timedOut() {
    return this.store.getters.websocketTimedOut;
  }
}

// exports
export default {
  install(Vue, options) {
    if (!options.store) {
      throw new Error('The Websocket plugin requires a store to install.');
    }

    const { store } = options;
    _.unset(options, 'store');

    // eslint-disable-next-line
    Vue.prototype.$websocket = new Websocket(store, options);
  },
};
