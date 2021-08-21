import getRandomInt from "../../helpers/getRandomInt";

const counterStore = {
  namespaced: true,
  state: () => ({
    count: 1,
    lastMutation: "none",
    isLoading: false,
    lastRandomInt: 0,
  }),
  mutations: {
    increment(state) {
      state.count++;
      state.lastMutation = "increment";
    },
    incrementBy(state, val) {
      state.count += val;
      state.lastMutation = "incrementBy " + val;
      state.lastRandomInt = val;
    },
    setLoading(state, loading) {
      state.isLoading = loading;
    },
  },
  actions: {
    async incrementRandomInt({ commit }) {
      commit("setLoading", true);
      const rndInt = await getRandomInt();
      commit("incrementBy", rndInt);
      commit("setLoading", false);
    },
  },
  getters: {
    squareCounter(state) {
      return state.count * state.count;
    },
  },
};

export default counterStore;
