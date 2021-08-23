<template>
  <img src="../assets/logo.png" alt="" />
  <h1>Hola Mundo</h1>
  <div id="nav">
    <button @click="daybook" class="btn btn-primary">Primary</button>
    <button @click="daybook" class="btn btn-secondary">Secondary</button>
    <button @click="daybook" class="btn btn-success">Warning</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    daybook() {
      this.$router.push({ name: "no-entry" });
    },
  },
};
</script>
