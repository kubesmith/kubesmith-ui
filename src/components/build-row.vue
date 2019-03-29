<template>
  <div class="build">
    <aside class="left" v-bind:class="[statusClass]">
      <div class="avatar">
        <img :src="author.avatar"/>
      </div>
      <font-awesome-icon v-if="statusClass == 'running'" icon="cog"/>
      <font-awesome-icon v-if="statusClass == 'completed'" icon="check"/>
      <font-awesome-icon v-if="statusClass == 'cancelled'" icon="ban"/>
      <font-awesome-icon v-if="statusClass == 'queued'" :icon="['far', 'clock']"/>
      <font-awesome-icon v-if="statusClass == 'failed'" icon="times"/>
    </aside>
    <div class="content">
      <div class="message">{{ message }}</div>
      <div class="meta">
        <div class="data repository">
          <a href="#">
            <font-awesome-icon icon="layer-group"/>
            {{ repository }}
          </a>
        </div>
        <div class="data branch">
          <a href="#">
            <code>{{ sha | trimSha }}</code>
          </a>
          &rarr;
          <a href="#">
            <font-awesome-icon icon="code-branch"/>
            {{ branch }}
          </a>
        </div>
      </div>
      <div class="information">
        <div class="info duration">
          <font-awesome-icon :icon="['far', 'hourglass']"/>
          {{ durationSeconds | easyTimeSeconds }}
        </div>
        <div class="info date">
          <font-awesome-icon :icon="['far', 'calendar']"/>
          {{ date | dateAgo }}
        </div>
      </div>
    </div>
    <aside class="right">Some stuff goes here</aside>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'build-row',
  props: {
    id: Number,
    repository: String,
    message: String,
    sha: String,
    branch: String,
    durationSeconds: Number,
    date: Number,
    status: String,
    author: {
      type: Object,
      default: () => ({
        avatar: String,
        email: String,
        username: String,
      }),
    },
  },
  filters: {
    trimSha: (function trimSha(value) {
      if (!value) {
        return '';
      }

      return value.substring(0, 8);
    }),
    easyTimeSeconds: (function easyTimeSeconds(value) {
      const duration = moment.duration(value, 'seconds');
      const label = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');

      return label.replace(/^00:/, '');
    }),
    dateAgo: (function dateAgo(value) {
      return moment(value, 'X').fromNow();
    }),
  },
  methods: {},
  computed: {
    statusClass: (function statusClass() {
      const knownStatuses = [
        'completed', 'running', 'queued', 'failed', 'cancelled',
      ];

      if (knownStatuses.includes(this.status)) {
        return this.status.toLowerCase();
      }

      return 'unknown';
    }),
    canCancelBuild: (function canCancelBuild() {
      const cancellableStatuses = [
        'running', 'queued',
      ];

      return cancellableStatuses.includes(this.status);
    }),
  },
};
</script>

<style scoped lang="stylus">
.build
  background-color #fff
  border-radius 5px
  box-shadow 0 2px 4px rgba(37, 37, 37, 0.1)
  cursor pointer
  position relative
  transition-property box-shadow
  transition-duration 0.1s
  transition-timing-function ease-in-out
  display flex

  &:hover
    box-shadow 0 2px 4px rgba(37, 37, 37, 0.3)

  aside
    flex 0
    padding 10px

    &.left
      min-width 70px
      max-width 70px
      background-color #eee
      border-top-left-radius 5px
      border-bottom-left-radius 5px
      text-align center
      display flex
      flex-direction column

      .avatar
        display block

        img
          vertical align
          max-width 40px
          max-height 40px
          border-radius 50%

      svg
        display block

        &.svg-inline--fa
          font-size 30px
          margin auto

      &.running
        background-color #fdf7c8
        border-right 5px solid #edd411

        svg
          animation spin 2s linear infinite
          color #edd411

      &.completed
        background-color #cae8c1
        border-right 5px solid #68b152

        svg
          color #68b152

      &.cancelled
        background-color #d9e3f8
        border-right 5px solid #6487ce

        svg
          color #6487ce

      &.queued
        background-color #e7e7e7
        border-right 5px solid #b0b0b0

        svg
          color #b0b0b0

      &.failed
        background-color #f2d7d7
        border-right 5px solid #ea6666

        svg
          color #ea6666

    &.right
      justify-content right
      min-width 100px
      max-width 100px

  .content
    flex 1
    padding 5px 10px
    color #888
    min-width 0

    svg

      path
        fill #888

    .message
      font-size 16px
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      line-height 24px
      color #174f7c

    .meta
      border-top 1px solid #eee
      padding-top 5px
      margin-top 5px

      a
        font-size 14px
        color inherit

        &:hover
          color #666
          border-bottom 1px solid #666

      .data
        display inline-block
        padding-left 10px
        margin-left 5px
        border-left 1px solid #eee

        &:first-child
          margin-left 0
          padding-left 0
          border-left 0

        svg
          margin-right 5px

        code
          background-color #f3f3f3
          padding 3px

          &:hover
            background-color #ddd

    .information
      font-size 14px
      border-top 1px solid #eee
      padding-top 5px
      margin-top 5px

      .info
        display inline-block
        padding-left 10px
        margin-left 5px
        border-left 1px solid #eee

        &:first-child
          margin-left 0
          padding-left 0
          border-left 0

        svg
          margin-right 5px

</style>
