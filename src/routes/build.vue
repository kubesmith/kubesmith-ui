<template>
  <div class="build" v-title="'View Build | Kubesmith'">
    <navigation current-link="/builds"></navigation>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';
import Navigation from '@/components/navigation';

export default {
  name: 'build',
  props: {
    id: String,
  },
  components: {
    Navigation,
  },
  directives: {
    TitleDirective,
  },
};
</script>

<style lang="stylus" scoped>
</style>
