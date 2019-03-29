<template>
  <div class="sign-up" v-title="'Sign Up | Kubesmith'">
    <h1>Sign Up</h1>

    <router-link to="/login">
      Go Back
    </router-link>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';

export default {
  name: 'sign-up',
  directives: {
    TitleDirective,
  },
};
</script>

<style lang="stylus" scoped>
</style>
