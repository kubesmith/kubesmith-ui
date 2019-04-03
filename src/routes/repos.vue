<template>
  <div class="repos" v-title="'Repositories | Kubesmith'">
    <navigation current-link="/repos"></navigation>
    <repo-browser :selectedRepo="selectedRepo" :onRepoSelect="setSelectedRepo"/>
    <repo-viewer :repo="selectedRepo"/>
  </div>
</template>

<script>
import _ from 'lodash';
import repos from '@/state/mixins/repos';
import TitleDirective from '@/directives/title';
import Navigation from '@/components/navigation';
import RepoBrowser from '@/components/repo-browser';
import RepoViewer from '@/components/repo-viewer';

export default {
  name: 'repos',
  beforeDestroy() {
    this.$store.commit(repos.keys.REPOS_SELECTED, null);
    this.$store.commit(repos.keys.REPOS_DISPLAYED, null);
  },
  created() {
    this.$store.dispatch('fetchRepos').then(this.setupSelectedRepo);
  },
  components: {
    Navigation,
    RepoBrowser,
    RepoViewer,
  },
  computed: {
    selectedRepoID() {
      return _.get(this.selectedRepo, 'id');
    },
    selectedRepo() {
      return this.$store.getters.reposSelected;
    },
    repos() {
      return this.$store.getters.reposDisplayed;
    },
    cachedRepos() {
      return this.$store.getters.reposCache;
    },
  },
  directives: {
    TitleDirective,
  },
  methods: {
    setupSelectedRepo() {
      const { params } = this.$route;
      let repo;

      if (_.has(params, 'id')) {
        const id = _.parseInt(_.get(params, 'id', 0), 0);
        repo = this.cachedRepos[id];
      } else {
        repo = _.first(this.repos);
      }

      this.setSelectedRepo(repo);
    },
    setSelectedRepo(repo) {
      if (!repo) {
        return;
      }

      this.$store.commit(repos.keys.REPOS_SELECTED, repo);
    },
  },
  watch: {
    selectedRepo(repo) {
      const id = _.get(repo, 'id', false);

      if (!id) {
        return;
      }

      this.$router.push(`/repos/${id}`);
    },
  },
};
</script>

<style lang="stylus" scoped>
.repos
  display flex
  flex-direction row
  align-items flex-start

  .repo-browser
    flex 1
    height 100vh
    min-width 300px
    max-width 300px

  .repo-viewer
    flex 1
    height 100vh
</style>
