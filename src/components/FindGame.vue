<template>
  <div class="container">
    <header>Quick match</header>
    <div class="play-text">Play anonymously against other players</div>

    <button class="start" @click="findGame">
      <span v-if="!finding">Start</span>
      <span v-else class="loader"></span>
    </button>
  </div>
</template>

<script>
import socket from "../socket/socket";
import { mapGetters, mapMutations } from "vuex";

export default {
  emits: ["found"],
  data() {
    return {
      finding: false,
    };
  },
  props: {},
  computed: {
    ...mapGetters({
      playerColor: "game/getPlayerColor",
    }),
  },
  watch: {
    playerColor(newValue) {
      if (newValue !== "") {
        this.finding = false;
        this.$emit("found");
      }
    },
  },
  methods: {
    ...mapMutations({
      setPlayerColor: "game/setPlayerColor",
      setRoomId: "game/setRoomId",
    }),
    async findGame() {
      this.setPlayerColor("");
      this.setRoomId("");
      if (!this.finding) {
        this.finding = true;
        socket.connect();
        socket.joinQueue();
      } else {
        this.finding = false;
        socket.disconnect();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  header {
    padding-top: 4rem;
    padding-bottom: 9rem;
    font-size: 2.25rem;
    font-weight: bold;
  }
  .play-text {
    padding: 1rem;
  }
  .start {
    cursor: pointer;
    padding: 1rem;
    aspect-ratio: 10/2;
    border-radius: 8px;
    background-color: var(--button-color);
    border-style: none;
    box-shadow: 5px 5px var(--button-shadow-color);
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    &:hover {
      background-color: var(--button-hover-color);
    }
  }
}
</style>
