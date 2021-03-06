import Api from "@/services/Api";

export default {
  all(user, typ) {
    return Api().get("db-system", { params: { user: user, id: typ } });
  },
  delete(user, id) {
    return Api().delete("db-system", { params: { user: user, id: id } });
  },
  update(user, form) {
    return Api().put("db-system", { form: form, user: user });
  },
  insert(user, form) {
    return Api().post("db-system", { form: form, user: user });
  }
};
