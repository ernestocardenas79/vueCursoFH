import journalApi from "@/api/journalApi";

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json");

  const entries = [];

  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }

  commit("setEntries", entries);
};
export const updateEntries = async ({ commit }, entry) => {
  let { date, text } = entry;

  const dataToSave = {
    date,
    text,
  };

  await journalApi.put(`/entries/${entry.id}.json`, dataToSave);

  commit("updateEntry", { ...entry });
};

export const createEntry = async ({ commit }, { date, picture, text }) => {
  const { data } = await journalApi.post(`/entries.json`, {
    date,
    picture,
    text,
  });

  commit("addEntry", { id: data.name, date, picture, text });

  return data.name;
};
