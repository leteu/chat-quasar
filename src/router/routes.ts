import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
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
