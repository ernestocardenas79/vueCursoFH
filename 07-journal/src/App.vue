<template>
  <router-view></router-view>
</template>
<script>
import useAuth from "@/modules/auth/composables/useAuth";
export default {
  setup() {
    const { authStatus, checkAuthStatus } = useAuth();

    return { authStatus, checkAuthStatus };
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
