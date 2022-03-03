import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';
import JwtService from 'src/assets/common/jwt.service';

const mutation: MutationTree<ExampleStateInterface> = {
  setToken(state, value) {
    if(!value) {
      JwtService.destroyToken();
      state.userToken = null;
    } else {
      JwtService.saveToken(value.token);
      state.userToken = value.token;
    }

  }
};

export default mutation;
