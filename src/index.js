import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCogs, faTools, faLayerGroup, faUsers, faSignOutAlt, faCog, faCheck,
  faBan, faTimes, faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';
import {
  faClock as farClock, faHourglass as farHourglass, faCalendar as farCalendar,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vueMoment from 'vue-moment';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './state';

library.add(
  faCogs, faTools, faLayerGroup, faUsers, faSignOutAlt, faCog, faCheck,
  faBan, farClock, faTimes, faCodeBranch, farHourglass, farCalendar,
);

Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(vueMoment);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>',
});
