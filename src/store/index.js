import Vue from 'vue'
import Vuex from 'vuex'

import modules from './module';
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: modules,

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: false
  })

  return Store
}
