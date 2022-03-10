import { Loading, QSpinnerHourglass, Dialog } from 'quasar';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { StompModuleStateInterface, Room } from './state';

import Stomp, { Client, Subscription } from 'webstomp-client';
import SockJS from 'sockjs-client';
import API_URL from 'src/assets/common/config';
import SocketLoadingDialog from 'src/components/SocketLoadingDialog.vue';
import axios from 'axios';
import JwtService from 'src/assets/common/jwt.service';

let stomp: Client;

export let RoomListSub: Subscription;
export let RoomSub: Subscription;
export let UserInfoSub: Subscription;
export let YachtListSub: Subscription;
export let YachtSub: Subscription;

const actions: ActionTree<StompModuleStateInterface, StateInterface> = {
  setterStomp(context) {
    context.commit('setStomp', stomp);
  },

  connect(context) {
    const socket = new SockJS(API_URL+'socket');
    const options = {debug: true, protocols: Stomp.VERSIONS.supportedProtocols()};
    stomp = Stomp.over(socket, options);

    context.commit('setStomp', stomp);

    return new Promise<void>((resolve, reject) => {
      const loadingDialog = Dialog.create({
        component: SocketLoadingDialog
      })

      stomp.connect(
        {
          'x-auth-token': JwtService?.getToken()||''
        },
        frame => {
          // 소켓 연결 성공
          console.log(frame);
          context.commit('setConnectStatus', true);
          loadingDialog?.hide();
          resolve();
        },
        error => {
          // 소켓 연결 실패
          console.log(error);
          context.commit('setConnectStatus', false);
          loadingDialog?.hide();
          reject();
        }
      );
    });
  },

  disconnect(context) {
    stomp.disconnect();
  },

  SubscribeRoomList(context) {
    return new Promise<void>((resolve, reject) => {
      RoomListSub = stomp?.subscribe("/sub/chatroom/list/GENERAL", res => {
        context.commit('setRoomListState', JSON.parse(res.body));
        resolve();
      })
    })
  },

  SubscribeYachtList(context) {
    return new Promise<void>((resolve, reject) => {
      YachtListSub = stomp?.subscribe("/sub/chatroom/list/YAHTZEE", res => {
        context.commit('setYachtListState', JSON.parse(res.body));
        resolve();
      })
    })
  },

  UnSubscribeRoomList(context) {
    RoomListSub?.unsubscribe();
  },

  UnSubscribeYatchList(context) {
    YachtListSub?.unsubscribe();
  },

  SubscribeRoom(context, roomId) {
    return new Promise<void>((resolve, reject) => {
      Loading.show({
        spinner: QSpinnerHourglass
      })

      RoomSub = stomp?.subscribe(`/sub/chatting/chatroom/${roomId}`, res => {
        context.commit('pushChatListState', JSON.parse(res.body));
        Loading.hide();
        resolve();
      });

      context.commit('setRandomName');
    })
  },

  SubscribeUserInfo(context, roomId) {
    UserInfoSub = stomp?.subscribe(`/sub/user/chatroom/${roomId}`, res => {
      context.commit('setUserInfo', JSON.parse(res.body));
    })
  },

  UnSubscribeRoom(context) {
    RoomSub?.unsubscribe();
    context.commit('resetChatListState');
  },

  UnSubscribeUserInfo(context) {
    UserInfoSub?.unsubscribe();
    context.commit('resetUserInfo');
  },

  sendMsgRoom(context, { message, chatRoomId }) {
    if (stomp && stomp.connected) {
      const msg = { 
        messageContent: message,
        chatRoomId
      };
      stomp.send("/pub/message/chatroom", JSON.stringify(msg), {});
    }
  },

  chkRoomPassword(context, item: Room): boolean | Promise<boolean> {
    if(item.private) {
      const passwordInput = prompt('비밀번호를 입력해주세요.');
      if(passwordInput) {
        return axios.post('/secret/chatroom/verification', { chatRoomId: item.chatRoomId, password: passwordInput })
          .then(({data}) => {
            if(data) {
              return true;
            } else {
              alert("비밀번호가 일치하지 않습니다.");
              return false;
            }
          })
      } else {
        return false;
      }
    } else {
      return true;
    }
  },

  SubscribeYacht(context, chatRoomId: number) {
    return new Promise<void>((resolve, reject) => {
      YachtSub = stomp?.subscribe(`/sub/yahtzee/score/${chatRoomId}`, res => {
        context.commit('updateYachtScore', JSON.parse(res.body));
        resolve();
      });
    })
  },
  
  UnSubscribeYacht(context) {
    YachtSub?.unsubscribe();
    context.commit('updateYachtScore', []);
  },

  setterYachtState(context, value: boolean) {
    context.commit('updateYachtState', value);
  },

  sendYachtGetScore(context, requestObj){
    if (stomp && stomp.connected) {
      stomp.send("/pub/update/score/yahtzee", JSON.stringify(requestObj), {});
    }
  }
};

export default actions;
export {
  API_URL
}
