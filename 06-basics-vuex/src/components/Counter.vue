<template>
  <h1>Counter -Vuex</h1>
  <h2>Direct Access : {{ countComputed }}</h2>

  <h1>mapState</h1>
  <h2>mapState: {{ $store.state.counter.count }}</h2>
  <h2>lastMutation: {{ lastMutation }}</h2>
  <button @click="increment">+1</button>
  <button @click="incrementBy">+5</button>
  <button @click="incrementRandomInt" :disabled="isLoading">Random</button>

  <h2>Direct getter: {{ $store.getters.squareCounter }}</h2>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  //   computed: mapState(["count"]),
  computed: {
    countComputed() {
      return this.$store.state.count;
    },
    ...mapState("counter", ["count", "lastMutation", "isLoading"]),
    // ...mapState({
    //   count: (state) => state.count,
    //   lastMutation: (state) => state.lastMutation,
    // }),
  },
  methods: {
    increment() {
      this.$store.commit("counter/increment");
    },
    incrementBy() {
      this.$store.commit("counter/incrementBy", 5);
    },
    ...mapActions("counter", ["incrementRandomInt"]),
  },
};
</script>

<style></style>
