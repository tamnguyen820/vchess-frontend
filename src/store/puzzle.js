import vchessClient from "../api/vchessClient";

export const puzzle = {
  namespaced: true,
  state() {
    return {
      isFetching: false,
      lichessPuzzle: null,
      lastPlayerMove: null,
      revealSolution: false,
    };
  },

  mutations: {
    setIsFetching(state, val) {
      state.isFetching = val;
    },
    setLichessPuzzle(state, puzzle) {
      state.lichessPuzzle = puzzle;
    },
    setLastPlayerMove(state, move) {
      state.lastPlayerMove = move;
    },
    setRevealSolution(state, reveal) {
      state.revealSolution = reveal;
    },
  },

  getters: {
    getIsFetching(state) {
      return state.isFetching;
    },
    getLichessPuzzle(state) {
      return state.lichessPuzzle;
    },
    getLastPlayerMove(state) {
      return state.lastPlayerMove;
    },
    getRevealSolution(state) {
      return state.revealSolution;
    },
  },

  actions: {
    async fetchRandomLichessPuzzle({ commit }) {
      commit("setIsFetching", true);
      vchessClient
        .getRandomPuzzle()
        .then((res) => {
          if (res.status === 200) {
            commit("setLichessPuzzle", res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          commit("setIsFetching", false);
        });
    },
  },
};
