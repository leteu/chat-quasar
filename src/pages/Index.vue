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

    connectServer();
  }
});
</script>

<style lang="sass" scoped>
#container
  width: 50%
  margin: 0 auto

@media screen and (max-width: 768px)
  #container
    width: 100%
    margin: 0 auto
</style>
