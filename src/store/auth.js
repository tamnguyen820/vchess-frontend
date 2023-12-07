export const auth = {
  namespaced: true,
  state() {
    return {
      authenticated: false,
      user: null,
    };
  },

  mutations: {
    setAuthenticated(state, auth) {
      state.authenticated = auth;
    },
    setUser(state, user) {
      state.user = user;
    },
  },

  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    },
    getUser(state) {
      return state.user;
    },
  },
};
