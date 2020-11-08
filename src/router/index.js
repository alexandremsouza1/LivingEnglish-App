import Vue from 'vue'
import VueRouter from 'vue-router'
import UUID from "vue-uuid";
import routes from './routes'
import db from '../plugins/persistence'
import VueLocalForage from 'vue-localforage'
import VueEvents from 'vue-plugin-events'
 


Vue.prototype.$db = db

Vue.use(VueRouter)
Vue.use(VueLocalForage)
Vue.use(UUID);
Vue.use(VueEvents)
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    mode:'history',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    //mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    next()
  })

  return Router
}
