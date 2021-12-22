import axios from "axios";
//import { store } from "../store/index.js";
//import { mapGetters } from "vuex";
const CustomizedAxios = axios;
CustomizedAxios.defaults.baseURL = "http://10.20.140.143:8000/";
CustomizedAxios.defaults.headers.common["Accept"] = "application/json";
CustomizedAxios.defaults.headers.common = {
  Authorization: "Bearer 52|F2mkV7BmWtYMhsjkSWKJyxIXLVXRRP9VIQUdqZyc",
};
//console.log("store.getters.getCurrentUser", this.$store);
/* if (userModule.state.currentUser != null) {
  console.log("user", userModule.state.currentUser);
  axios.defaults.headers.common = {
    Authorization: `Bearer ${userModule.state.currentUser.token}`,
  };
} */
/*axios.interceptors.request.use(
  function (config) {
    const token = store.getters.getCurrentUser.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);*/

export default CustomizedAxios;
