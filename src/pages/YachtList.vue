<template>
  <div id="container-yacht">
    <div class="q-gutter-y-sm column full-height">
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
      <RoomList class="col" @update:room="item => updateRoom(item)" @remove:room="item => removeRoom(item)" roomType="YACHT" />
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import RoomList from 'src/components/RoomList.vue';
import SaveRoomVue from 'src/components/SaveRoom.vue';
import { Room } from 'src/store/StompModule/state';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'YachtList',
  components: {
    RoomList
  },
  data() {
    return {
      dataAPIList: [],
    }
  },
  created() {
    const connectServer = async () => {
      await this.$store.dispatch('StompModule/connect')
        .then(() => {
          this.$store.dispatch('StompModule/SubscribeYachtList')
        })
        .catch(() => {
          connectServer();
        })
    };

    if(!this.$store.getters['StompModule/getConnectStatus']) {
      connectServer();
    } else {
      this.$store.dispatch('StompModule/SubscribeYachtList')
    }
  },
  computed: {
    dataList: function () {
      return this.$store.getters['StompModule/getYachtListData'];
    }
  },
  methods: {
    updateRoom(item: Room) {
      this.$store.dispatch('StompModule/chkRoomPassword', item)
        .then((value) => {
          if(value) {
            this.$store.dispatch('StompModule/UnSubscribeYatchList');
            this.$router.push(`/game/yacht/${item.chatRoomId}`);
            this.$store.commit('StompModule/setCurrenYachtState', item);
          }
        })
    },

    removeRoom(item: Room) {
      axios.delete(`${item.chatRoomId}/chatroom`)
        .then(() => {
          this.$q.notify({
            message: '삭제되었습니다.',
            color: 'red',
            icon: 'delete'
          })
        })
    },

    onClickCreateRoom() {
      this.$q.dialog({
        component: SaveRoomVue,
        componentProps: {
          roomType: 'YAHTZEE'
        }
      })
    },
  }
})
</script>
