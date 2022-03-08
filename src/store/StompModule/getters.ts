import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { StompModuleStateInterface } from './state';

const getters: GetterTree<StompModuleStateInterface, StateInterface> = {
  getRoomListData (context) {
    return context.roomList;
  },

  getYachtListData (context) {
    return context.yachtList;
  },

  returnStomp (context) {
    return context.stomp;
  },

  getConnectStatus (context) {
    return context.stomp?.connected;
  },

  getChatList (context) {
    return context.chatlist;
  },

  getCurrentRoomName (context) {
    return context.currentRoom;
  },

  getRandomName (context) {
    return context.randomName;
  },

  getUserInfo (context) {
    return context.userInfo
  },

  isYachtStarted(context) {
    return context.yachtState;
  },

  getYachtScoreBoard(context) {
    return context.yachtScore;
  }
};

export default getters;
