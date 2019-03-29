<template>
  <div class="dashboard" v-title="'Dashboard | Kubesmith'">
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';

export default {
  name: 'login',
  directives: {
    TitleDirective,
  },
};
</script>

<style lang="stylus" scoped>
</style>
