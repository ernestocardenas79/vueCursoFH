import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://vue-demo-4a7e9-default-rtdb.firebaseio.com/",
});

journalApi.interceptors.request.use((config) => {
  config.params = {
    auth: localStorage.getItem("idToken"),
  };

  return config;
});

export default journalApi;
