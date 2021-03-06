import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCogs, faTools, faLayerGroup, faUsers, faSignOutAlt, faCog, faCheck,
  faBan, faTimes, faCodeBranch, faSyncAlt, faTag, faRedo, faListUl, faCaretDown,
  faPlus, faWifi,
} from '@fortawesome/free-solid-svg-icons';
import {
  faClock as farClock, faHourglass as farHourglass, faCalendar as farCalendar,
} from '@fortawesome/free-regular-svg-icons';
import {
  faGithub as fabGithub, faBitbucket as fabBitbucket,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Tooltip } from 'element-ui';
import vueMoment from 'vue-moment';
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/state';
import Websocket from '@/websocket';

// import stylesheets from element-ui
import 'element-ui/lib/theme-chalk/tooltip.css';

// add the font awesome icons
library.add(
  faCogs, faTools, faLayerGroup, faUsers, faSignOutAlt, faCog, faCheck,
  faBan, farClock, faTimes, faCodeBranch, farHourglass, farCalendar, faSyncAlt,
  faTag, faRedo, faListUl, fabGithub, faCaretDown, faPlus, fabBitbucket, faWifi,
);

// register components
Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(vueMoment);
Vue.use(Tooltip);
Vue.use(Websocket, {
  store,
});

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
