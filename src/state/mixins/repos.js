// external dependencies
import Vue from 'vue';
// import axios from 'axios';

// internal dependencies
// import config from '@/config';

// constants
const keys = {
  REPOS_PENDING: 'REPOS_PENDING',
  REPOS_LOADING: 'REPOS_LOADING',
  REPOS_LOADED: 'REPOS_LOADED',
  REPOS_CACHE: 'REPOS_CACHE',
  REPOS_SELECTED: 'REPOS_SELECTED',
};

const stateData = {
  [keys.REPOS_PENDING]: false,
  [keys.REPOS_LOADING]: false,
  [keys.REPOS_LOADED]: false,
  [keys.REPOS_CACHE]: {},
  [keys.REPOS_SELECTED]: null,
};

const getters = {

  reposPending: state => state[keys.REPOS_PENDING],
  reposLoading: state => state[keys.REPOS_LOADING],
  reposLoaded: state => state[keys.REPOS_LOADED],
  reposCache: state => state[keys.REPOS_CACHE],
  reposSelected: state => state[keys.REPOS_SELECTED],

};

const mutations = {

  [keys.REPOS_PENDING](state, pending) {
    Vue.set(state, [keys.REPOS_PENDING], pending);
  },

};

const actions = {

  fetchRepos() {
    // store.commit(repoKeys.PENDING);

    // return axios.get(`${config.API_URL}/v1/repos/`)
    //   .then((response) => {
    //     store.commit(repoKeys.SUCCESS, response.data);
    //   })
    //   .catch((error) => {
    //     store.commit(repoKeys.FAILURE, error);
    //   });
  },

  searchRepos(store) {
    if (store.getters.websocketConnected) {
      // search locally
    } else {
      // search remotely
    }

    // return new Promise((resolve) => {
    //   store.commit(repoKeys.PENDING);

    //   setTimeout(() => {
    //     let repos = mockRepos;

    //     if (searchText.length > 0) {
    //       repos = _.filter(mockRepos, repo => (new RegExp(`${searchText}`, 'i').test(repo.name)));
    //     }

    //     store.commit(repoKeys.SUCCESS, repos);
    //     resolve();
    //   }, Math.floor(Math.random(1000) + 250));
    // });
  },

};

// exports
export default {
  keys,
  state: stateData,
  getters,
  mutations,
  actions,
};
