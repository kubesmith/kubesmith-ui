<template>
  <div class="build" v-title="'View Build | Kubesmith'">
    <navigation current-link="/builds"></navigation>

    <div class="content">
      <div v-if="true" class="loading">
        <font-awesome-icon icon="cog"/>
      </div>
    </div>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';
import Navigation from '@/components/navigation';

export default {
  name: 'build',
  props: {
    id: String,
  },
  computed: {},
  components: {
    Navigation,
  },
  directives: {
    TitleDirective,
  },
};
</script>

<style lang="stylus" scoped>
.build
  display flex
  flex-direction column
  min-height 100vh

  .content
    flex 1 1 auto
    overflow-y auto
    position relative

    .loading
      height auto
      margin 100px auto 0 auto
      text-align center
      font-size 200px
      color #eee

      svg
        animation spin 2s linear infinite
</style>
