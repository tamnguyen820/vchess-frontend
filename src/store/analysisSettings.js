export const analysisSettings = {
  namespaced: true,

  state() {
    return {
      engineOn: true,
      suggestionsOn: false,
    }
  },

  mutations: {
    setEngineOn(state, on) {
      state.engineOn = on
    },
    setSuggestionsOn(state, on) {
      state.suggestionsOn = on
    },
  },

  getters: {
    getEngineOn(state) {
      return state.engineOn
    },
    getSuggestionsOn(state) {
      return state.suggestionsOn
    },
  }
}
