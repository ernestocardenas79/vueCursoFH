<template>
  <h1>Thanos TODO list</h1>
  <h4>Pendientes:{{ pending?.length }}</h4>
  <hr />
  <button @click="currenTab = 'all'" :class="{ active: currenTab === 'all' }">
    Todos
  </button>
  <button
    @click="currenTab = 'pending'"
    :class="{ active: currenTab === 'pending' }"
  >
    Pendientes
  </button>
  <button
    @click="currenTab = 'completed'"
    :class="{ active: currenTab === 'completed' }"
  >
    Completados
  </button>

  <div>
    <ul>
      <li
        @dblclick="toggleTodo(todo.id)"
        :class="{ completed: todo.completed }"
        v-for="todo in getTodosByTab"
        :key="todo.id"
      >
        {{ todo.text }}
      </li>
    </ul>
  </div>
  <button @click="openTaskModal">Crear Tarea</button>
  <modal v-if="isOpen">
    <template v-slot:header>
      <h2>Ingresa Tarea</h2>
    </template>
    <template v-slot:body>
      <form @submit.prevent="onSave">
        <input
          placeholder="Nueva Tarea.."
          name="tarea"
          type="text"
          v-model="tarea"
        />
        <button type="submit">Crear</button>
      </form>
      <br />
      <br />
    </template>
    <template v-slot:footer>
      <button @click="closeTaskModal">Cancelar</button>
    </template>
  </modal>
</template>

<script>
import { ref } from "vue";
import useTodos from "@/composables/useTodos";
import Modal from "@/components/Modal";
export default {
  components: {
    Modal,
  },
  setup() {
    const tarea = ref("");
    const isOpen = ref(false);
    const { currenTab, pending, toggleTodo, getTodosByTab, createTodo } =
      useTodos();

    const closeTaskModal = () => (isOpen.value = false);
    const onSave = () => {
      createTodo(tarea.value);
      closeTaskModal();
    };

    return {
      closeTaskModal,
      currenTab,
      getTodosByTab,
      isOpen,
      openTaskModal: () => (isOpen.value = true),
      pending,
      tarea,
      toggleTodo,
      onSave,
    };
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  text-align: center;
}

ul {
  width: 300px;
  text-align: left;
}
li {
  cursor: pointer;
}

.active {
  background-color: #2c3e50;
  color: white;
}
.completed {
  text-decoration: line-through;
}
</style>