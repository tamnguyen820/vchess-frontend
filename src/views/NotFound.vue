<template>
  <div class="view">
    <h1>
      <img src="/src/assets/images/icon/search-glass.svg" alt="Not found" />Not Found
    </h1>
    <p>
      Oops, we couldn't find that page. Let's go
      <router-link :to="{ name: 'home' }">home.</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
.view {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    height: 3.5rem;
  }

  h1 {
    font-size: 5rem;
    margin-top: -3rem;
  }
}
</style>
