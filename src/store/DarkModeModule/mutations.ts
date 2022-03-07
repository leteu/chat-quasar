import { MutationTree } from 'vuex';
import { DarkModeModuleStateInterface } from './state';

const mutation: MutationTree<DarkModeModuleStateInterface> = {
  setDarkMode(state) {
    state.darkMode = !state.darkMode;
  }
};

export default mutation;
