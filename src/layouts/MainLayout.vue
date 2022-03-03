<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          익명 채팅
        </q-toolbar-title>

        <q-btn
          dense
          flat
          class="bg-white q-pa-none"
          text-color="dark"
          @click.prevent="() => {userChip = !userChip}"
          rounded
          icon="account_circle"
          :icon-right="userChip ? 'arrow_drop_up' : 'arrow_drop_down'"
          style="min-width: 100px"
        >
          <span class="q-mx-sm text-weight-bold">
            {{decodeToken().name}}
          </span>

          <q-menu :offset="[-2, 5]">
            <UserInfo />
          </q-menu>
        </q-btn>
      </q-toolbar>

      <q-tabs align="left" dense>
        <q-route-tab to="/" label="채팅" />
        <q-route-tab to="/game/loby" label="게임" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <div
      class="absolute absolute-bottom-right width-50px height-50px bg-primary q-ma-md round-radius flex items-center justify-center cursor-pointer"
      @click="() => {
        $store.dispatch('DarkModeModule/toggleDarkMode');
      }"
    >
      <q-icon :name="!$store.getters['DarkModeModule/isDarkMode'] ? 'dark_mode' : 'brightness_7'" color="white" size="md" />
    </div>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import UserInfo from 'src/components/UserInfo.vue';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    UserInfo
  },

  setup () {
    const leftDrawerOpen = ref(false);
    const userChip = ref(false);

    return {
      userChip,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style lang="sass" scoped>
#q-app
  > .q-layout
    > .q-page-container
      > div
        max-height: calc(100vh - 86px)
        height: calc(100vh - 86px)
        overflow-y: auto
</style>
