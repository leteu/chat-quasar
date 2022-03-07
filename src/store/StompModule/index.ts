import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { StompModuleStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const StompModule: Module<StompModuleStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default StompModule;
