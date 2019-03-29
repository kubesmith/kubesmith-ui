<template>
  <div class="navigation">
    <router-link class="logo" to="/builds">
      <div class="image">
        <LogoSVG/>
      </div>
    </router-link>
    <div class="main-links">
      <ul>
        <li>
          <span class="line"></span>
        </li>
        <li v-for="link in links" v-bind:key="link.url" :class="getLinkClasses(link.url)">
          <router-link :to="link.url">
            <font-awesome-icon :icon="link.icon"/> {{ link.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="quick-links">
      <ul>
        <li>
          <a href="javascript:void(0);" @click="logUserOut">
            <font-awesome-icon icon="sign-out-alt"/> Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
// eslint-disable-next-line
import LogoSVG from '@/images/kubesmith-dark.svg?import';

export default {
  name: 'navigation',
  props: ['currentLink'],
  components: {
    LogoSVG,
  },
  data: () => ({
    links: [
      {
        url: '/builds',
        name: 'Builds',
        icon: 'tools',
      }, {
        url: '/repositories',
        name: 'Repositories',
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
  }),
  methods: {
    getLinkClasses(link) {
      return {
        active: (this.currentLink === link),
      };
    },
    logUserOut: function logUserOut(event) {
      event.stopImmediatePropagation();
      event.preventDefault();

      Cookie.remove('token');
      this.$router.push('/login?logged-out');
    },
  },
};
</script>

<style scoped lang="stylus">
  .navigation
    flex 0 1 auto
    box-shadow 0 1px 2px rgba(3,49,86,.2)
    min-height 80px
    max-height 80px
    display flex

    ul
      margin 0
      padding 0
      display block
      height 80px
      position relative

      li
        display list-item
        float left
        list-style none
        height 80px
        padding 0 16px

        a
          display block
          vertical-align baseline
          line-height 80px
          transition color
          transition-duration .1s
          transition-timing-function ease-in-out

          svg
            margin-right 10px

          &:active
            margin-top 2px

          &:hover
            color #174f7c

        &:first-child
          padding 0 8px

    .logo
      flex 0 1 auto
      cursor pointer
      height 80px

      &:active
        margin-top 2px

      .image
        height 80px
        line-height 80px
        position relative
        float left
        width 100px

        svg
          height 56px
          width 70px
          position absolute
          top 50%
          left 50%
          margin-top -28px
          margin-left -35px

          path
            fill #174f7c

      .text
        float left
        line-height 80px
        height 80px
        text-transform uppercase
        font-weight 600
        color #174f7c

    .main-links
      flex 1

      .line
        background-color #e3e9ef
        display block
        position relative
        top 32px
        width 1px
        height 16px
        line-height 80px

      li.active

        a
          color #174f7c

    .quick-links
      flex 0 1 auto

      ul
        margin-right 10px

</style>
