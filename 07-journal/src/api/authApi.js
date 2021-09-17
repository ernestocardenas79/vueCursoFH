import axios from "axios";

const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
  params: {
    key: "AIzaSyCehLFAkjv2Y-s-nCGdGgQXg0htrSyH4SQ",
  },
});

export default authApi;
