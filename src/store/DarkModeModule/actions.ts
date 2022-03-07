import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DarkModeModuleStateInterface } from './state';
import { Dark } from 'quasar';

const actions: ActionTree<DarkModeModuleStateInterface, StateInterface> = {
  toggleDarkMode(context) {
    context.commit('setDarkMode');
    Dark.set(context.getters.isDarkMode);
  }
};

export default actions;
