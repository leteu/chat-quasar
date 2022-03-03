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

  setYachtListState(state, value) {
    state.yachtList = value;
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

  setCurrenYachtState(state, value) {
    state.currentYacht = value
  },

  setRandomName (state) {
    state.randomName = `익명-${Math.floor(Math.random() * 1000)}`;
  },

  resetUserInfo(state) {
    state.userInfo = [];
  },

  updateYachtScore(state, score) {
    state.yachtScore = score;
  },

  updateYachtState(state, value) {
    state.yachtState = value;
  }
};

export default mutation;
