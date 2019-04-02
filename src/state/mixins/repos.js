// external dependencies
import Vue from 'vue';
import axios from 'axios';

// internal dependencies
import utils from '../utils';
import config from '@/config';

// constants
const reposKeys = utils.createAsyncKeys('repos');
const stateData = {
  selectedRepo: {},
};

const getters = {
  isFetchingRepos: state => state[reposKeys.LOADING],
  getRepos: state => state[reposKeys.STATE],
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

  [reposKeys.FAILURE](state, error) {
    Vue.set(state, [reposKeys.LOADING], false);
    Vue.set(state, [reposKeys.FAILURE], error);
  },

  setSelectedRepo(state, repo) {
    Vue.set(state, 'selectedRepo', repo);
  },

  clearSelectedRepo(state) {
    Vue.set(state, 'selectedRepo', null);
  },

};

const actions = {

  fetchRepos(store) {
    store.commit(reposKeys.PENDING);

    return axios.get(`${config.API_URL}/v1/repos/`)
      .then((response) => {
        store.commit(reposKeys.SUCCESS, response.data);
      })
      .catch((error) => {
        store.commit(reposKeys.FAILURE, error);
      });
  },

  searchRepos() {
    // return new Promise((resolve) => {
    //   store.commit(reposKeys.PENDING);

    //   setTimeout(() => {
    //     let repos = mockRepos;

    //     if (searchText.length > 0) {
    //       repos = _.filter(mockRepos, repo => (new RegExp(`${searchText}`, 'i').test(repo.name)));
    //     }

    //     store.commit(reposKeys.SUCCESS, repos);
    //     resolve();
    //   }, Math.floor(Math.random(1000) + 250));
    // });
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
