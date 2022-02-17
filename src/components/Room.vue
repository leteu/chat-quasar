<template>
  <div class="q-pa-lg q-gutter-y-sm column height-inherit">
    <div class="flex justify-between items-center">
      <div class="text-h6 text-primary">
        {{ $store.getters['StompModule/getCurrentRoomName'].name }}
      </div>
      <q-btn
        dense
        color="dark"
        icon="clear"
        @click="leaveRoom()"
      />
    </div>

    <q-card flat square bordered class="col">
      <q-card-section class="scroll-y full-height">
        <div class="relative-position" v-for="(item, index) in dataList" :key="`chat-${index}`">
          <div class="text-bold small-font">{{item.userName}}</div>
          <div>
            {{item.content}}
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="row">
      <div class="relative-position col">
        <q-input
          outlined
          v-model="message"
          dense
          square
          type="textarea"
          @keydown.enter="e => {
            if(!e.shiftKey) {
              e.preventDefault();
              onClickSend();
            }
          }"
          row="2"
          :rules="[val => !!val && !!val.trim() || '']"
          class="hideErrorMessageSlot"
          hide-bottom-space
          ref="messageInput"
        />
      </div>
      <q-btn dense @click="onClickSend" label="전송" color="primary" />
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { QInput } from 'quasar';
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      message: '',
    }
  },
  created() {
    if(this.$store.getters['StompModule/getConnectStatus']) {
      this.$store.dispatch('StompModule/SubscribeRoom', this.$route.params.roomId)
    }
    this.sendJoinRoom();
  },
  computed: {
    dataList: function () {
      return this.$store.getters['StompModule/getChatList'];
    },
  },
  methods: {
    sendJoinRoom() {
      this.$store.dispatch('StompModule/JoinRoom');
      axios.post('/chat/room/in', {
        roomId: this.$route.params.roomId,
        userName: this.$store.getters['StompModule/getRandomName']
      })
    },

    onClickSend() {
      if((this.$refs.messageInput as QInput).validate()) {
        this.$store.dispatch('StompModule/sendMsgRoom',
          {
            message: this.$data.message,
            roomId: this.$route.params.roomId
          }
        );
        this.$data.message = '';
      }
    },

    leaveRoom() {
      this.$store.dispatch('StompModule/UnSubscribeRoom');
      this.$router.push('/');
    }
  },
  watch: {
    '$route': function(to, from) {
      this.$store.dispatch('StompModule/UnSubscribeRoom');
    }
  }
})
</script>

