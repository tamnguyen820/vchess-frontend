<template>
  <div class="puzzle-info-panel">
    <div class="puzzle-info-pair">
      <div class="puzzle-info-name">Puzzle ID</div>
      <div class="puzzle-info-value">
        <a
          target="_blank"
          :href="
            puzzle?.PuzzleId
              ? 'https://lichess.org/training/' + puzzle.PuzzleId
              : '#'
          "
          >{{ puzzle?.PuzzleId ? "#" + puzzle?.PuzzleId : "..." }}</a
        >
      </div>
    </div>
    <div class="puzzle-info-pair">
      <div class="puzzle-info-name">From game</div>
      <div class="puzzle-info-value">
        <a target="_blank" :href="puzzle?.GameUrl || '#'">{{
          puzzle?.GameUrl ? "Link" : "..."
        }}</a>
      </div>
    </div>
    <div class="puzzle-info-pair">
      <div class="puzzle-info-name">Rating</div>
      <div class="puzzle-info-value">{{ puzzle?.Rating || "..." }}</div>
    </div>
    <div class="puzzle-info-pair">
      <div class="puzzle-info-name">Played</div>
      <div class="puzzle-info-value">{{ puzzle?.NbPlays || "..." }} times</div>
    </div>

    <div
      role="button"
      class="reveal-solution"
      @click="!isFetching && setRevealSolution(true)"
      :class="{
        'disabled-feature': isFetching,
        'removed-feature': getRevealSolution,
      }"
    >
      Reveal solution
    </div>
    <div
      role="button"
      class="next-puzzle"
      @click="!isFetching && fetchRandomPuzzle()"
      :class="{ 'disabled-feature': isFetching }"
    >
      Next puzzle >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isFetching: "puzzle/getIsFetching",
      puzzle: "puzzle/getLichessPuzzle",
      getRevealSolution: "puzzle/getRevealSolution",
    }),
  },
  methods: {
    ...mapActions({
      fetchRandomPuzzle: "puzzle/fetchRandomLichessPuzzle",
    }),
    ...mapMutations({
      setRevealSolution: "puzzle/setRevealSolution",
    }),
  },
};
</script>

<style lang="scss" scoped>
.puzzle-info-panel {
  background-color: white;
  min-width: 170px;
  width: 170px;
  border-radius: 5px;
  padding: 1rem;
  font-size: clamp(0.7rem, clamp(2.5rem, 3.5vw, 5rem) / 3.5, 1rem);
  text-wrap: balance;
  overflow-wrap: break-word;

  .puzzle-info-name {
    font-weight: 500;
  }
  .puzzle-info-value {
    text-align: right;
  }
  .next-puzzle {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    margin-top: 10px;
    font-weight: 700;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    background-color: #f0f0f0;
    padding: 0.5rem;
    &:hover {
      background-color: var(--button-hover-color);
    }
  }
  .reveal-solution {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    margin-top: 10px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    color: green;
    padding: 0.1rem;
  }
  .disabled-feature {
    background-color: lightskyblue;
    &:hover {
      background-color: lightskyblue;
    }
  }
  .removed-feature {
    display: none !important;
  }
}
</style>
