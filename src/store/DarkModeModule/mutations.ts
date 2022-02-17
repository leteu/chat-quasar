import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  setDarkMode(state) {
    state.darkMode = !state.darkMode;
  }
};

export default mutation;
