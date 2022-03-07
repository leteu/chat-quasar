export interface DarkModeModuleStateInterface {
  darkMode: boolean
}

function state(): DarkModeModuleStateInterface {
  return {
    darkMode: false
  }
};

export default state;
