<template>
  <div class="q-pa-lg q-gutter-y-sm column full-height">
    <div class="flex justify-between items-center">
      <div class="text-h6 text-primary">
        {{ $store.getters['StompModule/getCurrentRoomName']?.name }}
      </div>
      <div class="flex items-center justify-start q-gutter-x-sm">
        <q-btn
          dense
          outline
          icon="people"
        >
          <q-menu class="width-150px">
            <q-list dense bordered separator>
              <q-item dense>
                <q-item-section class="flex items-center justify-start">
                  <span><span class="text-bold q-mr-sm">접속자 : </span>{{userInfo.length}}</span>
                </q-item-section>
              </q-item>
              <q-item v-for="(user, index) in userInfo" :key="`user-${index}`" dense>
                <q-item-section>
                  {{user.userName}}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn
          dense
          outline
          icon="clear"
          @click="() => { $router.push('/') }"
        />
      </div>
    </div>

    <q-card flat square bordered class="col">
      <q-card-section class="q-py-xs scroll-y full-height chat-box">
        <div class="relative-position q-my-xs" v-for="(item, index) in dataList" :key="`chat-${index}`">
          <template v-if="item.authority === 'notice'">
            <div class="text-center">
              <div class="text-grey-6 fs-85">
                <span class="text-bold">{{item.userName}}</span> 
                {{ item.messageContent }}
              </div>
            </div>
          </template>
          <template v-else>
            <div class="small-font">
              <span class="text-bold q-mr-sm">{{item.userName}}</span>
              <span class="text-grey-8 fs-85">{{item.date}}</span>
            </div>
            <div class="word_warp">
              {{item.messageContent}}
            </div>
          </template>
        </div>
      </q-card-section>
    </q-card>

    <div class="row">
      <div class="relative-position col">
        <q-form ref="messageForm">
          <IMEInput
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
        </q-form>
      </div>
      <q-btn dense @click="onClickSend" label="전송" color="primary" />
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { QField, QForm, QInput } from 'quasar';
import getters from 'src/store/StompModule/getters';
import { Chat, UserInfo } from 'src/store/StompModule/state';
import { defineComponent } from 'vue'
import IMEInput from './IME/IMEInput';

export default defineComponent({
  components: {
    IMEInput
  },
  data() {
    return {
      message: '',
    }
  },
  created() {
    const subRoom = setInterval(() => {
      if(this.$store.getters['StompModule/getConnectStatus']) {
        clearInterval(subRoom);
        this.$store.dispatch('StompModule/SubscribeUserInfo', this.$route.params.roomId)
        this.$store.dispatch('StompModule/SubscribeRoom', this.$route.params.roomId)
      }
    }, 1000);
  },
  computed: {
    dataList: function (): Chat[] {
      return this.$store.getters['StompModule/getChatList'];
    },
    userInfo: function(): UserInfo[] {
      return this.$store.getters['StompModule/getUserInfo'];
    }
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters['StompModule/getChatList'],
      (newVal, oldVal) => {
        const chatBox = document.querySelector('.chat-box');

        chatBox?.scrollTo(0, chatBox.scrollHeight);
      },
      {
        deep: true
      }
    );

    window.addEventListener('beforeunload', this.leave)
  },
  methods: {
    onClickSend() {
      (this.$refs.messageForm as QForm).validate().then((chk: boolean) => {
        if(chk) {
          this.$store.dispatch('StompModule/sendMsgRoom',
            {
              message: this.$data.message,
              chatRoomId: this.$route.params.roomId
            }
          );
          this.$data.message = '';
        }
      })
    },
    leave(event: any) {
      this.$store.dispatch('StompModule/UnSubscribeRoom');
      this.$store.dispatch('StompModule/UnSubscribeUserInfo');
      this.$store.commit('StompModule/setCurrenRoomState', null);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('StompModule/UnSubscribeRoom');
    this.$store.dispatch('StompModule/UnSubscribeUserInfo');
    this.$store.commit('StompModule/setCurrenRoomState', null);
    next();
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.leave)
  }
})
</script>
