import { ref } from "vue";
import axios from "axios";

const usePokemon = (pokemonId = 1) => {
  const pokemon = ref();
  const isLoading = ref(false);
  const errorMessage = ref(null);

  const searchPokemon = async (id) => {
    if (!id) return;

    isLoading.value = true;
    pokemon.value = null;

    console.log("searchs");
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      pokemon.value = data;
      errorMessage.value = null;
    } catch (error) {
      errorMessage.value = "Error al cargar la información del pokemon";
    }

    isLoading.value = false;
  };
  searchPokemon(pokemonId);

  return {
    errorMessage,
    isLoading,
    pokemon,
    searchPokemon,
  };
};

export default usePokemon;
