import Vue from 'vue';

const TitleDirective = {
  inserted(el, binding) {
    document.title = binding.value;
  },

  update(el, binding) {
    document.title = binding.value;
  },
};

export default TitleDirective;

Vue.directive('title', TitleDirective);
