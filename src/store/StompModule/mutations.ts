import { MutationTree } from 'vuex';
import { API_URL } from './actions';
import { ExampleStateInterface, Room } from './state';
import Stomp, { Client } from 'webstomp-client';
import SockJS from 'sockjs-client';

const mutation: MutationTree<ExampleStateInterface> = {
  setStompState (state: ExampleStateInterface) {
    const socket = new SockJS(API_URL+'socket');
    state.stomp = Stomp.over(socket) as Client;
  },

  setStomp(state, value) {
    state.stomp = value;
  },

  setRoomListState(state, value) {
    state.roomList = value;
  },

  setConnectStatus(state, value:boolean) {
    state.connectStatus = value;
  },

  pushChatListState(state, value) {
    state.chatlist.push(value);
  },

  setUserInfo(state, value) {
    state.userInfo = value
  },

  resetChatListState(state) {
    state.chatlist = [];
  },

  setCurrenRoomState(state, value) {
    state.currentRoom = value
  },

  setRandomName (state) {
    state.randomName = `익명-${Math.floor(Math.random() * 1000)}`;
  }
};

export default mutation;
