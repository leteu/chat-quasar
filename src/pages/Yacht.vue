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

export default defineComponent({
  components: {
    Yacht,
    RoomVue
  },
  async created() {
    if(this.$store.getters['StompModule/getConnectStatus']) {
      this.$store.dispatch('StompModule/SubscribeUserInfo', this.$route.params.roomId)
      this.$store.dispatch('StompModule/SubscribeRoom', this.$route.params.roomId)
        .then(() => {
          this.$store.dispatch('StompModule/SubscribeYacht', this.$route.params.roomId)
        })
    } else {
      const connectServer = async () => {
      await this.$store.dispatch('StompModule/connect')
        .then(() => {
          this.$store.dispatch('StompModule/SubscribeUserInfo', this.$route.params.roomId)
          this.$store.dispatch('StompModule/SubscribeRoom', this.$route.params.roomId)
            .then(() => {
              this.$store.dispatch('StompModule/SubscribeYacht', this.$route.params.roomId)
            })
        })
        .catch(() => {
          connectServer();
        })
      };

      connectServer();
    }
  },
  beforeUnmount() {
    this.$store.dispatch('StompModule/disconnect')
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
