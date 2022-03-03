import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';
import JwtService from 'src/assets/common/jwt.service';
import axios from 'axios';

const mutation: MutationTree<ExampleStateInterface> = {
  setToken(state, value) {
    if(!value) {
      JwtService.destroyToken();
      state.userToken = null;
    } else {
      JwtService.saveToken(value.token);
      state.userToken = value.token;
    }
  },

  setHeader(state, token=null) {
    axios.defaults.headers.common[
      "x-auth-token"
    ] = `${!token ? JwtService.getToken() : token}`;
  },
};

export default mutation;
