<template>
  <div class="reset-password" v-title="'Reset Password | Kubesmith'">
    <h1>Reset Password</h1>

    <router-link to="/login">
      Go Back
    </router-link>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';

export default {
  name: 'reset-password',
  directives: {
    TitleDirective,
  },
};
</script>

<style lang="stylus" scoped>
</style>
