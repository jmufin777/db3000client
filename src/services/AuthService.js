import Api from "@/services/Api";

export default {
  login(credentials) {
    return Api().post("login", credentials);
  },
  logout(credentials) {
    return Api().post("/list_users-logout", credentials);
  },

  update(credentials) {
    return Api().post("login-update", credentials);
  },
  menuUpdate(credentials) {
    return Api().post("login-menu-update", credentials);
  }
};
