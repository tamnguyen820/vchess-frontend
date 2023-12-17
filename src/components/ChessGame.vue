<template>
  <div class="game-layout view">
    <GameLayout>
      <template v-slot:infoPanel v-if="puzzleMode">
        <PuzzleInfoPanel />
      </template>
      <template v-slot:evalBar v-if="analysisMode">
        <EvaluationBar />
      </template>
      <template v-slot:board>
        <Board :analysisMode="analysisMode" :puzzleMode="puzzleMode" />
      </template>
      <template v-slot:sideBar>
        <GameSidebar :analysisMode="analysisMode" />
      </template>
    </GameLayout>
  </div>
</template>

<script>
import PuzzleInfoPanel from "./PuzzleInfoPanel.vue";
import EvaluationBar from "./EvaluationBar.vue";
import Board from "./Board.vue";
import GameLayout from "./GameLayout.vue";
import GameSidebar from "./GameSidebar.vue";

import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    Board,
    GameLayout,
    GameSidebar,
    EvaluationBar,
    PuzzleInfoPanel,
  },
  props: {
    analysisMode: {
      type: Boolean,
      default: false,
    },
    puzzleMode: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.createNewGame();
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({
      createNewGame: "game/createNewGame",
      loadPGN: "game/loadPGN",
    }),
  },
};
</script>

<style lang="scss" scoped>
.game-layout {
  margin: auto;
  @media (max-width: 50rem) {
    height: unset;
    width: 90vw;
  }
}
</style>
