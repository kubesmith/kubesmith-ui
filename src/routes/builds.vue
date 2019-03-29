<template>
  <div class="builds" v-title="'Builds | Kubesmith'">
    <navigation current-link="/builds"></navigation>

    <div class="content">
      <div class="build-list">
        <build-row v-for="build in builds" v-bind:key="build.id" :repository="build.repository"/>
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
  data: () => {
    const builds = [];
    let i = 0;

    for (i; i < 200; i += 1) {
      builds.push({
        id: i,
        repository: `testing - ${i}`,
      });
    }

    return {
      builds,
    };
  },
  directives: {
    TitleDirective,
  },
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

    .build-list
      width 900px
      height auto
      margin 20px auto
      padding 20px
      background-color #fff
      border-radius 10px
</style>
