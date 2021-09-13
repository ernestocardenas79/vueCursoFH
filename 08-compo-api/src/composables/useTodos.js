import { computed, ref } from "vue";
import { useStore } from "vuex";

const useTodos = () => {
  const store = useStore();

  const currenTab = ref("all");

  return {
    currenTab,

    all: computed(() => store.getters["allTodos"]),
    completed: computed(() => store.getters["completedTodos"]),
    createTodo: (tarea) => store.commit("createTodo", tarea),
    pending: computed(() => store.getters["pendingTodos"]),
    getTodosByTab: computed(() =>
      store.getters["getTodosByTab"](currenTab.value)
    ),

    toggleTodo: (id) => store.commit("toggleTodo", id),
  };
};

export default useTodos;
