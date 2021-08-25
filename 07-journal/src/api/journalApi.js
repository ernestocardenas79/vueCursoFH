import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://vue-demo-4a7e9-default-rtdb.firebaseio.com/",
});

export default journalApi;
