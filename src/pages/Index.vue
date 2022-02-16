<template>
  <router-view />
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

    connectServer();
  }
});
</script>
