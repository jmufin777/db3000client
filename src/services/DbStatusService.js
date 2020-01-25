import Api from "@/services/Api";

export default {
  all(nothing_yet) {
    return Api().post("db-status", nothing_yet);
  },
  who(whos) {
    return Api().post("db-status-who", whos);
  }
};
