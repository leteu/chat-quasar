import { useQuasar, DialogChainObject, Loading, QSpinnerHourglass, Dialog } from 'quasar';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';

import Stomp, { Client, Subscription } from 'webstomp-client';
import SockJS from 'sockjs-client';
import API_URL from 'src/assets/common/config';
import SocketLoadingDialog from 'src/components/SocketLoadingDialog.vue';

const socket = new SockJS(API_URL+'socket');
const stomp = Stomp.over(socket) as Client;
stomp.debug = () => {};

let RoomListSub: Subscription;
let RoomSub: Subscription;



const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  connect(context) {
    return new Promise<void>((resolve, reject) => {
      const loadingDialog = Dialog.create({
        component: SocketLoadingDialog
      })

      stomp?.connect(
        {},
        frame => {
          // 소켓 연결 성공
          context.commit('setStomp', stomp);
          context.commit('setConnectStatus', true);
          loadingDialog.hide();
          resolve();
        },
        error => {
          // 소켓 연결 실패
          context.commit('setStomp', null);
          context.commit('setConnectStatus', false);
          loadingDialog.hide();
          reject();
        }
      );
    });
  },

  SubscribeRoomList(context) {
    return new Promise<void>((resolve, reject) => {
      RoomListSub = stomp?.subscribe("/sub/room/list", res => {
        context.commit('setRoomListState', JSON.parse(res.body));
        resolve();
      })
    })
  },

  UnSubscribeRoomList(context) {
    RoomListSub?.unsubscribe();
  },

  SubscribeRoom(context, roomId) {
    return new Promise<void>((resolve, reject) => {
      Loading.show({
        spinner: QSpinnerHourglass
      })

      RoomSub = stomp?.subscribe(`/sub/chat/room/${roomId}`, res => {
        context.commit('pushChatListState', JSON.parse(res.body));
        context.commit('setUserInfo', JSON.parse(res.body).userInfo)
        Loading.hide();
        resolve();
      })
    })
  },

  UnSubscribeRoom(context) {
    RoomSub?.unsubscribe();
    context.commit('resetChatListState');
  },

  sendMsgRoom(context, { message, roomId }) {
    if (stomp && stomp.connected) {
      const msg = { 
        userName: context.state.randomName,
        content: message,
        roomId
      };
      stomp.send("/pub/chat/room", JSON.stringify(msg), {});
    }
  },

  JoinRoom(context) {
    context.commit('setRandomName');
  }
};

export default actions;
export {
  API_URL
}
