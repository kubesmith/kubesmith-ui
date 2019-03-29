// external dependencies
import Vue from 'vue';
import Vuex from 'vuex';

// internal dependencies
import mockBuilds from './mocks/builds';

// constants
const BUILD_STATUS_RUNNING = 'running';
const BUILD_STATUS_QUEUED = 'queued';
const BUILD_STATUS_COMPLETED = 'completed';
const BUILD_STATUS_FAILED = 'failed';
const BUILD_STATUS_CANCELLED = 'cancelled';
const COMPLETED_BUILD_STATUSES = [BUILD_STATUS_COMPLETED, BUILD_STATUS_FAILED, BUILD_STATUS_CANCELLED];

// requirements
Vue.use(Vuex);

// exports
export default new Vuex.Store({
  state: {
    builds: [],
  },
  getters: {
    getRunningBuilds: state => state.builds.filter(build => (build.status.toLowerCase() === BUILD_STATUS_RUNNING)),
    getQueuedBuilds: state => state.builds.filter(build => (build.status.toLowerCase() === BUILD_STATUS_QUEUED)),
    getCompletedBuilds: state => state.builds.filter(build => (COMPLETED_BUILD_STATUSES
      .includes(build.status.toLowerCase()))),
  },
  mutations: {
    setBuilds: (state, builds) => {
      state.builds = builds;
    },
  },
  actions: {
    getBuilds: ({ commit }) => new Promise((resolve) => {
      setTimeout(() => {
        commit('setBuilds', mockBuilds);
        resolve();
      }, Math.ceil(Math.random(3000) + 1000));
    }),
  },
});
