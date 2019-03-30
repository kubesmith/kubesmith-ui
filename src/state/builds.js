// external dependencies
import Vue from 'vue';

// internal dependencies
import mockBuilds from './mocks/builds';
import utils from './utils';

// constants
const buildsKeys = utils.createAsyncKeys('builds');

const stateData = {
  buildFilterIndex: 0,
};

const getBuildsByState = (state, statuses) => {
  const data = state[buildsKeys.STATE];
  let values = statuses;

  if (!data) {
    return [];
  }

  if (statuses.constructor !== Array) {
    values = [statuses];
  }

  return data.filter(build => values.includes(build.status.toLowerCase()));
};

const getters = {
  getAllBuilds: state => state[buildsKeys.STATE],
  getActiveBuilds: state => getBuildsByState(state, 'running').concat(getBuildsByState(state, 'queued')),
  getRunningBuilds: state => getBuildsByState(state, 'running'),
  getQueuedBuilds: state => getBuildsByState(state, 'queued'),
  getCompletedBuilds: state => getBuildsByState(state, ['completed', 'failed', 'cancelled']),
  isFetchingBuilds: state => state[buildsKeys.LOADING],
  getBuildFilterIndex: state => state.buildFilterIndex,
};

const mutations = {

  [buildsKeys.SUCCESS](state, builds) {
    Vue.set(state, [buildsKeys.LOADING], false);
    Vue.set(state, [buildsKeys.STATE], builds);
  },

  [buildsKeys.PENDING](state) {
    Vue.set(state, [buildsKeys.LOADING], true);
  },

  setBuildFilterIndex(state, buildFilter) {
    Vue.set(state, 'buildFilterIndex', buildFilter);
  },

};

const actions = {

  fetchBuilds(store) {
    store.commit(buildsKeys.PENDING);

    setTimeout(() => {
      store.commit(buildsKeys.SUCCESS, mockBuilds);
    }, Math.floor(Math.random(1000) + 250));
  },

};

// exports
export default {
  keys: {
    buildsKeys,
  },
  state: stateData,
  getters,
  mutations,
  actions,
};
