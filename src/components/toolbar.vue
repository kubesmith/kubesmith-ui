<template>
  <div class="toolbar">
    <div
      :class="{ selected: isSelected(id) }"
      v-for="(value, id) in values"
      @mousedown="selectValueByIndex(id)"
      v-bind:key="id" class="item">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'toolbar',
  props: {
    index: {
      type: Number,
      default: () => 0,
    },
    values: {
      type: Array,
      default: () => [],
    },
    onSelect: Function,
    getIndex: Function,
  },
  methods: {
    isSelected: function isSelected(value) {
      return this.index === value;
    },
    selectValueByIndex: function selectValueByIndex(index) {
      if (this.index === index) {
        return;
      }

      if (index >= 0 && index < this.values.length) {
        this.onSelect(index, this.values[index]);
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.toolbar
  flex none
  display inline-block
  border-radius 7px
  background-color #fff
  overflow hidden
  border 1px solid #ddd

  .item
    display inline-block
    padding 5px 20px
    cursor pointer
    font-size 16px
    user-select none
    transition-property background-color,color,border-color
    transition-duration 0.1s
    transition-timing-function ease-in-out
    border-left 1px solid #ddd

    &:first-child
      border-left 0px

    &:hover
      background-color #729dc0
      color #fff
      border-color #729dc0

    &.selected
      background-color #174f7c
      color #fff
      cursor default
</style>
