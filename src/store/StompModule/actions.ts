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

const socket = new SockJS(API_URL+'socket');
const stomp = Stomp.over(socket) as Client;
// stomp.debug = () => {};

let RoomListSub: Subscription;
let RoomSub: Subscription;
let UserInfoSub: Subscription;
let YachtListSub: Subscription;
let YachtSub: Subscription;

const actions: ActionTree<StompModuleStateInterface, StateInterface> = {
  connect(context) {
    return new Promise<void>((resolve, reject) => {
      const loadingDialog = Dialog.create({
        component: SocketLoadingDialog
      })

      stomp?.connect(
        {
          'x-auth-token': JwtService?.getToken()||''
        },
        frame => {
          // 소켓 연결 성공
          context.commit('setStomp', stomp);
          context.commit('setConnectStatus', true);
          loadingDialog?.hide();
          resolve();
        },
        error => {
          // 소켓 연결 실패
          context.commit('setStomp', null);
          context.commit('setConnectStatus', false);
          loadingDialog?.hide();
          reject();
        }
      );
    });
  },

  disconnect(context) {
    stomp?.disconnect();
    context.commit('setStomp', null);
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
        console.log(JSON.parse(res.body));
        context.commit('updateYachtScore', JSON.parse(res.body));
        resolve();
      });
    })
  },
};

export default actions;
export {
  API_URL
}
