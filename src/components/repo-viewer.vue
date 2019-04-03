<template>
  <div class="repo-viewer">
    {{ repo }}
  </div>
</template>

<script>
export default {
  name: 'repo-viewer',
  props: ['repo'],
  created() {
    //
  },
  computed: {},
  components: {},
};
</script>

<style lang="stylus" scoped>
.repo-viewer
  flex 1
</style>
