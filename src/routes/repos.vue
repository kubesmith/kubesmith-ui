<template>
  <div class="repos" v-title="'Repositories | Kubesmith'">
    <navigation current-link="/repos"></navigation>
    <repo-browser/>

    <div class="content">
    </div>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';
import Navigation from '@/components/navigation';
import RepoBrowser from '@/components/repo-browser';

export default {
  name: 'repos',
  components: {
    Navigation,
    RepoBrowser,
  },
  directives: {
    TitleDirective,
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
