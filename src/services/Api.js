import axios from "axios";
import url from "./url";
import store from "@/store/store";
export default () => {
  return axios.create({
    baseURL: `http://78.102.17.162:3003/`,
    baseURL: `${url.url()}`,
    // baseURL: `http://192.168.1.180:3003/`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  });
};
