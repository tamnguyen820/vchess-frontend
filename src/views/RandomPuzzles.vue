<template>
  <ChessGame puzzleMode />
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ChessGame from "../components/ChessGame.vue";

export default {
  components: {
    ChessGame,
  },
  mounted() {
    if (this.puzzle) {
      this.setUpNewPuzzle(this.puzzle);
    } else {
      this.fetchRandomPuzzle();
    }
  },
  data() {
    return {
      solutionMoves: [],
      curMoveIdx: 0,
    };
  },
  computed: {
    ...mapGetters({
      turn: "game/getTurn",

      flipBoard: "settings/getFlipBoard",

      puzzle: "puzzle/getLichessPuzzle",
      lastPlayerMove: "puzzle/getLastPlayerMove",
      getRevealSolution: "puzzle/getRevealSolution",
    }),
  },
  watch: {
    puzzle: {
      handler(newPuzzle) {
        if (newPuzzle) this.setUpNewPuzzle(newPuzzle);
      },
    },
    lastPlayerMove(newMove) {
      setTimeout(() => {
        const moveConcat = newMove.from + newMove.to;
        if (moveConcat === this.solutionMoves[this.curMoveIdx]) {
          this.curMoveIdx++;
          if (this.curMoveIdx < this.solutionMoves.length) {
            this.pushMove({
              move: this.solutionMoves[this.curMoveIdx],
              sound: true,
            });
            this.curMoveIdx++;
          } else {
            this.setRevealSolution(true);
          }
        } else {
          this.undoMove();
        }
      }, 300);
    },
    getRevealSolution(newVal) {
      if (newVal) {
        const numStepsToGoBack =
          this.solutionMoves.length - this.curMoveIdx - 1;
        while (this.curMoveIdx < this.solutionMoves.length) {
          this.pushMove({
            move: this.solutionMoves[this.curMoveIdx],
            sound: true,
          });
          this.curMoveIdx++;
        }
        this.goBack(numStepsToGoBack);
      }
    },
  },
  methods: {
    ...mapActions({
      fetchRandomPuzzle: "puzzle/fetchRandomLichessPuzzle",
    }),
    ...mapMutations({
      loadFEN: "game/loadFEN",
      pushMove: "game/pushMove",
      setPlayerColor: "game/setPlayerColor",
      setClearHighlightsFlag: "game/setClearHighlightsFlag",
      undoMove: "game/undoMove",
      goBack: "game/goBack",

      setFlipBoard: "settings/setFlipBoard",

      setRevealSolution: "puzzle/setRevealSolution",
    }),
    setUpNewPuzzle(newPuzzle) {
      this.setRevealSolution(false);
      this.setClearHighlightsFlag(true);
      this.loadFEN(newPuzzle.FEN);
      this.solutionMoves = newPuzzle.Moves.split(" ");
      this.curMoveIdx = 0;

      this.$nextTick(() => {
        this.setClearHighlightsFlag(false);
        if (
          (this.turn === "b" && this.flipBoard) ||
          (this.turn === "w" && !this.flipBoard)
        ) {
          this.setFlipBoard();
        }
        // Push first move by computer
        this.pushMove({
          move: this.solutionMoves[this.curMoveIdx],
          sound: true,
        });
        this.curMoveIdx++;
        this.setPlayerColor(this.turn);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
