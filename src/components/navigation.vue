<template>
  <div class="navigation">
    <header>
      <div class="logo">
        <router-link to="/">
          <LogoSVG/>
        </router-link>
      </div>
    </header>
    <section class="profile">
      <avatar/>
    </section>
    <nav>
      <ul>
        <li :class="{current: isCurrentLink(link.url)}" v-for="(link, index) in links" :key="index">
          <router-link :to="link.url">
            <font-awesome-icon :icon="link.icon"/>
            <div class="caption">{{ link.name }}</div>
          </router-link>
        </li>
      </ul>
    </nav>
    <footer @mousedown="logUserOut">
      <font-awesome-icon icon="sign-out-alt"/>
    </footer>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import Avatar from '@/components/avatar';
// eslint-disable-next-line
import LogoSVG from '@/images/kubesmith-dark.svg?import';

export default {
  name: 'navigation',
  props: {
    currentLink: String,
  },
  components: {
    LogoSVG,
    Avatar,
  },
  data() {
    return {
      links: [
        {
          url: '/repos',
          name: 'Repos',
          icon: 'layer-group',
        }, {
          url: '/teams',
          name: 'Teams',
          icon: 'users',
        }, {
          url: '/settings',
          name: 'Settings',
          icon: 'cogs',
        },
      ],
    };
  },
  methods: {
    isCurrentLink(url) {
      return (this.currentLink === url);
    },
    logUserOut(event) {
      event.stopImmediatePropagation();
      event.preventDefault();

      Cookie.remove('token');
      this.$router.push('/login?logged-out');
    },
  },
};
</script>

<style scoped lang="stylus">
$logoPadding = 20px
$logoMovement = 3px

  .navigation
    width 100px
    height 100vh
    display flex
    background-color #ddd
    align-items center
    justify-content flex-start
    color #fff
    flex-direction column
    text-align center
    background-color #174f7c
    border-right 3px solid #5e9dce

    header
      flex 0
      width 100%
      background-color #174f7c

      .logo
        width 100%
        text-align center
        margin 0 auto
        padding $logoPadding 0
        cursor pointer
        user-select none

        svg
          width 80%

          path
            fill #fff

        &:active
          padding-bottom ($logoPadding - $logoMovement)

          svg
            margin-top $logoMovement

    section.profile
      width 100%
      user-select none

      .avatar
        margin 20px 0
        max-width 70%
        border 3px solid #65aee6

    nav
      flex 1
      width 100%

      ul
        margin 0
        list-style none
        padding 0

        li
          cursor pointer
          user-select none
          line-height 0

          a
            display block
            padding $logoPadding 0
            transition-property background-color
            transition-duration .1s
            transition-timing-function ease-in-out

            svg
              font-size 40px
              color #a6cbe7
              margin-bottom 10px

            .caption
              text-transform uppercase
              font-size 12px
              line-height 12px
              color #c2d9ea

            &:hover
              background-color #054170

          &:active

            a
              padding-bottom ($logoPadding - $logoMovement)

              svg
                margin-top $logoMovement

          &.current
            background-color #3477ac

            &:active

              a
                padding $logoPadding 0

                svg
                  margin-top 0

            a

              svg, .caption
                color #fff

              &:hover
                background-color inherit
                cursor default

    footer
      flex 0
      width 100%
      padding 20px 0
      cursor pointer

      svg
        font-size 30px
        color #a6cbe7

      &:hover
        background-color #054170

</style>
