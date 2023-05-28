<template>
  <ChessGame :analysisMode="true" />
</template>

<script>
import ChessGame from "../components/ChessGame.vue";

export default {
  components: {
    ChessGame,
  },
};
</script>

<style>
</style>