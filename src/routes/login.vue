<template>
  <div class="login" v-title="'Login | Kubesmith'">
    <div class="background">
      <div class="shard-1"></div>
      <div class="shard-2"></div>
      <div class="shard-3"></div>
    </div>
    <div class="container">
      <div class="grid">
        <div class="header">
          <LogoSVG />
          <h2>Welcome back</h2>
        </div>
        <form method="POST" @submit="fakeLogin" class="content">
          <div class="loader"></div>
          <input autocomplete="off" placeholder="Email" v-model="email" type="text"/>
          <input autocomplete="off" placeholder="Password" v-model="password" type="password"/>
          <button class="button blue" type="submit" :disabled="!signInIsEnabled">Sign in</button>
          <router-link to="/reset-password">Reset Password</router-link>
        </form>
        <div class="footer">
          <span>Need an account?</span><router-link to="/sign-up">Sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
// eslint-disable-next-line
import LogoSVG from '@/images/kubesmith-light.svg?import';
import TitleDirective from '@/directives/title';

export default {
  name: 'login',
  props: ['path'],
  components: {
    LogoSVG,
  },
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
      let { path } = this.$props;

      if (path === '') {
        path = '/';
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
.login
  background-color #174f7c
  background-image linear-gradient(120deg, #174f7c, #0d3d64)
  display flex
  flex-direction column
  justify-content center
  min-height 100vh
  overflow-x hidden

  .background
    position absolute
    bottom 0
    top 0
    left 0
    right 0
    z-index 0
    mix-blend-mode multiply

    .shard-1, .shard-2, .shard-3
      background-repeat no-repeat
      position absolute
      bottom 0
      top 0
      left 0
      right 0

    .shard-1
      background-image url(../images/background-shard-1.svg?normal)
      background-position 0 0
      background-size 464px 464px

    .shard-2
      background-image url(../images/background-shard-2.svg?normal)
      background-position 0 0
      background-size cover

    .shard-3
      background-image url(../images/background-shard-3.svg?normal)
      background-position right 100%
      background-size 747px 747px

  .container
    width 100%
    margin-left auto
    margin-right auto
    max-width 960px

    .grid
      position relative
      z-index 1
      width 33%
      margin-left 33%
      float left
      min-height 200px

      .header
        text-align center

        svg
          max-width 200px
          opacity(0.6)

        h2
          color #fff
          text-shadow 0 1px 2px rgba(3,49,86,.8)
          margin 0 0 30px 0
          font-size 24px
          font-weight 400
          line-height 3.2rem

      .content
        background-color #fff
        padding 40px 40px 20px 40px
        text-align center
        display flex
        flex-direction column
        border-radius 4px
        position relative
        overflow hidden

        .loader
          position absolute
          bottom 0
          left 0
          right 0
          height 0%
          background-color #f1f1f1
          border-radius 4px
          z-index 0

        button
          width 100%
          margin-bottom 10px
          flex 1
          z-index 1

        input
          flex 1
          margin-bottom 20px
          z-index 1

        a
          color #8ba7bd
          font-weight 500
          transition color
          transition-duration .35s
          transition-timing-function ease-in-out
          z-index 1

          &:hover
            color #1a98c9

      .footer
        margin-top 20px
        font-size 16px
        color #fff
        text-align center

        span
          margin-right 10px

        a
          color #40c3f6
          cursor pointer
          font-weight 500
          text-decoration none
          transition color
          transition-duration .35s
          transition-timing-function ease-in
</style>
