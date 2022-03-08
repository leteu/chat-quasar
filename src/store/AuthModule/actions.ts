import axios from 'axios';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AuthModuleStateInterface } from './state';

const actions: ActionTree<AuthModuleStateInterface, StateInterface> = {
  login(context, credentials) {
    return new Promise(resolve => {
      axios.post('v1/login', credentials)
        .then(({data, status, statusText, headers, config, request}) => {
          if (data.response.status === 401) {
            alert("인증이 실패했습니다.");
            return false;
          } else if (data.response.status === 402) {
            alert("계정이 잠겼습니다. 관리자에게 문의해주세요.");
            return false;
          } else if (data.response.status === 433) {
            alert("로그인이 실패했습니다.");
            return false;
          } else if (data.response.status === 434) {
            alert("접근 권한이 없습니다.");
            return false;
          } else if (data.response.status === 435) {
            alert("존재하지 않은 사용자입니다.");
            return false;
          } else if (data.response.status === 500) {
            alert("패스워드를 잘못 입력하셨습니다.");
            return false;
          } else {
            context.commit('setToken', data.contents);
            resolve({data, context});
          }
        })
    });
  },

  kakaoLogin(context, value) {
    context.commit('setToken', value);
  },

  logout(context) {
    context.commit('setToken', null);
  },

  setHeaderAction(context, value) {
    context.commit('setHeader', value);
  }
};

export default actions;
