import { boot } from 'quasar/wrappers';

import moment from 'moment';
import decodeToken, { tokenInterface } from 'src/assets/common/funcitons/DecodeToken';
import DelayTime from 'src/assets/common/funcitons/DelayTime';

//set interface of function
interface Moment1 {
  (inp?: moment.MomentInput, strict?: boolean): moment.Moment
}

interface Moment2 {
  (inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean): moment.Moment
}

interface Moment3 {
  (inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean): moment.Moment
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    decodeToken: () => tokenInterface;
    $moment: Moment1 | Moment2 | Moment3;
    DelayTime: (item: number) => Promise<void>
  }
}

// set global function ex)this.decimalChk
export default boot(({ app }) => {
  app.config.globalProperties.decodeToken = decodeToken;
  app.config.globalProperties.$moment = moment;
  app.config.globalProperties.delayTime = DelayTime;
});
