<template>
  <h1>Buscar pokemon:</h1>
  <form @submit.prevent="onSubmit">
    <input
      type="number"
      placeholder="Número de pokémon"
      v-model="pokemonId"
      ref="txtSearch"
    />
    <hr />
    <span>Presione enter para buscar</span>
  </form>
</template>
<script >
import { ref, onActivated } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const pokemonId = ref(1);
    const txtSearch = ref();
    const router = useRouter();

    onActivated(() => {
      txtSearch.value.select();
    });

    return {
      pokemonId,
      onSubmit: () =>
        router.push({ name: "pokemon-id", params: { id: pokemonId.value } }),
      txtSearch,
    };
  },
};
</script>
