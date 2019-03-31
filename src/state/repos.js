// external dependencies
import Vue from 'vue';
import _ from 'lodash';

// internal dependencies
import mockRepos from './mocks/repos';
import utils from './utils';

// constants
const reposKeys = utils.createAsyncKeys('repos');
const stateData = {
  selectedRepo: {},
};

const getters = {
  isFetchingRepos: state => state[reposKeys.LOADING],
  getRepositories: state => state[reposKeys.STATE],
  getSelectedRepo: state => state.selectedRepo,
};

const mutations = {

  [reposKeys.SUCCESS](state, builds) {
    Vue.set(state, [reposKeys.LOADING], false);
    Vue.set(state, [reposKeys.STATE], builds);
  },

  [reposKeys.PENDING](state) {
    Vue.set(state, [reposKeys.LOADING], true);
  },

  setSelectedRepo(state, repo) {
    Vue.set(state, 'selectedRepo', repo);
  },

};

const actions = {

  fetchRepos(store) {
    store.commit(reposKeys.PENDING);

    setTimeout(() => {
      store.commit('setSelectedRepo', _.first(mockRepos));
      store.commit(reposKeys.SUCCESS, mockRepos);
    }, Math.floor(Math.random(1000) + 250));
  },

  searchRepos(store, searchText) {
    store.commit(reposKeys.PENDING);

    setTimeout(() => {
      let repos = mockRepos;

      if (searchText.length > 0) {
        repos = _.filter(mockRepos, repo => (new RegExp(`${searchText}`, 'i').test(repo.name)));
      }

      store.commit('setSelectedRepo', 0);
      store.commit(reposKeys.SUCCESS, repos);
    }, Math.floor(Math.random(1000) + 250));
  },

};

// exports
export default {
  keys: {
    reposKeys,
  },
  state: stateData,
  getters,
  mutations,
  actions,
};
