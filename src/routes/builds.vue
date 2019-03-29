<template>
  <div class="builds" v-title="'Builds | Kubesmith'">
    <navigation current-link="/builds"></navigation>

    <div class="content">
      <div v-if="loading" class="loading">
        <font-awesome-icon icon="cog"/>
      </div>
      <div v-if="!loading" class="build-filters">
        <div class="filters">
          <div v-bind:class="{ selected: (currentFilter === 'active') }" class="filter first">Active</div>
          <div v-bind:class="{ selected: (currentFilter === 'completed') }" class="filter">Completed</div>
          <div v-bind:class="{ selected: (currentFilter === 'all') }" class="filter last">All</div>
        </div>
      </div>
      <div v-if="!loading" class="build-list">
        <build-row v-for="build in runningBuilds" v-bind:key="build.id" v-bind="build" />
        <build-row v-for="build in queuedBuilds" v-bind:key="build.id" v-bind="build" />
      </div>
    </div>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';
import Navigation from '@/components/navigation';
import BuildRow from '@/components/build-row';

export default {
  name: 'builds',
  components: {
    Navigation,
    BuildRow,
  },
  data: () => ({
    currentFilter: 'active',
    loading: false,
  }),
  computed: {
    runningBuilds: (function runningBuilds() {
      return this.$store.getters.getRunningBuilds;
    }),
    queuedBuilds: (function queuedBuilds() {
      return this.$store.getters.getQueuedBuilds;
    }),
    completedBuilds: (function completedBuilds() {
      return this.$store.getters.getCompletedBuilds;
    }),
  },
  directives: {
    TitleDirective,
  },
  created: (function mounted() {
    this.loading = true;
    this.$store.dispatch('getBuilds').then(() => {
      this.loading = false;
    });
  }),
};
</script>

<style lang="stylus" scoped>
.builds
  display flex
  flex-direction column
  justify-content center
  height 100vh
  box-sizing border-box

  .navigation
    flex 0 0 auto
    margin-bottom 2px

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

    .build-filters
      height auto
      text-align center
      margin 20px auto
      font-size 0

      .filters
        flex none
        display inline-block
        border-radius 7px
        background-color #fff
        overflow hidden
        border 1px solid #ddd

        .filter
          display inline-block
          padding 5px 20px
          cursor pointer
          font-size 16px
          user-select none
          transition-property background-color,color,border-color
          transition-duration 0.1s
          transition-timing-function ease-in-out
          border-left 1px solid #ddd

          &:hover
            background-color #729dc0
            color #fff
            border-color #729dc0

          &.selected
            background-color #174f7c
            color #fff

    .build-list
      width 900px
      height auto
      margin 20px auto

      .build
        margin-bottom 15px
</style>
