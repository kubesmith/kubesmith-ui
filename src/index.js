import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome, faInbox, faCogs, faCreditCard, faSignOutAlt, faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import App from './App';
import router from './router';

library.add(faHome, faInbox, faCogs, faCreditCard, faSignOutAlt, faUserCog);

Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App/>',
});
