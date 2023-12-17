<template>
  <div class="wrapper">
    <div class="main-area">
      <div v-if="$slots.infoPanel" class="info-area">
        <slot name="infoPanel" />
      </div>

      <div v-if="$slots.evalBar" class="eval-area">
        <slot name="evalBar" />
      </div>
      <div v-if="$slots.board" class="board">
        <slot name="board" />
      </div>
      <div v-if="$slots.sideBar" class="side-bar">
        <slot name="sideBar" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .main-area {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .side-bar {
    // min-width: 250px;
    width: 30%;
    // max-width: 70vw;
  }
  @media (min-width: 100rem) {
    .side-bar {
      min-width: 400px;
    }
  }
  @media (max-width: 50rem) {
    margin-block: 20%;
    .main-area {
      gap: 10px;
      flex-wrap: wrap;
    }
    .eval-area {
      flex: 1 0 5%;
    }
    .board {
      flex: 1 0 90%;
    }
    .side-bar {
      margin: auto !important;
      flex: 1 0 70%;
    }
  }
}
</style>
