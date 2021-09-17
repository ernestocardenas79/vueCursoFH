import { useStore } from "vuex";
import { computed } from "vue";
const useAuth = () => {
  const store = useStore();

  const createUser = async (user) => {
    const resp = await store.dispatch("auth/createUser", user);

    return resp;
  };

  const loginUser = async (user) => {
    const resp = await store.dispatch("auth/signinUser", user);

    return resp;
  };

  const checkAuthStatus = async () => {
    const resp = await store.dispatch("auth/checkAuthentication");
    return resp;
  };

  return {
    createUser,
    loginUser,
    checkAuthStatus,
    authStatue: () => {
      store.getters["auth/currentState"];
    },
    username: computed(() => store.getters["auth/username"]),
    logout: () => {
      store.commit("auth/logout");
      store.commit("journal/clearEntries");
    },
  };
};

export default useAuth;