import Vue from 'vue';
import Router from 'vue-router';
import Cookie from 'js-cookie';
import LoginRoute from '../routes/login';
import NotFoundRoute from '../routes/not-found';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginRoute,
      props(route) {
        return {
          path: route.query.path,
        };
      },
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundRoute,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = Cookie.get('token');
  const destination = encodeURIComponent(to.fullPath);

  if (!loggedIn && !to.path.includes('/login')) {
    return next(`/login?not-authorized&path=${destination}`);
  }

  return next();
});

export default router;
