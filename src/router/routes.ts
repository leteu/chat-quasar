import { RouteRecordRaw } from 'vue-router';
import SignIn from 'src/pages/Auth/SignIn.vue';
import SignUp from 'src/pages/Auth/SignUp.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    meta: { chkIsLogin: true },
    children: [
      { path: "login", component: SignIn, name: "SignIn" },
      { path: "signup", component: SignUp, name: "SignUp" },
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requireAuth: true },
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/MainPage.vue'),
            meta: { ListPage: true }
          },
          {
            path: 'room/:roomId',
            component: () => import('components/Room.vue'),
            meta: { ChatPage: true }
          },
        ]
      },
    ],
  },

  {
    path: '/game',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requireAuth: true },
    children: [
      {
        path: 'loby',
        component: () => import('pages/GameLoby.vue')
      },
      {
        name: 'snakeGame',
        path: 'snake-game',
        component: () => import('pages/SnakeGame.vue')
      },
      {
        name: 'yacht',
        path: 'yacht',
        component: () => import('pages/YachtList.vue')
      },
      {
        path: 'yacht/:roomId',
        component: () => import('pages/Yacht.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
