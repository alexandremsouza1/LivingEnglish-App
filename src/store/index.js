import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import dictionary from './module/dictionary'
import user_config from './module/user_config'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      dictionary,
      user_config
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
