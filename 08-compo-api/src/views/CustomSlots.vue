<template>
  <h1>Aprendiendo Slots</h1>
  <button @click="openModal">Abrir Modal</button>
  <modal v-if="isOpen" @on:close="closeModal" title="Hola Mundo!!">
    <template v-slot:header>
      <h2>Titulo Modal</h2>
    </template>
    <template v-slot:body>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
        excepturi error possimus?
      </p>
    </template>
    <template v-slot:footer>
      <button @click="closeModal">Salir</button>
    </template>

    <template v-slot:exposed="slotProps">
      <h2>{{ slotProps }}</h2>
    </template>
  </modal>
</template>

<script>
import { ref } from "vue";
import Modal from "@/components/Modal";
export default {
  components: {
    Modal,
  },
  setup() {
    const isOpen = ref(false);

    return {
      isOpen,
      openModal: () => (isOpen.value = true),
      closeModal: () => (isOpen.value = false),
    };
  },
};
</script>

<style>
</style>