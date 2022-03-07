<template>
  <div id="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import { useStore } from "vuex";

export default defineComponent({
  name: 'Index',
  created() {
    const connectServer = async () => {
      await this.$store.dispatch('StompModule/connect')
        .then(() => {
          this.$store.dispatch('StompModule/SubscribeRoomList')
        })
        .catch(() => {
          connectServer();
        })
    };

    if(!this.$store.getters['StompModule/getConnectStatus']) {
      connectServer();
    } else {
      this.$store.dispatch('StompModule/SubscribeRoomList')
    }
  },
  beforeUnmount() {
    this.$store.dispatch('StompModule/disconnect')
  }
});
</script>
