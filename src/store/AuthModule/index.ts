import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { AuthModuleStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const AuthModule: Module<AuthModuleStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default AuthModule;
