<template>
  <div class="repos" v-title="'Repositories | Kubesmith'">
    <navigation current-link="/repos"></navigation>
    <repo-browser :selectedRepoID="selectedRepositoryID" :onRepoSelect="setSelectedRepo"/>
    <repo-viewer :id="selectedRepositoryID"/>
  </div>
</template>

<script>
import _ from 'lodash';
import TitleDirective from '@/directives/title';
import Navigation from '@/components/navigation';
import RepoBrowser from '@/components/repo-browser';
import RepoViewer from '@/components/repo-viewer';

export default {
  name: 'repos',
  beforeDestroy() {
    this.$store.commit('clearSelectedRepo');
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
    selectedRepositoryID() {
      return _.get(this.selectedRepo, 'id');
    },
    selectedRepo() {
      return this.$store.getters.getSelectedRepo;
    },
    repositories() {
      return this.$store.getters.getRepos;
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
        repo = _.find(this.repositories, tmpRepo => (tmpRepo.id === id));
      } else {
        repo = _.first(this.repositories);
      }

      this.setSelectedRepo(repo);
    },
    setSelectedRepo(repo) {
      this.$store.commit('setSelectedRepo', repo);
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
