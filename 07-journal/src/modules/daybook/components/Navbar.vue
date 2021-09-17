<template>
  <nav class="navbar bg-primary">
    <a class="navbar-brand text-white">
      <!-- <img src="" alt="" /> -->
      <img
        src="@/assets/logo.png"
        alt="vue logo"
        class="d-inline-blockalign-text-top mx-2"
        height="24"
      />
      Daybook - {{ username }}
    </a>
    <div class="d-flex">
      <button class="btn btn-outline-info mx-2" @click="onLogout">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>
<script>
import useAuth from "@/modules/auth/composables/useAuth";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { username, logout } = useAuth();
    const router = useRouter();

    return {
      username,
      onLogout: () => {
        logout();
        router.push({ name: "login" });
      },
    };
  },
};
</script>