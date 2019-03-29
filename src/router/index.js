import Vue from 'vue';
import Router from 'vue-router';
import Cookie from 'js-cookie';
import BuildsRoute from '@/routes/builds';
import LoginRoute from '@/routes/login';
import NotFoundRoute from '@/routes/not-found';
import SignUpRoute from '@/routes/sign-up';
import RepositoriesRoute from '@/routes/repositories';
import TeamsRoute from '@/routes/teams';
import SettingsRoute from '@/routes/settings';
import ResetPasswordRoute from '@/routes/reset-password';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/builds',
    },
    {
      path: '/builds',
      name: 'builds',
      component: BuildsRoute,
    },
    {
      path: '/repositories',
      name: 'repositories',
      component: RepositoriesRoute,
    },
    {
      path: '/teams',
      name: 'teams',
      component: TeamsRoute,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsRoute,
    },
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
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpRoute,
      meta: {
        doesNotRequireAuth: true,
      },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordRoute,
      meta: {
        doesNotRequireAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = Cookie.get('token');
  const destination = encodeURIComponent(to.fullPath);

  if (!loggedIn) {
    if (to.meta.doesNotRequireAuth) {
      return next();
    }

    if (!to.path.includes('/login')) {
      return next(`/login?not-authorized&path=${destination}`);
    }
  } else if (to.path.includes('/login') || to.meta.doesNotRequireAuth) {
    return next('/');
  }

  return next();
});

export default router;
