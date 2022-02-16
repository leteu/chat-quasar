<template>
  <div class="q-mx-auto width-50pct q-pa-lg q-gutter-y-sm column">
    <div class="flex justify-between items-center">
      <div class="text-h6">
          로비
        </div>
        <q-btn
          dense
          color="primary"
          icon="add"
          @click="onClickCreateRoom()"
        />
    </div>
    <RoomList class="col" @update:room="item => updateRoom(item)" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, nextTick } from 'vue';
import Stomp, { Client } from 'webstomp-client';
import SockJS from 'sockjs-client';

import RoomList from 'src/components/RoomList.vue';
import SaveRoomVue from 'src/components/SaveRoom.vue';
import { Room } from 'src/store/StompModule/state';

let stompClient: Client;

export default defineComponent({
  name: 'PageIndex',
  components: { RoomList },
  data() {
    return {
      connected: false,
      chatRoomList: [] as any[],
      room: '' as any,
    }
  },
  created() {
    if(this.$store.getters['StompModule/getConnectStatus']) {
      this.$store.dispatch('StompModule/SubscribeRoomList')
    }
  },
  methods: {
    updateRoom(item: Room) {
      this.$store.dispatch('StompModule/UnSubscribeRoomList');
      this.$router.push(`/room/${item.id}`);
    },

    onClickCreateRoom() {
      this.$q.dialog({
        component: SaveRoomVue,
        componentProps: {

        }
      })
    },

    // getRoomList() {
    //   /sub/room/list
    // }
  },
  watch: {
    '$route': function(to, from) {
      this.$store.dispatch('StompModule/UnSubscribeRoomList');
    }
  }
});
</script>
