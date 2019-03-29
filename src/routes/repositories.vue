<template>
  <div class="repositories" v-title="'Repositories | Kubesmith'">
    <navigation current-link="/repositories"></navigation>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';
import Navigation from '@/components/navigation';

export default {
  name: 'repositories',
  components: {
    Navigation,
  },
  directives: {
    TitleDirective,
  },
};
</script>

<style lang="stylus" scoped>
.repositories
  display flex
  flex-direction column
  min-height 100vh
</style>
