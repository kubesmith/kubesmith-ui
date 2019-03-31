// external dependencies
import Vue from 'vue';
import _ from 'lodash';

// internal dependencies
import mockBuilds from './mocks/builds';
import utils from './utils';

// constants
const buildKeys = utils.createAsyncKeys('build');
const stateData = {};

const getters = {
  isFetchingBuild: state => state[buildKeys.LOADING],
};

const mutations = {

  [buildKeys.SUCCESS](state, builds) {
    Vue.set(state, [buildKeys.LOADING], false);
    Vue.set(state, [buildKeys.STATE], builds);
  },

  [buildKeys.PENDING](state) {
    Vue.set(state, [buildKeys.LOADING], true);
  },

};

const actions = {

  fetchBuild(store, id) {
    store.commit(buildKeys.PENDING);

    setTimeout(() => {
      const found = _.find(mockBuilds, build => (build.id === id));

      if (!found) {
        store.commit(buildKeys.FAILURE);
        return;
      }

      store.commit(buildKeys.SUCCESS, found);
    }, Math.floor(Math.random(1000) + 250));
  },

};

// exports
export default {
  keys: {
    buildKeys,
  },
  state: stateData,
  getters,
  mutations,
  actions,
};
