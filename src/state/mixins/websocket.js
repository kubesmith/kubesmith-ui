// external dependencies
import Vue from 'vue';
import _ from 'lodash';

// constants
const keys = {
  WEBSOCKET_CONNECTING: 'WEBSOCKET_CONNECTING',
  WEBSOCKET_CONNECTED: 'WEBSOCKET_CONNECTED',
  WEBSOCKET_RECONNECT_ATTEMPTS: 'WEBSOCKET_RECONNECT_ATTEMPTS',
  WEBSOCKET_ERROR: 'WEBSOCKET_ERROR',
  WEBSOCKET_MESSAGE: 'WEBSOCKET_MESSAGE',
  WEBSOCKET_TIMED_OUT: 'WEBSOCKET_TIMED_OUT',
};

const stateData = {
  [keys.WEBSOCKET_CONNECTED]: false,
  [keys.WEBSOCKET_CONNECTING]: false,
  [keys.WEBSOCKET_RECONNECT_ATTEMPTS]: 0,
  [keys.WEBSOCKET_ERROR]: null,
  [keys.WEBSOCKET_MESSAGE]: null,
  [keys.WEBSOCKET_TIMED_OUT]: false,
};

const getters = {

  websocketConnected: state => state[keys.WEBSOCKET_CONNECTED],
  websocketConnecting: state => state[keys.WEBSOCKET_CONNECTING],
  websocketReconnectAttempts: state => state[keys.WEBSOCKET_RECONNECT_ATTEMPTS],
  websocketError: state => state[keys.WEBSOCKET_ERROR],
  websocketMessage: state => state[keys.WEBSOCKET_MESSAGE],
  websocketTimedOut: state => state[keys.WEBSOCKET_TIMED_OUT],

};

const mutations = {

  [keys.WEBSOCKET_CONNECTED](state, connected) {
    Vue.set(state, [keys.WEBSOCKET_CONNECTED], !!connected);
  },

  [keys.WEBSOCKET_CONNECTING](state, connecting) {
    Vue.set(state, [keys.WEBSOCKET_CONNECTING], !!connecting);
  },

  [keys.WEBSOCKET_RECONNECT_ATTEMPTS](state, attempts) {
    Vue.set(state, [keys.WEBSOCKET_RECONNECT_ATTEMPTS], _.parseInt(attempts, 0));
  },

  [keys.WEBSOCKET_ERROR](state, error) {
    Vue.set(state, [keys.WEBSOCKET_ERROR], error);
  },

  [keys.WEBSOCKET_MESSAGE](state, message) {
    Vue.set(state, [keys.WEBSOCKET_MESSAGE], message);

    // todo
    // eslint-disable-next-line
    console.log(message.action, message.payload);
  },

  [keys.WEBSOCKET_TIMED_OUT](state, timedOut) {
    Vue.set(state, [keys.WEBSOCKET_TIMED_OUT], timedOut);
  },

};

const actions = {};

// exports
export default {
  keys,
  state: stateData,
  getters,
  mutations,
  actions,
};
