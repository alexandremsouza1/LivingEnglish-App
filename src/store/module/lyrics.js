
export default {
    namespaced: true,
    // state
    state: {
        lyric:[
          {
            id: '',
            nome:'',
            idUser:'',
            original:[],
            traducao: [],
            pontuacao_max: 0,
            pontuacao_atingida:0,
            status:'pendente',
            idioma: [],
            ciclo:0
          }
      ]
    },
  
    // getters
    getters: {
        lyric: state => state.lyric
    },
  
    // mutations
    mutations: {
      SET_LYRIC (state, lyric) {
        state.lyric.push(lyric)
      },
      REPLACE_LYRIC (state, lyric) {
        state.lyric = lyric
      }
    },
  
    // actions
    actions: {
      saveLyric ({ commit }, lyric ) {
        commit('SET_LYRIC', lyric)
      },

      replaceAll ({ commit }, lyric ) {
        commit('REPLACE_LYRIC', lyric)
      }
    }
  }
  