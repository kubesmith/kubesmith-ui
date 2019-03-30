<template>
  <div class="build" @mousedown="routeToBuild">
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
            {{ author.username }}
          </a>
          &rarr;
          <a href="#">
            <code>{{ sha | trimSha }}</code>
          </a>
          &rarr;
          <a href="#">
            <font-awesome-icon icon="code-branch"/>
            {{ branch }}
          </a>
        </div>
        <div v-if="isTagReference" class="data tag">
          <font-awesome-icon icon="tag"/>
          {{ reference | gitTag }}
        </div>
      </div>
      <div class="information">
        <div v-if="!isQueued" class="info duration">
          <font-awesome-icon :icon="['far', 'hourglass']"/>
          {{ durationSeconds | easyTimeSeconds }}
        </div>
        <div class="info date">
          <font-awesome-icon :icon="['far', 'calendar']"/>
          {{ date | dateAgo }}
        </div>
        <div class="info status">
          <font-awesome-icon v-if="statusClass == 'running'" icon="cog"/>
          <font-awesome-icon v-if="statusClass == 'completed'" icon="check"/>
          <font-awesome-icon v-if="statusClass == 'cancelled'" icon="ban"/>
          <font-awesome-icon v-if="statusClass == 'queued'" :icon="['far', 'clock']"/>
          <font-awesome-icon v-if="statusClass == 'failed'" icon="times"/>
          {{ status | titleCase }}
        </div>
        <div v-if="isRunning" class="info pipeline">
          <font-awesome-icon icon="list-ul"/>
          {{ pipeline }}
        </div>
      </div>
    </div>
    <aside v-if="hasActions" class="right">
      <font-awesome-icon v-if="canRedoBuild" icon="redo" class="redo-build"/>
      <font-awesome-icon v-if="canCancelBuild" icon="ban" class="cancel-build"/>
    </aside>
  </div>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';

export default {
  name: 'build-row',
  props: {
    id: String,
    repository: String,
    message: String,
    sha: String,
    branch: String,
    reference: String,
    pipeline: String,
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
    trimSha: value => value.substring(0, 8),
    easyTimeSeconds: function easyTimeSeconds(value) {
      const duration = moment.duration(value, 'seconds');
      const label = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');

      return label.replace(/^00:/, '');
    },
    dateAgo: value => moment(value, 'X').fromNow(),
    gitTag: value => value.replace(/^refs\/tags\//, ''),
    titleCase: value => _.startCase(_.toLower(value)),
  },
  methods: {
    routeToBuild: function routeToBuild() {
      this.$router.push(`/build/${this.id}`);
    },
  },
  computed: {
    statusClass: function statusClass() {
      const knownStatuses = [
        'completed', 'running', 'queued', 'failed', 'cancelled',
      ];

      if (knownStatuses.includes(this.status)) {
        return this.status.toLowerCase();
      }

      return 'unknown';
    },
    isTagReference: function isTagReference() {
      return _.startsWith(this.reference, 'refs/tags/');
    },
    canCancelBuild: function canCancelBuild() {
      const cancellableStatuses = [
        'running', 'queued',
      ];

      return cancellableStatuses.includes(this.status);
    },
    canRedoBuild: function canRedoBuild() {
      const redoableStatuses = [
        'cancelled', 'completed', 'failed',
      ];

      return redoableStatuses.includes(this.status);
    },
    hasActions: function hasActions() {
      return this.canRedoBuild || this.canCancelBuild;
    },
    isQueued: function isQueued() {
      return this.status === 'queued';
    },
    isRunning: function isRunning() {
      return this.status === 'running';
    },
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
      display flex
      flex-direction column
      justify-content flex-start
      align-items top
      padding 20px

      svg
        font-size 20px
        margin-bottom 10px
        color #174f7c

        &:hover
          color #333

  .content
    flex 1
    padding 5px 10px
    color #888
    min-width 0
    font-size 14px

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
        font-size inherit
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
