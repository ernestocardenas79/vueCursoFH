import journalApi from "@/api/journalApi";

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json");

  const entries = [];

  for (let id of Object.keys(data)) {
    console.log(id);

    entries.push({
      id,
      ...data[id],
    });
    console.log("actions", entries);
  }
  console.log(entries[0]);

  commit("setEntries", entries);
};
export const updateEntries = async (/*{commit}*/) => {};
export const createEntry = async (/*{commit}*/) => {};
