<template>
  <div class="settings" v-title="'Settings | Kubesmith'">
    <navigation current-link="/settings"></navigation>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';
import Navigation from '@/components/navigation';

export default {
  name: 'settings',
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
