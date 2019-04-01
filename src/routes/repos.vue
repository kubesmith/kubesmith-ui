<template>
  <div class="repos" v-title="'Repositories | Kubesmith'">
    <navigation current-link="/repos"></navigation>
    <repo-browser/>

    <div class="content">
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import TitleDirective from '@/directives/title';
import Navigation from '@/components/navigation';
import RepoBrowser from '@/components/repo-browser';

export default {
  name: 'repos',
  created() {
    this.$store.dispatch('fetchRepos').then(this.setupSelectedRoute);
  },
  components: {
    Navigation,
    RepoBrowser,
  },
  computed: {
    selectedRepo() {
      return this.$store.getters.getSelectedRepo;
    },
    repositories() {
      return this.$store.getters.getRepositories;
    },
  },
  directives: {
    TitleDirective,
  },
  methods: {
    setupSelectedRoute() {
      const repoID = _.parseInt(this.$route.params.id, 10);
      let repo;

      if (!repoID) {
        repo = _.first(this.repositories);
      } else {
        repo = _.find(this.repositories, tmpRepo => (tmpRepo.id === repoID));
      }

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

  .content
    flex 1
    height 100vh
</style>
