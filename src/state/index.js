// external dependencies
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

// internal dependencies
import repos from './mixins/repos';

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

// exports
export default new Vuex.Store(stateObject);
