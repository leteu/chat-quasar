export interface ExampleStateInterface {
  darkMode: boolean
}

function state(): ExampleStateInterface {
  return {
    darkMode: false
  }
};

export default state;
