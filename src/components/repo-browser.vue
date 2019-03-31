<template>
  <div class="browser">
      <div class="search">
        <input type="text" @keyup="performDebouncedSearch" placeholder="Search repositories ..."/>
      </div>
      <div class="actions">
        <div @mousedown="toggleFilters" class="button change-filters">
          <span class="text">Add Filters</span>
          <font-awesome-icon v-if="!toggledFilters" icon="caret-down"/>
          <font-awesome-icon v-if="toggledFilters" icon="times"/>
        </div>
        <div class="button add-repo">
          <font-awesome-icon icon="plus"/>
          <span class="text">Add Repo</span>
        </div>
      </div>
      <div :class="{toggled: toggledFilters}" class="filters">
          <span>filters will go here</span>
      </div>
      <div v-if="isFetchingRepos" class="loading">
        <loader/>
      </div>
      <div v-if="!isFetchingRepos" class="list">
        <div v-if="!repositories.length" class="not-found">No repositories were found.</div>
        <div
          @mousedown="setSelectedRepo(repo)"
          :class="{selected: isCurrentlySelected(repo.id)}"
          v-for="(repo, index) in repositories"
          :key="index" class="repo">
          <div class="name">
            <font-awesome-icon class="provider" :icon="getRepoProviderIcon(repo.provider)"/>
            <span>{{ repo.name }}</span>
            <el-tooltip effect="dark" content="This repository has builds running." placement="right">
              <loader v-if="repo.hasRunningBuilds"/>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import _ from 'lodash';
import Loader from '@/components/loader';

export default {
  name: 'repo-browser',
  data() {
    return {
      toggledFilters: false,
    };
  },
  created() {
    this.$store.dispatch('fetchRepos');
  },
  computed: {
    isFetchingRepos() {
      return this.$store.getters.isFetchingRepos;
    },
    repositories() {
      return this.$store.getters.getRepositories;
    },
    selectedRepoID() {
      return _.get(this.$store.getters.getSelectedRepo, 'id', 0);
    },
  },
  components: {
    Loader,
  },
  methods: {
    getRepoProviderIcon(provider) {
      const p = provider.toLowerCase();

      if (p === 'github') {
        return ['fab', 'github'];
      }

      if (p === 'bitbucket') {
        return ['fab', 'bitbucket'];
      }

      return 'layer-group';
    },
    performDebouncedSearch: _.debounce(function cb(event) {
      return this.performSearch(event.target.value);
    }, 250),
    performSearch(value) {
      this.$store.dispatch('searchRepos', value);
    },
    isCurrentlySelected(id) {
      return (this.selectedRepoID === id);
    },
    setSelectedRepo(repo) {
      this.$store.commit('setSelectedRepo', repo);
    },
    toggleFilters() {
      this.toggledFilters = !this.toggledFilters;
    },
  },
};
</script>

<style lang="stylus" scoped>
.browser
  flex 1
  height 100vh
  min-width 300px
  max-width 300px
  background-color #e9effc
  display flex
  flex-direction column
  align-items center
  color #333
  border-right 3px solid #5e9dce

  .loading
    flex 1
    margin-top 50px

    .loader
      font-size 120px
      color #a5c5e1

  .search
    width 100%
    text-align center
    padding 10px
    background-color #174f7c

    input[type="text"]
      padding 10px 20px
      text-align center
      color #333
      width 99%
      border-radius 10px
      border 3px solid #174f7c

      &::placeholder
        color #6d97dd
        font-size 14px

      &:focus
        border 3px solid #6d97dd

  .actions
    width 100%
    text-align center
    background-color #174f7c
    padding-bottom 14px

    .button
      padding 10px 14px
      font-size 12px
      line-height 12px
      text-transform uppercase
      cursor pointer
      transition-property background-color,color
      transition-duration .1s
      transition-timing-function ease-in-out
      user-select none
      background-color #3477ac
      color #fff
      display inline-block
      border-radius 20px

      &.change-filters

        svg
          margin-left 5px

      &.add-repo

        svg
          margin-right 5px

      &:hover
        background-color #0a3251

  .filters
    transition-property max-height, padding
    transition-duration .1s
    transition-timing-function linear
    background-color #174f7c
    color #fff
    width 100%
    text-align center
    border-bottom 3px solid #5e9dce
    max-height 0

    *
      visibility hidden

    &.toggled
      max-height 100%
      padding 20px

      *
        visibility visible

  .list
    flex 1
    width 100%
    overflow-y auto

    .not-found
      margin 40px 0
      text-align center
      color #174f7c
      font-style italic
      font-weight 100

    .repo
      border-bottom 1px solid #ddd
      background-color #fff
      padding 10px
      cursor pointer

      &:last-child
        border-bottom 3px solid #5e9dce

      &:hover
        background-color #f2f9ff

      .name
        color #555
        font-size 16px
        font-weight 300
        display flex
        align-items center

        span
          flex 1
          min-width 0
          white-space nowrap
          overflow hidden
          text-overflow ellipsis

        svg
          font-size 20px

          &.loader
            color #3477ac

          &.provider
            margin-right 10px

      &.selected

        .name
          font-weight bolder
          color #3477ac
</style>
