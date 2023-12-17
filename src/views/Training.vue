<template>
  <div class="view">
    <header>Training</header>
    <div class="training-modes">
      <button class="mode">
        <router-link :to="{ name: 'random-puzzles' }"
          ><p>Random puzzles</p>
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.view {
  header {
    padding-top: 4rem;
    font-size: 2.25rem;
    font-weight: bold;
    text-align: center;
  }
  .training-modes {
    margin: 2rem;
    margin-left: 5rem;
    .mode {
      border-radius: 0.6rem;
      background-color: #a52a2a;
      border: 0;
      cursor: pointer;
      transition: var(--tran-02);
      box-shadow: 3px 3px black;
      &:hover {
        background-color: #9a031e;
        box-shadow: 6px 6px black;
        P {
          text-decoration: overline;
        }
      }
      a {
        text-decoration: none !important;
        p {
          padding: 1rem;
          font-size: 1.1rem;
          color: var(--off-white);
          font-weight: 500;
        }
      }
    }
  }
}
</style>
