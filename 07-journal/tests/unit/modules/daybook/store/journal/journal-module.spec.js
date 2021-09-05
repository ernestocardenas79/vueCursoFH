import { createStore } from "vuex";

import { journalState } from "../../../../../mock-data/test-journal-state";
import journal from "@/modules/daybook/store/journal";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe("Vuex- Pruebas en el journal MOdule", () => {
  test("este es el estado inicial", () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  test("mutation: setEntries", () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    store.commit("journal/setEntries", journalState.entries);

    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.isLoading.length).toBeFalsy();
  });

  test("mutation: updateEntry", () => {
    const store = createVuexStore(journalState);
    const updateEntry = {
      id: "-MiXSiM01vwlIFWNWuuX",
      date: 1630518276610,
      text: "Hola desde pruebas",
    };

    store.commit("journal/updateEntry", updateEntry);

    const storeEntries = store.state.journal.entries;

    expect(storeEntries.length).toBe(2);
    expect(storeEntries.find((e) => e.id === updateEntry.id)).toEqual(
      updateEntry
    );
  });

  test("mutation: addentry y deleteEntry", () => {
    const store = createVuexStore(journalState);
    const id = "ABE-123";
    const newEntry = {
      id,
      date: 1630518276610,
      text: "Hola Mundo",
    };

    store.commit("journal/addEntry", newEntry);

    const storeNewEntries = store.state.journal.entries;
    expect(storeNewEntries.length).toBe(3);
    expect(storeNewEntries.find((e) => e.id === id)).toBeTruthy();

    store.commit("journal/deleteEntry", id);

    const storeDeleteEntries = store.state.journal.entries;
    expect(storeDeleteEntries.length).toBe(2);
    expect(storeDeleteEntries.find((e) => e.id === id)).toBeFalsy();
  });

  // Getters ========================================

  test("getters: getEntriesByTerm getEntriesById", () => {
    const store = createVuexStore(journalState);

    const [entry1, entry2] = journalState.entries;

    expect(store.getters["journal/getEntriesByTerm"]("").length).toBe(2);
    expect(store.getters["journal/getEntriesByTerm"]("masizo").length).toBe(1);

    expect(store.getters["journal/getEntriesByTerm"]("masizo")).toEqual([
      entry2,
    ]);

    expect(store.getters["journal/getEntriesById"](entry1.id)).toEqual(entry1);
  });

  // Actions ========================================
  test("actions: Loadentries", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    await store.dispatch("journal/loadEntries");

    expect(store.state.journal.entries.length).toBe(2);
  });
  test("actions: updateEntries", async () => {
    const store = createVuexStore(journalState);
    const updateEntry = {
      id: "-MiXSiM01vwlIFWNWuuX",
      date: 1630518276610,
      text: "Hola desde pruebas",
    };

    await store.dispatch("journal/updateEntries", updateEntry);

    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((e) => e.id === updateEntry.id)
    ).toEqual(updateEntry);
  });
});
