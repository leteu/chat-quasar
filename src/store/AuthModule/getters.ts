import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AuthModuleStateInterface } from './state';
import moment from 'moment';
import decodeToken from 'src/assets/common/funcitons/DecodeToken';

const getters: GetterTree<AuthModuleStateInterface, StateInterface> = {
  isLogin(state): boolean {
    return !!state.userToken;
  },
  isValidity(state): boolean {
    const exp = moment('1970,01,01', 'YYYY,MM,DD').add(9, 'h').add(decodeToken().exp, 's').format('YYYYMMDDHHmmss');
    return !!((Number(exp) - Number(moment(new Date).format('YYYYMMDDHHmmss'))) > 0 );
  }
};

export default getters;
