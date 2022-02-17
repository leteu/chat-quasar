import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';
import { Dark } from 'quasar';

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  toggleDarkMode(context) {
    context.commit('setDarkMode');
    Dark.set(context.getters.isDarkMode);
  }
};

export default actions;
