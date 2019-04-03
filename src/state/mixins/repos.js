// external dependencies
import Vue from 'vue';
import axios from 'axios';
import _ from 'lodash';

// internal dependencies
import config from '@/config';

// constants
const keys = {
  REPOS_ERROR: 'REPOS_ERROR',
  REPOS_LOADING: 'REPOS_LOADING',
  REPOS_LOADED: 'REPOS_LOADED',
  REPOS_CACHE: 'REPOS_CACHE',
  REPOS_SELECTED: 'REPOS_SELECTED',
  REPOS_DISPLAYED: 'REPOS_DISPLAYED',
};

const stateData = {
  [keys.REPOS_ERROR]: false,
  [keys.REPOS_LOADING]: false,
  [keys.REPOS_LOADED]: false,
  [keys.REPOS_CACHE]: {},
  [keys.REPOS_SELECTED]: null,
  [keys.REPOS_DISPLAYED]: [],
};

const getters = {

  reposLoading: state => state[keys.REPOS_LOADING],
  reposLoaded: state => state[keys.REPOS_LOADED],
  reposCache: state => state[keys.REPOS_CACHE],
  reposSelected: state => state[keys.REPOS_SELECTED],
  reposError: state => state[keys.REPOS_ERROR],
  reposDisplayed: state => state[keys.REPOS_DISPLAYED],

};

const mutations = {

  [keys.REPOS_LOADING](state, loading) {
    Vue.set(state, [keys.REPOS_LOADING], !!loading);
  },

  [keys.REPOS_LOADED](state, loaded) {
    Vue.set(state, [keys.REPOS_LOADING], false);
    Vue.set(state, [keys.REPOS_LOADED], !!loaded);
  },

  [keys.REPOS_CACHE](state, repo) {
    const cache = state[keys.REPOS_CACHE];
    cache[repo.id] = repo;

    Vue.set(state, [keys.REPOS_CACHE], cache);
  },

  [keys.REPOS_SELECTED](state, selected) {
    Vue.set(state, [keys.REPOS_SELECTED], selected);
  },

  [keys.REPOS_ERROR](state, error) {
    Vue.set(state, [keys.REPOS_LOADING], false);
    Vue.set(state, [keys.REPOS_ERROR], error);
  },

  [keys.REPOS_DISPLAYED](state, repos) {
    if (!_.isArray(repos)) {
      return;
    }

    Vue.set(state, [keys.REPOS_DISPLAYED], repos);
  },

};

const actions = {

  fetchRepos(store) {
    if (store.getters.reposLoaded === true) {
      return Promise.resolve(store.getters.repoCache);
    }

    store.commit(keys.REPOS_LOADING, true);
    return axios.get(`${config.API_URL}/v1/repos/`)
      .then((response) => {
        if (!_.isArray(response.data)) {
          store.commit(keys.REPOS_ERROR, new Error('expected array'));
          return;
        }

        response.data.forEach((repo) => {
          if (!repo.id) {
            return;
          }

          store.commit(keys.REPOS_CACHE, repo);
        });

        store.commit(keys.REPOS_LOADED, true);
        store.commit(keys.REPOS_DISPLAYED, _.values(store.getters.reposCache));
      })
      .catch((error) => {
        store.commit(keys.REPOS_ERROR, error);
      });
  },

  searchRepos(store, searchText) {
    return store.dispatch('fetchRepos').then(() => {
      let repos = _.values(store.getters.reposCache);

      if (searchText.length > 0) {
        repos = _.filter(repos, repo => (new RegExp(`${searchText}`, 'i').test(repo.name)));
      }

      store.commit(keys.REPOS_DISPLAYED, repos);
    });
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
