<template>
  <div class="entry-list-container">
    <div class="px-2 pt-3">
      <input
        class="form-control mb-4"
        type="search"
        name="search"
        placeholder="Buscar entrada"
        v-model="term"
      />
    </div>

    <div class="entry-scrollarea">
      <Entry v-for="entry in entriesByTerm" :key="entry" :entry="entry" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      term: "",
    };
  },
  components: {
    Entry: defineAsyncComponent(() => import("./Entry.vue")),
  },
  computed: {
    ...mapGetters("journal", ["getEntriesByTerm"]),
    entriesByTerm() {
      return this.getEntriesByTerm(this.term);
    },
  },
};
</script>

<style lang="scss" scope>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}

.entry-scrollarea {
  height: calc(100vh-120px);
  overflow: scroll;
}
</style>