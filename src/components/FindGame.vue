<template>
  <div class="container">
    <header>Find match</header>

    <button class="start" @click="findGame">
      <span v-if="!finding">Start</span>
      <span v-else class="loader"></span>
    </button>
  </div>
</template>

<script>
import socket from "../socket/socket";
import { mapGetters } from "vuex";

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
      color: "game/getPlayerColor",
    }),
  },
  watch: {
    color(newValue) {
      if (newValue !== "") {
        this.finding = false;
        this.$emit("found");
      }
    },
  },
  methods: {
    async findGame() {
      this.finding = true;
      socket.connect();
      socket.joinQueue();
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
    padding-bottom: 10rem;
    font-size: 2.25rem;
    font-weight: bold;
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
