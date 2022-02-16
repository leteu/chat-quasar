import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  getRoomListData (context) {
    return context.roomList;
  },

  returnStomp (context) {
    return context.stomp;
  },

  getConnectStatus (context) {
    return context.connectStatus;
  },

  getChatList (context) {
    return context.chatlist;
  },

  getCurrentRoomName (context) {
    return context.currentRoom;
  }
};

export default getters;
