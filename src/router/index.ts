import { route } from 'quasar/wrappers';
import JwtService from 'src/assets/common/jwt.service';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import store, { StateInterface, storeKey } from '../store';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route<StateInterface>(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requireAuth)){
      if(!JwtService.getToken()){
        if(to.fullPath !== '/'){
          alert("로그인이 필요한 서비스입니다.");
        }
        next('/auth/login');
        return;
      } else {
        const diff = store.getters['AuthModule/isValidity'];
        if(!diff) {
          alert("인증이 만료되었습니다. 다시 로그인해 주세요.");
          store.commit('AuthModule/setToken', null);
          next('/auth/login');
          return;
        }
      }
    }
    if(to.matched.some(record => record.meta.chkIsLogin)){
      if(!!JwtService.getToken()){
        alert("이미 로그인되어있습니다.");
        next(from.path);
        return;
      }
    }

    if(to.matched.some(record => record.meta.ListPage)){
      next();
      return;
    }

    if(to.matched.some(record => record.meta.ChatPage)){
      if(!!to.params?.roomId) {
        if(!store.getters['StompModule/getConnectStatus']) {
          next('/');
          return;
        } else {
          if (store.getters['StompModule/getCurrentRoomName']) {
            next();
            return;
          } else {
            next('/');
            return;
          }
        }
      } else {
        next(from.path);
        return;
      }
    }

    next();
  });

  return Router;
});
