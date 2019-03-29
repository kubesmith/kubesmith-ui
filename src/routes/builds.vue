<template>
  <div class="builds" v-title="'Builds | Kubesmith'">
    <navigation current-link="/builds"></navigation>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';
import Navigation from '@/components/navigation';

export default {
  name: 'builds',
  components: {
    Navigation,
  },
  directives: {
    TitleDirective,
  },
};
</script>

<style lang="stylus" scoped>
.builds
  display flex
  flex-direction column
  min-height 100vh
</style>
