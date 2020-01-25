import Api from "@/services/Api";

export default {
  all(user, obrazek) {
    return Api().get("obrazek", { params: { user: user, id: obrazek } });
  },
  del(user, obrazek) {
    console.log(user, obrazek);
    //return
    return Api().get("obrazek_del", { params: { user: user, page: obrazek } });
  }
};
