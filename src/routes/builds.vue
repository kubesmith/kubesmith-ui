<template>
  <div class="builds" v-title="'Builds | Kubesmith'">
    <navigation current-link="/builds"/>

    <div class="build-filters">
      <toolbar :onSelect="toolbarOnSelect" :index="buildFilterIndex" :values="toolbarValues"/>
      <font-awesome-icon
        @mousedown="toolbarOnSelect(buildFilterIndex)"
        :class="{disabled: isFetchingBuilds}"
        class="refresh"
        v-tooltip="'Refresh'"
        icon="sync-alt"/>
    </div>

    <div class="content">
      <div v-if="isFetchingBuilds" class="loading">
        <font-awesome-icon icon="cog"/>
      </div>
      <div v-if="!isFetchingBuilds" class="build-list">
        <build-row v-for="(build, index) in builds" v-bind:key="index" v-bind="build" />
      </div>
    </div>
  </div>
</template>

<script>
import TitleDirective from '@/directives/title';
import Navigation from '@/components/navigation';
import BuildRow from '@/components/build-row';
import Toolbar from '@/components/toolbar';

export default {
  name: 'builds',
  components: {
    Navigation,
    BuildRow,
    Toolbar,
  },
  data: () => ({
    toolbarValues: ['Active', 'Completed', 'All'],
  }),
  computed: {
    isFetchingBuilds: (function isFetchingBuilds() {
      return this.$store.getters.isFetchingBuilds;
    }),
    builds: (function builds() {
      const index = this.$store.getters.getBuildFilterIndex;

      if (index === 0) {
        return this.$store.getters.getActiveBuilds;
      }

      if (index === 1) {
        return this.$store.getters.getCompletedBuilds;
      }

      if (index === 2) {
        return this.$store.getters.getAllBuilds;
      }

      return [];
    }),
    buildFilterIndex: (function buildFilterIndex() {
      return this.$store.getters.getBuildFilterIndex;
    }),
  },
  directives: {
    TitleDirective,
  },
  created: (function mounted() {
    this.$store.dispatch('fetchBuilds');
  }),
  destroyed: (function destroyed() {
    this.$store.commit('setBuildFilterIndex', 0);
  }),
  methods: {
    toolbarOnSelect: (function toolbarOnSelect(index) {
      this.$store.commit('setBuildFilterIndex', index);
      this.$store.dispatch('fetchBuilds');
    }),
  },
};
</script>

<style lang="stylus" scoped>
.builds
  display flex
  flex-direction column
  justify-content center
  height 100vh

  .navigation
    flex 0 0 auto
    margin-bottom 2px

  .build-filters
    flex 0 0 auto
    height auto
    text-align center
    font-size 0
    display flex
    justify-content center
    align-items center
    padding 20px 0
    border-bottom 1px solid #ddd
    background-color #f0f5f9

    .toolbar
      border 0px

    .refresh
      font-size 24px
      cursor pointer
      margin 0
      margin-left 20px

      &.disabled
        cursor default
        color #ccc

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

    .build-list
      width 900px
      height auto
      margin 20px auto

      .build
        margin-bottom 15px
</style>
