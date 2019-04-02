// external dependencies
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

// internal dependencies
import repos from '@/state/mixins/repos';
import websocket from '@/state/mixins/websocket';

// requirements
Vue.use(Vuex);

// variables
let stateObject = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
};

// mixins
stateObject = _.merge(stateObject, repos);
stateObject = _.merge(stateObject, websocket);

// exports
export default new Vuex.Store(stateObject);
