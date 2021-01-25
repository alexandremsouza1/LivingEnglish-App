import { remove } from "lodash"

export default {
    namespaced: true,
    // state
    state: {
        user:{
            name: 'Anonimo',
            email:'',
            picture:'account_circle',
            token:'',
            level: 0   
        } 
    },
  
    // getters
    getters: {
        user: state => state.user,
        name: state => state.name,
        email: state => state.email,
        token: state => state.token,
        level: state => state.level

    },
  
    // mutations
    mutations: {
      SET_USER (state, user) {
        console.log(user)
        state.user.name = user.displayName
        state.user.email = user.email
        state.user.picture = user.photoURL
        state.user.token = user.refreshToken
        state.user.level = user.level
      },
      SET_EMAIL (state, email) {
        state.email = email
      },
      SET_TOKEN (state, token) {
        state.token = token
      },
      SET_LEVEL (state, level) {
        state.level = level
      },
      REMOVE_USER(state){
        state.user = {}
      }
    },
  
    // actions
    actions: {
      saveUser ({ commit }, user ) {
        commit('SET_USER', user)
      },
      removeUser({ commit }){
        commit('REMOVE_USER')
      }
    }
  }
  