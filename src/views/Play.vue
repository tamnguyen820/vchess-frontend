<template>
  <FindGame v-if="!matched" @found="found" />
  <ChessGame v-else />
</template>

<script>
// wacth fen, if change then check turn
// if not your turn, emit move
import { mapGetters } from "vuex";
import socket from "../socket/socket";

import FindGame from "../components/FindGame.vue";
import ChessGame from "../components/ChessGame.vue";

export default {
  components: {
    FindGame,
    ChessGame,
  },
  computed: {
    ...mapGetters({
      color: "game/getPlayerColor",
      fen: "game/getFen",
      turn: "game/getTurn",
      playerColor: "game/getPlayerColor",
      lastMove: "game/getLastMove",
      roomId: "game/getRoomId",
    }),
  },
  watch: {
    fen(newVal) {
      if (this.turn != this.playerColor && this.lastMove !== null) {
        // Send over your last move
        socket.move({ move: this.lastMove, roomId: this.roomId });
      }
    },
  },
  data() {
    return {
      matched: false,
    };
  },
  methods: {
    found() {
      this.matched = true;
    },
  },
};
</script>

<style></style>
