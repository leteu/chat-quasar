import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { DarkModeModuleStateInterface } from './state';

const getters: GetterTree<DarkModeModuleStateInterface, StateInterface> = {
  isDarkMode (state) {
    return state.darkMode;
  }
};

export default getters;
