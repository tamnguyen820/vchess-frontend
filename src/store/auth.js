export const auth = {
  namespaced: true,
  state() {
    return {
      authenticated: false,
    };
  },

  mutations: {
    setAuthenticated(state, auth) {
      state.authenticated = auth;
    },
  },

  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    },
  },
};
