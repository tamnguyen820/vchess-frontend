import { Chess } from "chess.js";
import lichessClient from "../api/lichessClient.js";
import playSound from "../scripts/sounds.js";

const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getOpening(state, anotate = false) {
  if (!state.fenLoaded) {
    // First 18 moves
    var openingLine = "";
    const len = Math.min(36, state.history.length);
    for (var i = 0; i < len; i++) {
      const move = state.history[i];
      openingLine += move.from + move.to;
      if (i !== len - 1) {
        openingLine += ",";
      }
    }
    lichessClient
      .getOpeningInfo(openingLine)
      .then((res) => {
        if (anotate) {
          if (
            !state.openingInfo ||
            state.openingInfo.eco !== res.data.opening.eco ||
            state.openingInfo.name !== res.data.opening.name
          ) {
            state.chessGame.setComment(
              res.data.opening.eco + ": " + res.data.opening.name
            );
          }
        }
        state.openingInfo = res.data.opening;
      })
      .catch((err) => {
        console.log(err);
        if (!state.openingInfo) {
          state.openingInfo = { eco: "", name: "Custom Position" };
        }
      });
    state.lastOpeningLookup = state.history.length;
  }
}

export const game = {
  namespaced: true,

  state() {
    return {
      chessGame: null,
      fen: "",
      board: [],
      turn: "",
      legalMoves: [],
      lastMove: null,
      capture: {
        w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
        b: { p: 0, n: 0, b: 0, r: 0, q: 0 },
      },
      gameOver: false,
      history: [],
      shortHistory: [],
      tempShortHistory: [],
      reviewStack: [],
      openingInfo: null,
      lastOpeningLookup: 0,
      pgnLoaded: false,
      fenLoaded: false,
      playersInfo: [
        { side: "b", name: "Black" },
        { side: "w", name: "White" },
      ],
      playerColor: "",
      roomId: "",
      clearHighlightsFlag: false,
    };
  },

  mutations: {
    updateGame(state) {
      state.board = state.chessGame.board();
      state.turn = state.chessGame.turn();
      state.legalMoves = state.chessGame.moves({ verbose: true });
      state.gameOver = state.chessGame.isGameOver();
      state.history = state.chessGame.history({ verbose: true });
      state.shortHistory = state.chessGame.history();
      state.fen = state.chessGame.fen();
    },

    createNewGame(state) {
      state.chessGame = new Chess();
      this.commit("game/updateGame");
      // Clear data
      state.lastMove = null;
      state.capture = {
        w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
        b: { p: 0, n: 0, b: 0, r: 0, q: 0 },
      };
      state.tempShortHistory = [];
      state.reviewStack = [];
      state.openingInfo = null;
      state.fenLoaded = false;
      state.lastOpeningLookup = 0;
    },

    async loadPGN(state, pgn) {
      this.commit("game/createNewGame");
      try {
        state.chessGame.loadPgn(pgn);
        state.pgnLoaded = true;
        this.commit("game/updateGame");
        state.lastMove = state.history[state.history.length - 1];
        for (var i = 0; i < state.history.length; i++) {
          const move = state.history[i];
          if (move.captured) {
            state.capture[move.color][move.captured]++;
          }
        }
        getOpening(state);

        const info = state.chessGame.header();
        const players = [
          { side: "b", name: "Black" },
          { side: "w", name: "White" },
        ];
        if (info.Black && info.White) {
          players[0].name = info.Black;
          players[1].name = info.White;
        }
        this.commit("game/setPlayersInfo", players);
      } catch (e) {
        state.pgnLoaded = false;
        console.log("Load PGN failed!");
        console.log(e);
        this.commit("game/createNewGame");
      }
      state.fenLoaded = false;
    },

    setPlayersInfo(state, players) {
      state.playersInfo = players;
    },

    setPlayerColor(state, color) {
      state.playerColor = color;
    },
    setRoomId(state, roomId) {
      state.roomId = roomId;
    },

    loadFEN(state, fen) {
      this.commit("game/createNewGame");
      try {
        state.chessGame.load(fen);
        state.fenLoaded = true;
        this.commit("game/updateGame");
        state.openingInfo = { eco: "", name: "Custom Position" };
      } catch (e) {
        state.fenLoaded = false;
        console.log("Load FEN failed!");
        console.log(e);
        this.commit("game/createNewGame");
      }
      state.pgnLoaded = false;
    },

    async pushMove(state, { move, sound }) {
      // Make move
      state.lastMove = state.chessGame.move(move);

      // Play sound and update info
      if (state.lastMove.captured) {
        if (sound) playSound("capture");
        state.capture[state.lastMove.color][state.lastMove.captured]++;
      } else {
        if (sound) playSound("move");
      }
      this.commit("game/updateGame");
      if (state.gameOver) {
        await sleep(500);
        if (sound) playSound("click");
        state.legalMoves = [];
      }

      // Find opening info
      if (
        !state.tempShortHistory.length &&
        state.history.length &&
        state.history.length > state.lastOpeningLookup &&
        state.history.length <= 36
      ) {
        getOpening(state, true);
      }
    },
    async playGame(state) {
      while (!state.gameOver) {
        const moves = state.legalMoves;
        const move = moves[Math.floor(Math.random() * moves.length)];
        this.commit("game/pushMove", { move, sound: false });
        await sleep(500);
      }
    },
    goBack(state, times = 1) {
      if (!state.reviewStack.length) {
        state.tempShortHistory = JSON.parse(JSON.stringify(state.shortHistory));
      }
      for (var i = 0; i < times; i++) {
        const move = state.chessGame.undo();
        if (move) {
          state.reviewStack.push(move);
          state.capture[move.color][move.captured]--;
        } else {
          break;
        }
      }
      this.commit("game/updateGame");
      state.lastMove = state.history[state.history.length - 1];
    },
    goForward(state, times = 1) {
      for (var i = 0; i < times; i++) {
        const move = state.reviewStack.pop();
        if (move) {
          this.commit("game/pushMove", { move, sound: false });
        } else {
          state.tempShortHistory = [];
          break;
        }
      }
      this.commit("game/updateGame");
    },
    undoMove(state) {
      const move = state.chessGame.undo();
      if (move) {
        this.commit("game/updateGame");
        state.lastMove = state.history[state.history.length - 1];
      }
    },

    setClearHighlightsFlag(state, val) {
      state.clearHighlightsFlag = val;
    },
  },

  getters: {
    getFen(state) {
      return state.fen;
    },
    getBoard(state) {
      return state.board;
    },
    getLegalMoves(state, getters) {
      if (getters.isInReview) {
        return [];
      }
      return state.legalMoves;
    },
    getTurn(state) {
      return state.turn;
    },
    getGameHistory(state) {
      return state.history;
    },
    getShortGameHistory(state, getters) {
      if (getters.isInReview) {
        return state.tempShortHistory;
      }
      return state.shortHistory;
    },
    getLastMove(state) {
      return state.lastMove;
    },
    getLastMoveIndex(state) {
      return state.history.length - 1;
    },
    isGameOver(state) {
      return state.gameOver;
    },
    isDraw(state) {
      if (state.gameOver) {
        return state.chessGame.in_draw();
      }
      return false;
    },
    isInReview(state) {
      return state.reviewStack.length;
    },
    getOpeningInfo(state) {
      return state.openingInfo;
    },
    getCaptureInfo: (state) => (side) => {
      if (side !== "b" && side !== "w") {
        return null;
      }
      return Object.entries(state.capture[side]);
    },
    getMaterialAdvantage(state) {
      const board = state.board;
      var advantage = 0;
      for (const row of board) {
        for (const piece of row) {
          if (piece) {
            const value = pieceValues[piece.type];
            if (piece.color === "b") {
              advantage -= value;
            } else {
              advantage += value;
            }
          }
        }
      }
      return advantage;
    },
    getPGNLoaded(state) {
      return state.pgnLoaded;
    },
    getFENLoaded(state) {
      return state.fenLoaded;
    },

    getPlayersInfo(state) {
      return state.playersInfo;
    },
    getPlayerColor(state) {
      return state.playerColor;
    },
    getRoomId(state) {
      return state.roomId;
    },
    getClearHighlights(state) {
      return state.clearHighlightsFlag;
    },
  },
};
