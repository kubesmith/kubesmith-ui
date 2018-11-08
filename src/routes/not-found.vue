<template>
  <div class="not-found" v-title="'404 - Not Found | Kubesmith'">
    <h1>Oh no!</h1>
    <h2>How embarrassing?</h2>
    <router-link to="/">Go Home</router-link>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';

export default {
  name: 'not-found',
  directives: {
    TitleDirective,
  },
};
</script>

<style lang="stylus" scoped>
.not-found
  text-decoration underline
</style>
