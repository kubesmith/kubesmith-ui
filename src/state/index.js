// external dependencies
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

// internal dependencies
import builds from './builds';
import build from './build';
import repos from './repos';

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
stateObject = _.merge(stateObject, builds);
stateObject = _.merge(stateObject, build);
stateObject = _.merge(stateObject, repos);

// exports
export default new Vuex.Store(stateObject);
