<template>
  <div id="container-yacht-game">
    <div class="height-full full-width row items-center justify-center">
      <Yacht class="col" />
      <div class="col-4 full-height">
        <RoomVue />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Yacht from 'src/components/Yacht';
import RoomVue from 'src/components/Room.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'src/store';

export default defineComponent({
  components: {
    Yacht,
    RoomVue
  },
  setup() {
    const $store = useStore();
    const $route = useRoute();

    const connectServer = async () => {
      await $store.dispatch('StompModule/connect')
        .then(() => {
          $store.dispatch('StompModule/SubscribeYacht', $route.params.roomId)
        })
        .catch(() => {
          connectServer();
        })
    };

    (() => {
      if(!$store.getters['StompModule/getConnectStatus']) {
        connectServer();
      } else {
        $store.dispatch('StompModule/SubscribeYacht', $route.params.roomId)
      }
    })();

    return {

    }
  }
})
</script>

<style lang="sass">
.height-full
  height: 100% !important

@media screen and (max-width: 768px)
  .height-full
    height: calc(100% - 110px) !important
    touch-action: none
</style>
