<template>
  <div id="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick,  } from 'vue';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'Index',
  setup() {
    const $store = useStore();

    const connectServer = async () => {
      await $store.dispatch('StompModule/connect')
        .then(() => {
          $store.dispatch('StompModule/SubscribeRoomList')
        })
        .catch(() => {
          connectServer();
        })
    };

    (() => {
      if(!$store.getters['StompModule/getConnectStatus']) {
        connectServer();
      } else {
        $store.dispatch('StompModule/SubscribeRoomList')
      }
    })();

    return {

    }
  }
});
</script>
