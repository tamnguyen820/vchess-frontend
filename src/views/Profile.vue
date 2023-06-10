<template>
  <div class="profile-container">
    <div class="user-avatar">
      <img
        class="avatar"
        src="/src/assets/images/avatar/default_avatar_k.png"
      />
    </div>
    <div class="user-info">
      <div class="user-username">Test Username</div>
      <div class="user-country">
        <CountryFlag :country="country" :shadow="true" class="flag" />
      </div>
    </div>
  </div>
</template>

<script>
import CountryFlag from "vue-country-flag-next";

export default {
  components: {
    CountryFlag,
  },
  data() {
    return {
      country: "ca",
    };
  },
};
</script>

<style lang="scss" scoped>
.profile-container {
  height: 100vh;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  gap: 1rem;
  .user-avatar {
    .avatar {
      background: white;
      border-radius: 5px;
      aspect-ratio: 1;
      height: 6rem;
      @media (min-width: 64rem) {
        height: 18rem;
      }
      @media (min-width: 40rem) {
        height: 10rem;
      }
    }
  }
  .user-info {
    display: flex;
    gap: 1rem;
    .user-username {
      font-weight: bold;
      font-size: 2rem;
    }
    .flag {
      scale: 1.5;
    }
  }
}
</style>
