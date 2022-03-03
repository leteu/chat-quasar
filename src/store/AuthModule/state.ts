import { Nullable } from "src/assets/common/type/Nullable";

export interface ExampleStateInterface {
  userToken: Nullable<string>
}

function state(): ExampleStateInterface {
  return {
    userToken: null
  }
};

export default state;
