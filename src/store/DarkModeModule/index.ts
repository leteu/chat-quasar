import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { DarkModeModuleStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const DarkModeModule: Module<DarkModeModuleStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default DarkModeModule;
