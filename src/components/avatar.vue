<template>
  <img class="avatar" :src="src"/>
</template>

<script>
import avatar from '@/images/avatar.png';

export default {
  name: 'avatar',
  props: {
    url: String,
  },
  computed: {
    src: function src() {
      if (!this.url) {
        return avatar;
      }

      return this.url;
    },
  },
};
</script>

<style scoped lang="stylus">
.avatar
  vertical-align middle
  border-radius 50%
</style>
