<template>
  <h2>{{ customTitle }}</h2>
  <p>
    {{ counter }} <sup>{{ squareCounterValue }}</sup>
  </p>
  <p data-testid="counter">
    {{counter}}
  </p>
  <div>
    <button @click="increase">+1</button>
    <button @click="decrease">-1</button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    start: {
      type: Number,
      default: 100,
      validator(value) {
        return value > -1;
      },
    },
  },
  data() {
    return {
      counter: this.start,
    };
  },
  computed: {
    squareCounterValue() {
      return this.counter * this.counter;
    },
    customTitle() {
      return this.title || "Counter";
    },
  },
  methods: {
    increase() {
      this.counter++;
    },
    decrease() {
      this.counter--;
    },
  },
};
</script>
<style>
button {
  border-color: #64bb87;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px;
}
</style>
