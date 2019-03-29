<template>
  <div class="teams" v-title="'Teams | Kubesmith'">
    <navigation current-link="/teams"></navigation>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';
import Navigation from '@/components/navigation';

export default {
  name: 'teams',
  components: {
    Navigation,
  },
  directives: {
    TitleDirective,
  },
};
</script>

<style lang="stylus" scoped>
.teams
  display flex
  flex-direction column
  min-height 100vh
</style>
