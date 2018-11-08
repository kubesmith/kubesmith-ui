<template>
  <div class="login" v-title="'Login | Kubesmith'">
    <div class="background">
      <div class="shard-1"></div>
      <div class="shard-2"></div>
      <div class="shard-3"></div>
    </div>
    <div class="container">
      <div class="grid">
        testing
      </div>
    </div>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';
import Cookie from 'js-cookie';

export default {
  name: 'login',
  props: ['path'],
  data: () => ({
    email: '',
    password: '',
    loaderHeight: 0,
  }),
  directives: {
    TitleDirective,
  },
  computed: {
    signInIsEnabled() {
      return this.validateEmail(this.email) && (this.password !== '');
    },
  },
  methods: {
    validateEmail(email) {
      // eslint-disable-next-line
      const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexp.test(email.toLowerCase());
    },
    redirectUser() {
      let path = '/';
      if (this.path) {
        path = this.path;
      }
      Cookie.set('token', 'foobar');
      this.$router.push(path);
    },
    fakeLogin(event) {
      event.stopImmediatePropagation();
      event.preventDefault();
      this.redirectUser();
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
