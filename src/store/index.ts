import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  StoreOptions,
  useStore as vuexUseStore,
} from 'vuex'
import AuthModule from './AuthModule'
import DarkModeModule from './DarkModeModule'
import StompModule from './StompModule'
import { StompModuleStateInterface } from './StompModule/state'
import { DarkModeModuleStateInterface } from './DarkModeModule/state'
import { AuthModuleStateInterface } from './AuthModule/state'

// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  StompModule: StoreOptions<StompModuleStateInterface>;
  DarkModeModule: StoreOptions<DarkModeModuleStateInterface>;
  AuthModule: StoreOptions<AuthModuleStateInterface>;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

export default createStore<StateInterface>({
  modules: {
    StompModule,
    DarkModeModule,
    AuthModule
  },

  // enable strict mode (adds overhead!)
  // for dev mode and --debug builds only
  strict: !!process.env.DEBUGGING
});

export function useStore() {
  return vuexUseStore(storeKey)
}