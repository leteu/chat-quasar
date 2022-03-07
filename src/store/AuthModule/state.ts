import { Nullable } from "src/assets/common/type/Nullable";

export interface AuthModuleStateInterface {
  userToken: Nullable<string>
}

function state(): AuthModuleStateInterface {
  return {
    userToken: null
  }
};

export default state;
