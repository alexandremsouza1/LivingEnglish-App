
export default {
    namespaced: true,
    // state
    state: {
      json: null
    },
  
    // getters
    getters: {
        json: state => state.json
    },
  
    // mutations
    mutations: {
      SET_JSON (state, json) {
        state.json = json
      }
    },
  
    // actions
    actions: {
      saveJson ({ commit }, { json}) {
        commit('SET_JSON', json)
      }
    }
  }
  