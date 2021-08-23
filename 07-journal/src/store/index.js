import { createStore } from "vuex";
import journal from "../modules/daybook/store/journal";

const store = createStore({
  journal,
});

export default store;
